import useEvents from '@/hooks/useEvents'
import useChores from '@/hooks/useChores'
import AppointmentList from '@/components/Lists/AppointmentList'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
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

Home.layout = Dashboard

export const getServerSideProps = withAuthRequired({
  redirectTo: '/auth/authenticate',
  getServerSideProps: async ({ locale }) => {
    let translations = {}

    if (locale) {
      translations = await serverSideTranslations(locale, [
        'sidebar',
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
