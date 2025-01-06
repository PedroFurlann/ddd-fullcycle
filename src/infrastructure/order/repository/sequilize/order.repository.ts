import Order from "../../../../domain/checkout/entities/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repositories/order_repository.interface";
import OrderItem from "../../../../domain/checkout/entities/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await Promise.all(
      entity.items.map((item) =>
        OrderItemModel.upsert({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        })
      )
    );

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      include: [{ model: OrderItemModel }],
      where: {
        id,
      },
    });
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      this.OrderModelItemsModelToOrderItems(orderModel.items)
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          this.OrderModelItemsModelToOrderItems(orderModel.items)
        )
    );
  }

  private OrderModelItemsModelToOrderItems(
    orderModelItems: OrderItemModel[]
  ): OrderItem[] {
    return orderModelItems?.map((orderModelItem) => {
      return new OrderItem(
        orderModelItem.id,
        orderModelItem.name,
        orderModelItem.price,
        orderModelItem.product_id,
        orderModelItem.quantity
      );
    });
  }
}
