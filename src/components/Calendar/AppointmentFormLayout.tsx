import API_KEY from '@/utils/apiKey'
import { AppointmentForm } from '@devexpress/dx-react-scheduler'
import { useTranslation } from 'next-i18next'
import AppointmentCreation from '../Forms/AppointmentCreation'

type Props = AppointmentForm.LayoutProps & {
  onClose: () => void
}

export default function AppointmentFormLayout({ onClose, ...props }: Props) {
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
          {...props}
          title={t('create-title')}
          apiKey={API_KEY.event}
          afterSubmit={onClose}
        />
      </div>
    </>
  )
}
