import Product from "../entities/product";
import RepositoryInterface from "../../@shared/repositories/repository.interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {}