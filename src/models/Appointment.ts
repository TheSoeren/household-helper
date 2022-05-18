import AppointmentType from '@/enums/AppointmentType'
import { VEvent } from '@/setups/rschedule'
import Icon from './Icon'

class Appointment {
  id?: string
  type: AppointmentType
  title: string
  description: string
  icon: Icon | null
  vEvent: VEvent
  allDay: boolean
  userId: string

  constructor(
    userId: string,
    title: string,
    description: string,
    icon: Icon,
    vEvent: VEvent,
    allDay: boolean
  ) {
    this.userId = userId
    this.type = AppointmentType.APPOINTMENT
    this.description = description
    this.title = title
    this.icon = icon
    this.vEvent = vEvent
    this.allDay = allDay
  }

  toString() {
    const currentObject: Partial<this> = Object.assign({}, this)
    delete currentObject.type

    return JSON.stringify({
      ...currentObject,
      vEvent: this.vEvent.toICal(),
    })
  }
}

export default Appointment
