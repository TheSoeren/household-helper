import Appointment from '@/models/Appointment'
import { User } from '@supabase/supabase-js'
import { Dayjs, ManipulateType } from 'dayjs'

interface AppointmentsBetweenConfig {
  leeway?: {
    value: number
    unit: ManipulateType
  }
}

class AppointmentBuilder {
  data: Appointment[]

  constructor(data: Appointment[]) {
    this.data = data
  }

  ownAppointments(user: User | null) {
    if (!user) {
      this.data = []
      return this
    }

    this.data = this.data.filter((a) => a.userId === user.id)
    return this
  }

  private appointmentsBetween(
    date: Dayjs,
    timeUnit: ManipulateType,
    config?: AppointmentsBetweenConfig
  ) {
    return this.data.filter(({ vEvent }) => {
      let start = date.startOf(timeUnit)
      let end = date.endOf(timeUnit)

      if (config?.leeway) {
        const { value, unit } = config.leeway
        start = start.subtract(value, unit)
        end = end.add(value, unit)
      }

      return vEvent.rrules.find(
        (rrule) => rrule.occurrences({ start, end }).toArray().length > 0
      )
    })
  }

  appointmentsInDay(date: Dayjs, config?: AppointmentsBetweenConfig) {
    this.data = this.appointmentsBetween(date, 'd', config)
    return this
  }

  appointmentsInMonth(date: Dayjs, config?: AppointmentsBetweenConfig) {
    this.data = this.appointmentsBetween(date, 'M', config)
    return this
  }

  concat(builder: AppointmentBuilder) {
    this.data = this.data.concat(builder.build())
    return this
  }

  build() {
    return this.data
  }
}

export default AppointmentBuilder
