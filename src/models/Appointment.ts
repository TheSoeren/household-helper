import { VEvent } from '@/setups/rschedule'
import Icon from './Icon'

class Appointment {
  id?: string
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
    this.description = description
    this.title = title
    this.icon = icon
    this.vEvent = vEvent
    this.allDay = allDay
  }

  toString() {
    return JSON.stringify({
      ...this,
      vEvent: this.vEvent.toICal(),
    })
  }
}

export default Appointment
