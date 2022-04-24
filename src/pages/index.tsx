import useEvents from '@/hooks/useEvents'
import useChores from '@/hooks/useChores'
import AppointmentList from '@/components/Lists/AppointmentList'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dayjs from 'dayjs'
import AppointmentBuilder from '@/builders/AppointmentBuilder'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

export default function Home() {
  const { t } = useTranslation('home-page')
  const { chores } = useChores()
  const { events } = useEvents()

  const ownAppointmentsToday = new AppointmentBuilder([...chores, ...events])
    .ownAppointments()
    .appointmentsInDay(dayjs())
    .build()
  const ownChores = new AppointmentBuilder(chores).ownAppointments().build()

  const myAppointmentsTodayEmpty = (
    <Trans i18nKey="no-appointments-today" t={t}>
      <i className="mx-3 fa-regular fa-laugh" />
    </Trans>
  )

  const myAppointmentsEmpty = (
    <Trans i18nKey="no-own-chores" t={t}>
      <i className="mx-3 fa-regular fa-surprise" />
    </Trans>
  )

  return (
    <>
      <AppointmentList
        title={t('my-appointments-today')}
        empty={myAppointmentsTodayEmpty}
        appointments={ownAppointmentsToday}
      />
      <AppointmentList
        title={t('my-chores')}
        empty={myAppointmentsEmpty}
        appointments={ownChores}
      />
    </>
  )
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    const translations = locale
      ? await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'home-page',
        ])
      : {}

    return {
      props: translations,
    }
  },
})
