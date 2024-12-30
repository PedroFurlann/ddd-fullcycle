export default class Address {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;
  _state: string;

  constructor(
    street: string,
    city: string,
    state: string,
    number: number,
    zip: string
  ) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._state = state;

    this.validate();
  }

  validate() {
    if (!this._street) {
      throw new Error("Street is required.");
    }

    if (!this._number) {
      throw new Error("Number is required.");
    }

    if (!this._zip) {
      throw new Error("Zip is required.");
    }

    if (!this._city) {
      throw new Error("City is required.");
    }

    if (!this._state) {
      throw new Error("State is required.");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip}, ${this._city} - ${this._state}`;
  }
}
