import EventInterface from "../../../@shared/events/event.interface";

export default class CustomerSetAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
