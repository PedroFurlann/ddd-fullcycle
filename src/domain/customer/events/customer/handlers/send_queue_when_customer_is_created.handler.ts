import EventHandlerInterface from "../../../../@shared/events/event_handler.interface";
import CustomerCreatedEvent from "../customer_created.event";

export default class SendQueueWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
  }
}
