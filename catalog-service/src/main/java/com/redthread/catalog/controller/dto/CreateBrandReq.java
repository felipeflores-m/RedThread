package com.redthread.catalog.controller.dto;

import jakarta.validation.constraints.*;

public record CreateBrandReq(
        @NotBlank String name
) {}



