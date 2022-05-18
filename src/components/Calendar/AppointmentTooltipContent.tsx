import AppointmentType from '@/enums/AppointmentType'
import useChores from '@/hooks/useChores'
import useEvents from '@/hooks/useEvents'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

export default function AppointmentTooltipContent({
  appointmentData,
}: AppointmentTooltip.ContentProps) {
  const { t } = useTranslation('common')
  const { deleteChore } = useChores()
  const { deleteEvent } = useEvents()

  if (!appointmentData)
    return <span className="px-3 pb-3 font-bold text-red-800"></span>

  const deleteAppointment = async () => {
    if (!appointmentData.id) {
      toast.error(t('no-id-prepared'))
      return
    }

    if (appointmentData.type === AppointmentType.CHORE) {
      deleteChore(appointmentData.id.toString())
    } else if (appointmentData.type === AppointmentType.EVENT) {
      deleteEvent(appointmentData.id.toString())
    } else {
      toast.error('unable-to-delete-type-appointment')
      return
    }
  }

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
        <div className="tooltip-header w-full flex justify-between">
          <div className="tooltip-header-text">
            <h1 className="text-xl font-bold">{appointmentData.title}</h1>
            <span>{start.format('DD. MMMM YYYY')}</span>
            {start.diff(end, 'd') ? (
              <span> - {end.format('DD. MMMM YYYY')}</span>
            ) : null}
          </div>
          <button
            className="hover:text-slate-500 h-fit"
            type="button"
            onClick={deleteAppointment}
          >
            <i className="fa-solid fa-trash" />
          </button>
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
