import useEvents from '@/hooks/useEvents'
import useChores from '@/hooks/useChores'
import AppointmentList from '@/components/Lists/AppointmentList'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dayjs from 'dayjs'
import AppointmentBuilder from '@/builders/AppointmentBuilder'
import Dashboard from '@/layouts/Dashboard'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

export default function Home({ user }: any) {
  const now = dayjs()
  const { t } = useTranslation('home-page')
  const { chores } = useChores([])
  const { events } = useEvents([])

  const todayBuilder = new AppointmentBuilder([
    ...chores,
    ...events,
  ]).appointmentsInDay(now)

  const appointmentsToday = todayBuilder.build()
  const ownAppointmentsToday = todayBuilder.ownAppointments().build()

  return (
    <>
      <AppointmentList
        title={t('my-appointments-today')}
        appointments={ownAppointmentsToday}
      />
      <AppointmentList
        title={t('appointments-today')}
        appointments={appointmentsToday}
      />
    </>
  )
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    let translations = {}

    if (locale) {
      translations = await serverSideTranslations(locale, [
        'dashboard-layout',
        'home-page',
      ])
    }

    return {
      props: {
        ...translations,
      },
    }
  },
})
