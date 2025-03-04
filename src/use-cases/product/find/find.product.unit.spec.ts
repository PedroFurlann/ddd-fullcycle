import Product from "../../../domain/product/entities/product";
import FindProductUseCase from "../find.product.usecase";

const product = new Product("1", "Product 1", 100);

const input = {
  id: product.id,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const output = {
      id: "1",
      name: "Product 1",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});