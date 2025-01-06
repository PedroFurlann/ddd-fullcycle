import Order from "../entities/order";
import OrderItem from "../entities/order_item";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}

export default class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const orderItems = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });

    return new Order(props.id, props.customerId, orderItems);
  }
}
