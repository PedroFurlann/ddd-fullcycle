import Product from "../entities/product";

describe("Product service unit tests", () => {
  it("should change all products prices", () => {
    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);
    const products = [product1, product2];

    ProductService.increasePrices(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
