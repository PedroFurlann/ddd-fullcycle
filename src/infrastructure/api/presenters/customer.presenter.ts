import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../use-cases/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    }

    return toXML({
      customers: {
        customer: data.customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
          },
        })),
      }
    }, xmlOptions);

  }
}