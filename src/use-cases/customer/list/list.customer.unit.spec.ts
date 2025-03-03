import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/value_objects/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Pedro Furlan",
  new Address("Street 1", 123, "12345678", "São Paulo")
);

const customer2 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street 2", 1234, "123456789", "Rio de Janeiro")
);

const input = {}


const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
  };
};

describe("Unit test list customer use case", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output.customers).toHaveLength(2);
    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].address.street).toEqual(
      customer1.Address.street
    );

    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].address.street).toEqual(
      customer2.Address.street
    );
  });
});
