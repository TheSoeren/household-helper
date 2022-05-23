import API_KEY from '@/utils/apiKey'
import { useTranslation } from 'next-i18next'
import AppointmentCreation from '../Forms/AppointmentCreation'

interface Props {
  startDate?: Date
  onClose: () => void
}

export default function AppointmentFormLayout({ startDate, onClose }: Props) {
  const { t } = useTranslation('calendar-page')

  return (
    <>
      <div>
        <button
          type="button"
          className="absolute w-8 h-8 text-xl text-black bg-transparent rounded-full opacity-50 cursor-pointer hover:bg-slate-200 top-3 right-3"
          onClick={onClose}
        >
          <i className="fa-solid fa-times"></i>
        </button>
        <AppointmentCreation
          title={t('create-title')}
          apiKey={API_KEY.event}
          startDate={startDate}
          afterSubmit={onClose}
        />
      </div>
    </>
  )
}
