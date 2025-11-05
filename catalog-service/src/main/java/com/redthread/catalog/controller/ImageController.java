package com.redthread.catalog.controller;

import com.redthread.catalog.controller.dto.ConfirmImageReq;
import com.redthread.catalog.controller.dto.PresignImageReq;
import com.redthread.catalog.model.ProductImage;
import com.redthread.catalog.repository.ProductImageRepository;
import com.redthread.catalog.service.ImageStorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/products/{productId}/images")
@RequiredArgsConstructor
public class ImageController {
    private final ImageStorageService storage;
    private final ProductImageRepository imageRepo;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProductImage upload(@PathVariable Long productId,
                               @RequestPart("file") MultipartFile file,
                               @RequestParam(defaultValue = "false") boolean primary) throws IOException {
        return storage.store(productId, file, primary);
    }

    @PostMapping("/presign")
    public Map<String, Object> presign(@PathVariable Long productId,
                                       @RequestBody @Valid PresignImageReq req) {
        String key = storage.presignKey(productId, req.filename());
        // En local no hay URL de subida externa. Regresamos 'key' para luego confirmar.
        return Map.of(
                "key", key,
                "uploadMode", "LOCAL_MOCK",
                "expectedPublicUrl", "/media/" + key
        );
    }

    @PostMapping("/confirm")
    public ProductImage confirm(@PathVariable Long productId,
                                @RequestBody @Valid ConfirmImageReq req) {
        return storage.confirm(productId, req.key());
    }

    @PostMapping("/{imageId}/primary")
    public ProductImage setPrimary(@PathVariable Long productId, @PathVariable Long imageId) {
        return storage.setPrimary(imageId);
    }

    @DeleteMapping("/{imageId}")
    public Map<String, String> delete(@PathVariable Long productId, @PathVariable Long imageId) throws IOException {
        storage.delete(imageId);
        return Map.of("status", "deleted");
    }

    @GetMapping
    public Object list(@PathVariable Long productId) {
        return imageRepo.findByProductIdOrderBySortOrderAsc(productId);
    }
}
