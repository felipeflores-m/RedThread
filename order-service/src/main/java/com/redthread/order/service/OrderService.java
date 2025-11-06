package com.redthread.order.service;

import com.redthread.order.model.*;
import com.redthread.order.repository.OrderItemRepository;
import com.redthread.order.repository.OrderRepository;
import com.redthread.order.repository.PaymentAttemptRepository;
import com.redthread.order.integrations.CatalogClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
  private final OrderRepository orderRepo;
  private final OrderItemRepository itemRepo;
  private final PaymentAttemptRepository payRepo;
  private final CatalogClient catalog;

  public List<Order> listByUser(String userId) {
    return orderRepo.findByUserIdOrderByIdDesc(userId);
  }

  public Order getByIdForUser(Long id, String userId) {
    return orderRepo.findByIdAndUserId(id, userId)
        .orElseThrow(() -> new IllegalArgumentException("Order no encontrada"));
  }

  @Transactional
  public Order pay(String userId, Long orderId, String provider) {
    Order order = getByIdForUser(orderId, userId);
    if (order.getStatus() != OrderStatus.CREATED)
      throw new IllegalStateException("Solo CREATED puede pagarse");
    // Simular aprobación
    payRepo.save(PaymentAttempt.builder()
        .order(order).provider(provider).status(PaymentStatus.APPROVED)
        .createdAt(java.time.Instant.now()).build());
    order.setStatus(OrderStatus.PAID);
    return orderRepo.save(order);
  }

  @Transactional
  public Order cancel(String userId, Long orderId) {
    Order order = getByIdForUser(orderId, userId);
    if (order.getStatus() == OrderStatus.CANCELLED) return order;
    if (order.getStatus() != OrderStatus.CREATED && order.getStatus() != OrderStatus.PAID)
      throw new IllegalStateException("Solo CREATED o PAID se pueden cancelar");

    var items = itemRepo.findByOrderId(order.getId());
    // Reponer stock (delta positivo)
    for (var it : items) {
      catalog.adjustStock(it.getVariantId(), +it.getQuantity());
    }
    order.setStatus(OrderStatus.CANCELLED);
    return orderRepo.save(order);
  }
}
