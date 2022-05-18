import API_KEY from '@/utils/apiKey'
import { AppointmentForm } from '@devexpress/dx-react-scheduler'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import AppointmentCreation from '../Forms/AppointmentCreation'

export default function AppointmentFormLayout(
  props: AppointmentForm.LayoutProps
) {
  const { t } = useTranslation('calendar-page')
  const router = useRouter()

  return (
    <AppointmentCreation
      {...props}
      title={t('create-title')}
      apiKey={API_KEY.event}
      afterSubmit={() => router.push('/calendar')}
    />
  )
}
