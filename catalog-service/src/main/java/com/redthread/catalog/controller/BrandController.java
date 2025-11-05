package com.redthread.catalog.controller;

import com.redthread.catalog.controller.dto.CreateBrandReq;
import com.redthread.catalog.model.Brand;
import com.redthread.catalog.service.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService service;

    @PostMapping
    public Brand create(@RequestBody @Valid CreateBrandReq req) {
        return service.create(req.name());
    }

    @GetMapping("/{id}")
    public Brand get(@PathVariable Long id) { return service.get(id); }
}
