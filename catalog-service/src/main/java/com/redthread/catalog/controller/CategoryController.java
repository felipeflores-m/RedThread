package com.redthread.catalog.controller;

import com.redthread.catalog.controller.dto.CreateCategoryReq;
import com.redthread.catalog.model.Category;
import com.redthread.catalog.repository.CategoryRepository;
import com.redthread.catalog.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;
    private final CategoryRepository repo;

    @PostMapping
    public Category create(@RequestBody @Valid CreateCategoryReq req) {
        return service.create(req.name(), req.description());
    }

    @GetMapping
    public List<Category> list() { return repo.findAll(); }

    @GetMapping("/{id}")
    public Category get(@PathVariable Long id) { return service.get(id); }
}
