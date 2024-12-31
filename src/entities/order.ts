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
  }

  total() {
    return this._items.reduce((acc, item) => acc + item._price, 0);
  }
}