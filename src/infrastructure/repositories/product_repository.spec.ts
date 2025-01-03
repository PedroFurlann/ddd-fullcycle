import { Sequelize } from "sequelize-typescript";
import ProductModel from "../database/sequelize/model/product.model";
import Product from "../../domain/entities/product";
import ProductRepository from "./product_repository";

describe("Product Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product by id", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const foundProduct = await productRepository.findById("1");

    expect(foundProduct).toStrictEqual(product);
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    expect(foundProducts.length).toBe(2);
    expect(foundProducts).toStrictEqual([product1, product2]);
  })
});
