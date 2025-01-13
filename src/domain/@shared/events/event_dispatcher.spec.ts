import CustomerCreatedEvent from "../../customer/events/customer/customer_created.event";
import CustomerSetAddressEvent from "../../customer/events/customer/customer_set_address.event";
import SendEmailWhenCustomerAddressIsChangedHandler from "../../customer/events/customer/handlers/send_email_when_customer_address_is_changed.handler";
import SendEmailWhenCustomerIsCreatedHandler from "../../customer/events/customer/handlers/send_email_when_customer_is_created.handler";
import SendQueueWhenCustomerIsCreatedHandler from "../../customer/events/customer/handlers/send_queue_when_customer_is_created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/events/handlers/send_email_when_product_is_created.handler";
import ProductCreatedEvent from "../../product/events/product_created.event";
import EventDispatcher from "./event_dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(1);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toHaveLength(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customerAddressChangedEmailHandler = new SendEmailWhenCustomerAddressIsChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyCustomerAddressChangedEventHandler = jest.spyOn(customerAddressChangedEmailHandler, "handle");
    const customerCreatedEmailHandler = new SendEmailWhenCustomerIsCreatedHandler();
    const spyCustomerCreatedEmailHandler = jest.spyOn(customerCreatedEmailHandler, "handle");
    const customerCreatedQueueHandler = new SendQueueWhenCustomerIsCreatedHandler();
    const spyCustomerCreatedQueueHandler = jest.spyOn(customerCreatedQueueHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerSetAddressEvent", customerAddressChangedEmailHandler);
    eventDispatcher.register("CustomerCreatedEvent", customerCreatedQueueHandler);
    eventDispatcher.register("CustomerCreatedEvent", customerCreatedEmailHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerSetAddressEvent"][0]
    ).toMatchObject(customerAddressChangedEmailHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(customerCreatedQueueHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(customerCreatedEmailHandler);
    

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
    });

    const customerAddressChangedEvent = new CustomerSetAddressEvent({
      id: "Customer-1",
      name: "Pedro Furlan",
      address: {
        street: "Rua A",
        number: 1,
        city: "São Paulo",
        state: "SP",
        zipCode: "00000-000",
      },
    })

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "Customer-1",
      name: "Pedro Furlan",
    })

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyCustomerCreatedEmailHandler).toHaveBeenCalledTimes(1);
    expect(spyCustomerCreatedQueueHandler).toHaveBeenCalledTimes(1);
    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyCustomerAddressChangedEventHandler).toHaveBeenCalledTimes(1);
  });
});
