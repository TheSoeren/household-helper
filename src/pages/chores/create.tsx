import AppointmentCreation from '@/components/Forms/AppointmentCreation'
import API_KEY from '@/utils/apiKey'
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export default function Create() {
  const { t } = useTranslation('chores-creation')
  const router = useRouter()

  return (
    <div className="xl:w-2/3">
      <AppointmentCreation
        title={t('title')}
        apiKey={API_KEY.chore}
        afterSubmit={() => router.push('/chores')}
      />
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    if (!locale) return { props: {} }

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'chores-creation',
          'appointment-creation',
        ])),
      },
    }
  },
})
