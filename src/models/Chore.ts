import AppointmentType from '@/enums/AppointmentType'
import { VEvent } from '@/setups/rschedule'
import Icon from './Icon'
import Appointment from './Appointment'

class Chore extends Appointment {
  constructor(
    userId: string,
    title: string,
    description: string,
    icon: Icon,
    vEvent: VEvent,
    allDay: boolean
  ) {
    super(userId, title, description, icon, vEvent, allDay)

    this.type = AppointmentType.CHORE
  }
}

export default Chore
