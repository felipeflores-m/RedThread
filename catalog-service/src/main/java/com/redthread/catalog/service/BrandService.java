package com.redthread.catalog.service;

import com.redthread.catalog.model.Brand;
import com.redthread.catalog.repository.BrandRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class BrandService {
    private final BrandRepository repo;

    public Brand create(String name) {
        repo.findByNameIgnoreCase(name).ifPresent(b -> { throw new IllegalArgumentException("Marca ya existe"); });
        Brand b = Brand.builder().name(name.trim()).active(true).build();
        return repo.save(b);
    }

    public Brand get(Long id) {
        return repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Brand not found"));
    }
}
