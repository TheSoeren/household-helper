import {
  AppointmentModel,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler'
import dayjs from 'dayjs'

export default function AppointmentTooltipContent({
  appointmentData,
}: AppointmentTooltip.ContentProps) {
  if (!appointmentData)
    return <span className="px-3 pb-3 font-bold text-red-800"></span>

  const { title, startDate, allDay, endDate } = appointmentData
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  return (
    <div className="px-3 pb-3">
      <h1 className="text-xl font-bold text-slate-700">{title}</h1>
      <span>{start.format('DD. MMMM YYYY')}</span>
      {start.diff(end, 'd') && <span> - {end.format('DD. MMMM YYYY')}</span>}
    </div>
  )
}
