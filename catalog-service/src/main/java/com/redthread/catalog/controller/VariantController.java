package com.redthread.catalog.controller;

import com.redthread.catalog.controller.dto.CreateVariantReq;
import com.redthread.catalog.model.Variant;
import com.redthread.catalog.repository.VariantRepository;
import com.redthread.catalog.service.VariantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/variants")
@RequiredArgsConstructor
public class VariantController {
    private final VariantService service;
    private final VariantRepository repo;

    @PostMapping
    public Variant create(@RequestBody @Valid CreateVariantReq req) {
        return service.create(req.productId(), req.sizeType(), req.sizeValue(), req.color(), req.sku(), req.priceOverride());
    }

    @GetMapping("/{id}")
    public Variant get(@PathVariable Long id) { return service.get(id); }

    @GetMapping
    public List<Variant> list(@RequestParam Long productId) { return service.byProduct(productId); }
}
