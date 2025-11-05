package com.redthread.catalog.service;

import com.redthread.catalog.model.Product;
import com.redthread.catalog.model.ProductImage;
import com.redthread.catalog.repository.ProductImageRepository;
import com.redthread.catalog.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service @RequiredArgsConstructor
public class ImageStorageService {

    @Value("${app.media.upload-dir:./uploads}")
    private String uploadDir;

    @Value("${app.media.public-prefix:/media}")
    private String publicPrefix;

    private final ProductRepository productRepo;
    private final ProductImageRepository imageRepo;

    public ProductImage store(Long productId, MultipartFile file, boolean primary) throws IOException {
        Product p = productRepo.findById(productId).orElseThrow(() -> new EntityNotFoundException("Producto no existe"));
        if (file.isEmpty()) throw new IllegalArgumentException("Archivo vacío");

        String ext = getExt(file.getOriginalFilename());
        String name = UUID.randomUUID() + (ext.isBlank() ? "" : "." + ext);
        Path productFolder = Path.of(uploadDir, "products", String.valueOf(productId));
        Files.createDirectories(productFolder);
        Path target = productFolder.resolve(name);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String rel = Path.of("products", String.valueOf(productId), name).toString().replace("\\","/");
        String publicUrl = publicPrefix + "/" + rel;

        if (primary) unsetPrimary(productId);

        int order = imageRepo.findByProductIdOrderBySortOrderAsc(productId).size();

        ProductImage img = ProductImage.builder()
                .product(p)
                .filePath(target.toAbsolutePath().toString())
                .publicUrl(publicUrl)
                .primary(primary)
                .sortOrder(order)
                .build();

        return imageRepo.save(img);
    }

    public void unsetPrimary(Long productId) {
        List<ProductImage> imgs = imageRepo.findByProductIdOrderBySortOrderAsc(productId);
        for (ProductImage im : imgs) {
            if (im.isPrimary()) { im.setPrimary(false); imageRepo.save(im); }
        }
    }

    public ProductImage setPrimary(Long imageId) {
        ProductImage img = imageRepo.findById(imageId).orElseThrow(() -> new EntityNotFoundException("Imagen no existe"));
        unsetPrimary(img.getProduct().getId());
        img.setPrimary(true);
        return imageRepo.save(img);
    }

    public void delete(Long imageId) throws IOException {
        ProductImage img = imageRepo.findById(imageId).orElseThrow(() -> new EntityNotFoundException("Imagen no existe"));
        try {
            Files.deleteIfExists(Path.of(img.getFilePath()));
        } catch (Exception ignored) {}
        imageRepo.deleteById(imageId);
    }

    // Mock "presign": devolvemos un key y el path final esperado (para front que usa confirm).
    public String presignKey(Long productId, String originalFilename) {
        String ext = getExt(originalFilename);
        return "products/" + productId + "/" + UUID.randomUUID() + (ext.isBlank() ? "" : "." + ext);
    }

    public ProductImage confirm(Long productId, String key) {
        // En local no hay subida externa. Confirm solo registra una "imagen lógica" si el archivo ya fue subido por otro flujo.
        // Para simplificar, creamos un registro vacío (apunta a ruta local si existe).
        Product p = productRepo.findById(productId).orElseThrow(() -> new EntityNotFoundException("Producto no existe"));
        Path finalPath = Path.of(uploadDir, key);
        String publicUrl = (publicPrefix + "/" + key).replace("\\","/");
        int order = imageRepo.findByProductIdOrderBySortOrderAsc(productId).size();

        ProductImage img = ProductImage.builder()
                .product(p)
                .filePath(finalPath.toAbsolutePath().toString())
                .publicUrl(publicUrl)
                .primary(order == 0)  // primera confirmada queda como primaria
                .sortOrder(order)
                .build();
        return imageRepo.save(img);
    }

    private String getExt(String name) {
        if (name == null) return "";
        int i = name.lastIndexOf('.');
        return (i >= 0 && i < name.length()-1) ? name.substring(i+1).toLowerCase() : "";
    }
}
