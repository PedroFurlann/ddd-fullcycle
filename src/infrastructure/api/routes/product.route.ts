import express, { Request, Response } from 'express';
import CreateProductUsecase from '../../../use-cases/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../use-cases/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUsecase(new ProductRepository());

  try {
    const productDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDto);

    res.send(output);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});