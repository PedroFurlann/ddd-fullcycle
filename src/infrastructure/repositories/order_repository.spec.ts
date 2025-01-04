import { Sequelize } from "sequelize-typescript";
import OrderModel from "../database/sequelize/model/order.model";
import OrderRepository from "./order_repository";
import Order from "../../domain/entities/order";
import Address from "../../domain/value_objects/address";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});