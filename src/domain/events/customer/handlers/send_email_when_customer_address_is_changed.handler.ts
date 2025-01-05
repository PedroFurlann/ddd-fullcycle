import EventHandlerInterface from "../../@shared/event_handler.interface";
import CustomerSetAddressEvent from "../customer_set_address.event";

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerSetAddressEvent>
{
  handle(event: CustomerSetAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}, ${event.eventData.address.state}, ${event.eventData.address.zipCode}`
    );
  }
}
