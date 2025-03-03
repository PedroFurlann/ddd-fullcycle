import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/value_objects/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Pedro Furlan",
  new Address("Street 1", 123, "12345678", "São Paulo")
);

const input = {
  id: customer.id,
  name: "Pedro Furlan Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    city: "São Paulo Updated",
    zip: "12345678 Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
  };
};

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
