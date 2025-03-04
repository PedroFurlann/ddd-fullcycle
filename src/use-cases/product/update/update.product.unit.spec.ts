import Product from "../../../domain/product/entities/product";
import UpdateProductUsecase from "./update.product.usecase";

const product = new Product("1", "Product 1", 100);

const input = {
  id: "1",
  name: "Product Updated",
  price: 200,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
  };
};

describe ("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUsecase(productRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});