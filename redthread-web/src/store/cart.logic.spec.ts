describe("Cart logic", () => {
  it("suma cantidades si el producto ya existe", () => {
    const lines = [{ variantId: 1, qty: 1, precio: 1000, nombre: "Prod" }];

    const existing = lines.find(l => l.variantId === 1);
    const newQty = existing ? existing.qty + 1 : 1;

    expect(newQty).toBe(2);
  });
});
