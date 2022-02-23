import { useUser } from '@supabase/supabase-auth-helpers/react'
import Appointment from '@/models/Appointment'
import { Dayjs, OpUnitType } from 'dayjs'

class AppointmentBuilder {
  data: Appointment[]
  isAtMonth: any

  constructor(data: Appointment[]) {
    this.data = data
  }

  ownAppointments() {
    const { user } = useUser()

    if (!user) {
      this.data = []
      return this
    }

    this.data = this.data.filter((a) => a.userId === user.id)
    return this
  }

  private appointmentsBetween(date: Dayjs, timeUnit: OpUnitType) {
    return this.data.filter(({ vEvent }) =>
      vEvent.occursBetween(date.startOf(timeUnit), date.endOf(timeUnit))
    )
  }

  appointmentsInDay(date: Dayjs) {
    this.data = this.appointmentsBetween(date, 'd')
    return this
  }

  appointmentsInMonth(date: Dayjs) {
    this.data = this.appointmentsBetween(date, 'M')
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
