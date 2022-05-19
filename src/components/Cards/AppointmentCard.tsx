import Appointment from '@/models/Appointment'
import User from '@/models/User'
import useSWR from 'swr'
import CardDeleteButton from './CardDeleteButton'
import API_KEY from '@/utils/apiKey'

interface AppointmentCardProps {
  appointment: Appointment
  onDelete?: () => void
}

export default function AppointmentCard({
  appointment,
  onDelete,
}: AppointmentCardProps) {
  const { title, icon, userId } = appointment

  const { data: user } = useSWR<User>(`${API_KEY.user}?id=${userId}`)

  return (
    <div className="group relative flex flex-col min-w-0 h-28 break-words bg-white rounded shadow-lg">
      {onDelete ? <CardDeleteButton onClick={onDelete} /> : null}
      <div className="flex flex-col justify-between flex-auto p-4 overflow-hidden">
        <div className="flex justify-between">
          <div className="overflow-hidden">
            <span className="font-semibold text-xl text-slate-700 line-clamp-2">
              {title}
            </span>
          </div>
          {icon ? (
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  icon.color
                }
              >
                <i className={icon.faclass}></i>
              </div>
            </div>
          ) : null}
        </div>
        <p className="text-sm text-slate-400 whitespace-nowrap">
          {user?.displayName}
        </p>
      </div>
    </div>
  )
}
