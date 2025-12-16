import type { CreateProductReq } from "./catalog.api";

describe("CreateProductReq", () => {
  it("permite crear un producto válido", () => {
    const product: CreateProductReq = {
      categoryId: 1,
      brandId: 1,
      name: "Producto test",
      basePrice: 1000,
      featured: false,
      gender: "HOMBRE"
    };

    expect(product.basePrice).toBeGreaterThan(0);
  });

  it("solo acepta género válido", () => {
    const product: CreateProductReq = {
      categoryId: 1,
      name: "Producto",
      basePrice: 500,
      featured: true,
      gender: "MUJER"
    };

    expect(product.gender).toBe("MUJER");
  });
});
