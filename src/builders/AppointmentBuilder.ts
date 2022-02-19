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
      return new AppointmentBuilder([])
    }

    const result = this.data.filter((a) => a.userId === user.id)
    return new AppointmentBuilder(result)
  }

  private appointmentsBetween(date: Dayjs, timeUnit: OpUnitType) {
    return this.data.filter(({ vEvent }) =>
      vEvent.occursBetween(date.startOf(timeUnit), date.endOf(timeUnit))
    )
  }

  appointmentsInDay(date: Dayjs) {
    return new AppointmentBuilder(this.appointmentsBetween(date, 'd'))
  }

  appointmentsInMonth(date: Dayjs) {
    return new AppointmentBuilder(this.appointmentsBetween(date, 'M'))
  }

  build() {
    return this.data
  }
}

export default AppointmentBuilder
