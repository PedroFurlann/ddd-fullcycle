import Address from "../value_objects/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw an error when id is empty", () => {
    const id = "";
    const name = "John Doe";

    expect(() => new Customer(id, name)).toThrow("Id is required.");
  });

  it("should throw an error when name is empty", () => {
    const id = "1";
    const name = "";

    expect(() => new Customer(id, name)).toThrow("Name is required.");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe");

    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe");

    const address = new Address("Ruas 2", "São Paulo", "SP", 2, "12345-678");

    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw an error when activating a customer without address", () => {
    const customer = new Customer("1", "John Doe");

    expect(() => customer.activate()).toThrow(
      "Address is mandatory to activate a customer."
    );
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  });
});
