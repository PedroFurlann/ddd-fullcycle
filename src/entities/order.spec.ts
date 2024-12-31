import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw an error when id is empty", () => {
    const id = "";
    const customerId = "1";

    expect(() => new Order(id, customerId, [])).toThrow("Id is required.");
  });

  it("should throw an error when customer id is empty", () => {
    const id = "1";
    const customerId = "";

    expect(() => new Order(id, customerId, [])).toThrow("Customer id is required.");
  });

  it("should throw an error when items is empty", () => {
    const id = "1";
    const customerId = "1";

    expect(() => new Order(id, customerId, [])).toThrow("Items quantity must be greater than 0.");
  });

  it("should calculate total", () => {
    const id = "1";
    const customerId = "1";

    const item1 = new OrderItem("1", "item 1", 10);
    const item2 = new OrderItem("2", "item 2", 20);

    const order = new Order(id, customerId, [item1, item2]);

    expect(order.total()).toBe(30);
  });
});
