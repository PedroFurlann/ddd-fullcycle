import Product from "../../../domain/product/entities/product";
import CreateProductUsecase from "./create.product.usecase";


const input = {
  type: "a",
  name: "Product 1",
  price: 100,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUsecase(productRepository);

    const output = {
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});