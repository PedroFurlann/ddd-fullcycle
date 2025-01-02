import Order from "../entities/order";
import OrderItem from "../entities/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const orderItem2 = new OrderItem("2", "Item 2", 200, "p2", 2);

    const order1 = new Order("1", "123", [orderItem1]);
    const order2 = new Order("2", "123", [orderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);
  });
});