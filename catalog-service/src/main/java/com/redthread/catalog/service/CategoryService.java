package com.redthread.catalog.service;

import com.redthread.catalog.model.Category;
import com.redthread.catalog.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repo;

    public Category create(String name, String description) {
        repo.findByNameIgnoreCase(name).ifPresent(c -> { throw new IllegalArgumentException("Categoria ya existe"); });
        Category c = Category.builder().name(name.trim()).description(description).active(true).build();
        return repo.save(c);
    }

    public Category get(Long id) {
        return repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }
}
