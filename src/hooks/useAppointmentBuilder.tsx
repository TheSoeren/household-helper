import { useUser } from '@supabase/supabase-auth-helpers/react'
import Appointment from '@/models/Appointment'
import { Dayjs, ManipulateType } from 'dayjs'

interface AppointmentsBetweenConfig {
  leeway?: {
    value: number
    unit: ManipulateType
  }
}

type AppointmentsInFunction = (
  date: Dayjs,
  config?: AppointmentsBetweenConfig
) => AppointmentBuilder

interface AppointmentBuilder {
  ownAppointments: () => AppointmentBuilder
  appointmentsInDay: AppointmentsInFunction
  appointmentsInMonth: AppointmentsInFunction
  concat: (builder: AppointmentBuilder) => AppointmentBuilder
  build: () => Appointment[]
}

export default function useAppointmentBuilder(
  data: Appointment[]
): AppointmentBuilder {
  let appointments = [...data]
  const { user } = useUser()

  const appointmentsBetween = (
    date: Dayjs,
    timeUnit: ManipulateType,
    config?: AppointmentsBetweenConfig
  ) => {
    return data.filter(({ vEvent }) => {
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

  const builder = {
    ownAppointments: () => {
      if (!user) {
        appointments = []
        return builder
      }

      appointments = data.filter((a) => a.userId === user.id)
      return builder
    },

    appointmentsInDay: (date: Dayjs, config?: AppointmentsBetweenConfig) => {
      appointments = appointmentsBetween(date, 'd', config)
      return builder
    },

    appointmentsInMonth: (date: Dayjs, config?: AppointmentsBetweenConfig) => {
      appointments = appointmentsBetween(date, 'M', config)
      return builder
    },

    concat: (builder: AppointmentBuilder) => {
      appointments = data.concat(builder.build())
      return builder
    },

    build: () => {
      return appointments
    },
  }

  return builder
}
