import AppointmentType from '@/enums/AppointmentType'
import useChores from '@/hooks/useChores'
import useEvents from '@/hooks/useEvents'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'
import CardDeleteButton from '../Cards/CardDeleteButton'

interface Props {
  data?: AppointmentModel
}

export default function AppointmentTooltipContent({ data }: Props) {
  const { t } = useTranslation('common')
  const { deleteChore } = useChores()
  const { deleteEvent } = useEvents()

  if (!data) return <span className="px-3 pb-3 font-bold text-red-800"></span>

  const deleteAppointment = async () => {
    if (!data.id) {
      toast.error(t('no-id-prepared'))
      return
    }

    if (data.type === AppointmentType.CHORE) {
      deleteChore(data.id.toString())
    } else if (data.type === AppointmentType.EVENT) {
      deleteEvent(data.id.toString())
    } else {
      toast.error('unable-to-delete-type-appointment')
      return
    }
  }

  const start = dayjs(data.startDate)
  const end = dayjs(data.endDate)

  return (
    <div className="group px-3 pt-2 pb-3 text-slate-700">
      <CardDeleteButton onClick={deleteAppointment} className="border-white" />
      <div className="flex">
        {data.icon && (
          <div className="flex items-center mr-3">
            <div
              className={
                'text-white inline-flex items-center justify-center w-10 h-10 rounded-full ' +
                data.icon.color
              }
            >
              <i className={data.icon.faclass}></i>
            </div>
          </div>
        )}
        <div className="tooltip-header-text">
          <h1 className="text-xl font-bold">{data.title}</h1>
          <span>{start.format('DD. MMMM YYYY')}</span>
          {start.diff(end, 'd') ? (
            <span> - {end.format('DD. MMMM YYYY')}</span>
          ) : null}
        </div>
      </div>
      {data.description ? (
        <>
          <hr className="my-1" />
          <div className="overflow-y-auto max-h-28">
            <p>{data.description}</p>
          </div>
        </>
      ) : null}
      {!data.allDay ? (
        <>
          <hr className="my-1" />
          <i className="mr-2 fa-regular fa-clock" />
          <span>
            {start.format('HH:mm')} - {end.format('HH:mm')}
          </span>
        </>
      ) : null}
    </div>
  )
}
