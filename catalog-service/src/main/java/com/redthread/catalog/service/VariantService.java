package com.redthread.catalog.service;

import com.redthread.catalog.model.Inventory;
import com.redthread.catalog.model.Product;
import com.redthread.catalog.model.Variant;
import com.redthread.catalog.model.enums.SizeType;
import com.redthread.catalog.repository.InventoryRepository;
import com.redthread.catalog.repository.ProductRepository;
import com.redthread.catalog.repository.VariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class VariantService {
    private final VariantRepository variantRepo;
    private final ProductRepository productRepo;
    private final InventoryRepository inventoryRepo;

    public Variant create(Long productId, SizeType sizeType, String sizeValue, String color, String sku, BigDecimal priceOverride) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Producto no existe"));

        SizeValidator.validate(sizeType, sizeValue);

        if (variantRepo.existsByProductIdAndSizeTypeAndSizeValueAndColor(productId, sizeType, sizeValue.toUpperCase(), color.toUpperCase()))
            throw new IllegalArgumentException("Variante duplicada para producto/talla/color");

        String finalSku = (sku == null || sku.isBlank()) ? "SKU-" + UUID.randomUUID() : sku.trim();
        Variant v = Variant.builder()
                .product(product)
                .sizeType(sizeType)
                .sizeValue(sizeType == SizeType.LETTER ? sizeValue.toUpperCase() : sizeValue)
                .color(color.toUpperCase())
                .sku(finalSku)
                .priceOverride(priceOverride)
                .active(true)
                .build();

        Variant saved = variantRepo.save(v);
        // crear inventario en 0 si no existe
        inventoryRepo.findByVariantId(saved.getId()).orElseGet(() ->
                inventoryRepo.save(Inventory.builder().variant(saved).stockAvailable(0).stockReserved(0).build())
        );
        return saved;
    }

    public Variant get(Long id) {
        return variantRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Variante no existe"));
    }

    public List<Variant> byProduct(Long productId) {
        return variantRepo.findByProductId(productId);
    }
}
