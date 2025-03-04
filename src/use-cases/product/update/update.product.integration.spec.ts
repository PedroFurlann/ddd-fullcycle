import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";
import Product from "../../../domain/product/entities/product";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUsecase(productRepository)

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);
    
    const input = {
      id: "1",
      name: "Product 2",
      price: 200
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});