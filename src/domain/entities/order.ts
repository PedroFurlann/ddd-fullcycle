import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required.");
    } 

    if (!this._customerId) {
      throw new Error("Customer id is required.");
    }
    
    if (!this._items || this._items.length === 0) {
      throw new Error("Items quantity must be greater than 0.");
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero.");
    }
  }

  calculateTotalItem(item: OrderItem) {
    return item.price * item.quantity;
  }

  total() {
    return this._items.reduce((acc, item) => acc + this.calculateTotalItem(item), 0);
  }
}