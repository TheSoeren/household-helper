import { VEvent } from "@/setups/rschedule";
import Icon from "./Icon";

class Appointment {
  id?: string;
  responsible: string;
  title: string;
  description: string;
  icon: Icon | null;
  vEvent: VEvent;

  constructor(
    responsible: string,
    title: string,
    description: string,
    icon: Icon,
    vEvent: VEvent
  ) {
    this.responsible = responsible;
    this.description = description;
    this.title = title;
    this.icon = icon;
    this.vEvent = vEvent;
  }

  toString() {
    return JSON.stringify({
      ...this,
      vEvent: this.vEvent.toICal(),
    });
  }
}

export default Appointment;
