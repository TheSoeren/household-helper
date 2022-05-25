import AppointmentCreation from '@/components/Forms/AppointmentCreation'
import useChores from '@/hooks/useChores'
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export default function Create() {
  const { t } = useTranslation('chores-creation')
  const router = useRouter()
  const { addChore } = useChores()

  return (
    <div className="xl:w-2/3">
      <AppointmentCreation
        title={t('title')}
        onCreate={addChore}
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
