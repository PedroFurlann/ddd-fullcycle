import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.constructor.name).toBe("Product");
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 1);

    expect(product.constructor.name).toBe("ProductB");
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
  });

  it("should throw an error when product type is invalid", () => {
    expect(() => ProductFactory.create("c", "Product C", 1)).toThrow(
      "Invalid product type."
    );
  });
});
