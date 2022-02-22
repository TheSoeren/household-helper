import AppointmentCard from '@/components/Cards/AppointmentCard'
import Appointment from '@/models/Appointment'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

type AppointmentListProps = {
  appointments: Appointment[]
  title?: string
  empty?: string | ReactNode
}

export default function AppointmentList({
  appointments,
  title,
  empty,
}: AppointmentListProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="text-center flex px-3 pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{title}</h6>
      </div>
      <div className="flex flex-wrap py-6">
        {!appointments.length ? (
          <div className="mx-2 text-2xl text-slate-300">
            {empty ?? t('no-appointments')}
          </div>
        ) : null}
        {appointments.map((appointment) => (
          <div
            className="w-full xl:w-3/12 mb-3 md:mb-2 px-3"
            key={appointment.id}
          >
            <AppointmentCard appointment={appointment} />
          </div>
        ))}
      </div>
    </>
  )
}
