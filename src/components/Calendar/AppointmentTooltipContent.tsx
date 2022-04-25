import Appointment from '@/models/Appointment'
import {
  AppointmentModel,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler'
import dayjs from 'dayjs'

interface AppointmentData
  extends AppointmentModel,
    Omit<Partial<Appointment>, 'id'> {}

interface Props extends AppointmentTooltip.ContentProps {
  appointmentData?: AppointmentData
}

export default function AppointmentTooltipContent({ appointmentData }: Props) {
  if (!appointmentData)
    return <span className="px-3 pb-3 font-bold text-red-800"></span>

  const start = dayjs(appointmentData.startDate)
  const end = dayjs(appointmentData.endDate)

  return (
    <div className="px-3 pb-3 text-slate-700">
      <div className="flex">
        {appointmentData.icon && (
          <div className="flex items-center mr-3">
            <div
              className={
                'text-white inline-flex items-center justify-center w-10 h-10 rounded-full ' +
                appointmentData.icon.color
              }
            >
              <i className={appointmentData.icon.faclass}></i>
            </div>
          </div>
        )}
        <div className="tooltip-header">
          <h1 className="text-xl font-bold">{appointmentData.title}</h1>
          <span>{start.format('DD. MMMM YYYY')}</span>
          {start.diff(end, 'd') ? (
            <span> - {end.format('DD. MMMM YYYY')}</span>
          ) : null}
        </div>
      </div>
      <hr className="my-1" />
      <div className="overflow-y-auto max-h-28">
        <p>{appointmentData.description}</p>
      </div>
      {!appointmentData.allDay ? (
        <>
          <hr className="my-1" />
          <i className="fa-regular fa-clock mr-2" />
          <span>
            {start.format('HH:mm')} - {end.format('HH:mm')}
          </span>
        </>
      ) : null}
    </div>
  )
}
