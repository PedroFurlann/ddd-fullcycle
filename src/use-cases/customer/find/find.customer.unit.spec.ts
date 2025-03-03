import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/value_objects/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Pedro Furlan");
const address = new Address("Street 1", 123, "12345678", "São Paulo");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
  };
};

describe("Unit test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

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
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error if customer not found", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(customerRepository);

    const input = { id: "123" };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
