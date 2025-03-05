import Product from "./product";

describe("Produto unit tests", () => {
  it("should throw an error when id is empty", () => {
    const id = "";
    const name = "Produto 1";
    const price = 10;

    expect(() => new Product(id, name, price)).toThrow(
      "product: Id is required,"
    );
  });

  it("should throw an error when name is empty", () => {
    const id = "1";
    const name = "";
    const price = 10;

    expect(() => new Product(id, name, price)).toThrow(
      "product: Name is required,"
    );
  });

  it("should throw an error when price is less than 0", () => {
    const id = "1";
    const name = "Produto 1";
    const price = -1;

    expect(() => new Product(id, name, price)).toThrow(
      "product: Price must be greater than zero,"
    );
  });

  it("should throw an error when name and id are empty", () => {
    const id = "";
    const name = "";
    const price = 10;

    expect(() => new Product(id, name, price)).toThrow(
      "product: Id is required,product: Name is required,"
    );
  });

  it("should change product name", () => {
    const product = new Product("1", "Produto 1", 10);

    product.changeName("Produto 2");

    expect(product.name).toBe("Produto 2");
  });

  it("should change product price", () => {
    const product = new Product("1", "Produto 1", 10);

    product.changePrice(20);

    expect(product.price).toBe(20);
  });
});
