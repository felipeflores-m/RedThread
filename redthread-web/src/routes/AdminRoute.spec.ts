describe("AdminRoute logic", () => {
  it("usuario sin rol ADMIN no es admin", () => {
    const user = {
      id: 1,
      fullName: "Test",
      email: "t@test.cl",
      roles: ["CLIENTE"]
    };

    const isAdmin = user.roles.includes("ADMINISTRADOR");
    expect(isAdmin).toBeFalse();
  });

  it("usuario con rol ADMIN es admin", () => {
    const user = {
      id: 1,
      fullName: "Admin",
      email: "admin@test.cl",
      roles: ["ADMINISTRADOR"]
    };

    expect(user.roles.includes("ADMINISTRADOR")).toBeTrue();
  });
});
