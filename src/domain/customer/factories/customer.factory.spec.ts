import Address from "../value_objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer 1");

    expect(customer.constructor.name).toBe("Customer");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    expect(customer.constructor.name).toBe("Customer");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toStrictEqual(address);
  });
});
