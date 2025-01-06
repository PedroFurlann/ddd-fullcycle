import Customer from "../../customer/entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Pedro Furlan");
    

    const orderItem1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const orderItem2 = new OrderItem("2", "Item 2", 200, "p2", 2);

    const order = OrderService.placeOrder(customer, [orderItem1, orderItem2]);

    expect(order.total()).toBe(600);
    expect(customer.rewardPoints).toBe(300);
  })

  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const orderItem2 = new OrderItem("2", "Item 2", 200, "p2", 2);

    const order1 = new Order("1", "123", [orderItem1]);
    const order2 = new Order("2", "123", [orderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);
  });
});