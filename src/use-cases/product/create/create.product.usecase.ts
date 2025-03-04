import Product from "../../../domain/product/entities/product";
import ProductFactory from "../../../domain/product/factories/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repositories/product_repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.type, input.name, input.price);

    const productCreated = new Product(product.id, product.name, product.price);

    await this.productRepository.create(productCreated);

    return {
      id: productCreated.id,
      name: productCreated.name,
      price: productCreated.price,
    };
  }
}