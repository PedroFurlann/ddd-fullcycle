import Product from "../entities/product";
import ProductInterface from "../entities/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entities/product_b";

export default class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Invalid product type.");
    }
  }
}