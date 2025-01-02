import Customer from "./entities/customer";
import Order from "./entities/order";
import OrderItem from "./entities/order_item";
import Address from "./value_objects/address";

let customer = new Customer("123", "Pedro Furlan");
const address = new Address("Rua dois", "São Paulo", "SP", 2, "12345-678");
customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
const order = new Order("1", "123", [item1, item2]);

