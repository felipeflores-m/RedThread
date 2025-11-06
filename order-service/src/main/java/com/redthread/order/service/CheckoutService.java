package com.redthread.order.service;

import com.redthread.order.dto.CheckoutReq;
import com.redthread.order.integrations.CatalogClient;
import com.redthread.order.model.*;
import com.redthread.order.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckoutService {

  private final CartRepository cartRepo;
  private final CartItemRepository itemRepo;
  private final AddressRepository addressRepo;
  private final OrderRepository orderRepo;
  private final OrderItemRepository orderItemRepo;
  private final PaymentAttemptRepository payRepo;
  private final CatalogClient catalog;

  @Transactional
  public Order checkout(String userId, CheckoutReq req) {
    Cart cart = cartRepo.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Carrito no existe"));
    var items = itemRepo.findByCartId(cart.getId());
    if (items.isEmpty()) throw new IllegalStateException("Carrito vacío");
    Address address = addressRepo.findByIdAndUserId(req.addressId(), String.valueOf(userId))
        .orElseThrow(() -> new IllegalArgumentException("Address inválida"));

    // 1) Validación de stock (best-effort si /variants existe)
    for (var it : items) {
      var info = catalog.getVariant(it.getVariantId());
      if (info != null && info.availableStock() != null && info.availableStock() < it.getQuantity()) {
        throw new IllegalStateException("Stock insuficiente para variant " + it.getVariantId());
      }
    }

    // 2) Intentar ajustar stock (delta negativo). Si algo falla, revertir lo ya ajustado.
    List<Runnable> compensations = new ArrayList<>();
    try {
      for (var it : items) {
        catalog.adjustStock(it.getVariantId(), -it.getQuantity());
        compensations.add(() -> { try { catalog.adjustStock(it.getVariantId(), +it.getQuantity()); } catch (Exception ignore) {} });
      }
    } catch (Exception ex) {
      // revertir
      for (int i = compensations.size() - 1; i >= 0; i--) compensations.get(i).run();
      throw new IllegalStateException("No se pudo ajustar el stock: " + ex.getMessage());
    }

    // 3) Crear Order + Items (snapshot de precio del cart)
    Order order = Order.builder()
        .userId(userId)
        .address(address)
        .status(OrderStatus.CREATED)
        .totalAmount(BigDecimal.ZERO)
        .createdAt(Instant.now())
        .build();
    order = orderRepo.save(order);

    BigDecimal total = BigDecimal.ZERO;
    for (var it : items) {
      BigDecimal unit = it.getUnitPrice() == null ? BigDecimal.ZERO : it.getUnitPrice();
      BigDecimal line = unit.multiply(BigDecimal.valueOf(it.getQuantity()));
      total = total.add(line);
      orderItemRepo.save(OrderItem.builder()
          .order(order)
          .variantId(it.getVariantId())
          .quantity(it.getQuantity())
          .unitPrice(unit)
          .lineTotal(line)
          .build());
    }
    order.setTotalAmount(total);
    orderRepo.save(order);

    // 4) Limpiar carrito
    itemRepo.deleteByCartId(cart.getId());
    cart.setUpdatedAt(Instant.now());
    cartRepo.save(cart);

    // 5) Crear PaymentAttempt PENDING (stub)
    payRepo.save(PaymentAttempt.builder()
        .order(order)
        .provider(null)
        .status(PaymentStatus.PENDING)
        .createdAt(Instant.now())
        .build());

    return order;
  }
}
