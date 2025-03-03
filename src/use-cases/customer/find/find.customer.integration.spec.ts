import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/value_objects/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customer = new Customer("123", "Pedro Furlan");

    const address = new Address("Street 1", 123, "12345678", "São Paulo");
    customer.changeAddress(address);
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const usecase = new FindCustomerUseCase(customerRepository)

    const input = { id: "123" };

    const output = {
      id: "123",
      name: "Pedro Furlan",
      address: {
        street: "Street 1",
        number: 123,
        city: "São Paulo",
        zip: "12345678",
      },
    }
    
    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
