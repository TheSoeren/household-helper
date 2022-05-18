import AppointmentType from '@/enums/AppointmentType'
import { VEvent } from '@/setups/rschedule'
import Appointment from './Appointment'
import Icon from './Icon'

class Event extends Appointment {
  constructor(
    userId: string,
    title: string,
    description: string,
    icon: Icon,
    vEvent: VEvent,
    allDay: boolean
  ) {
    super(userId, title, description, icon, vEvent, allDay)

    this.type = AppointmentType.EVENT
  }
}

export default Event
