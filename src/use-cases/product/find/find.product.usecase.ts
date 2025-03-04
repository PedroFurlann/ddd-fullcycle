import ProductRepositoryInterface from "../../../domain/product/repositories/product_repository.interface";
import { InputFindProducctDto, OutputFindProducctDto } from "./find.product.dto";

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProducctDto): Promise<OutputFindProducctDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}