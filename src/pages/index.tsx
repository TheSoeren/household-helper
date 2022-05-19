import useEvents from '@/hooks/useEvents'
import useChores from '@/hooks/useChores'
import AppointmentList from '@/components/Lists/AppointmentList'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dayjs from 'dayjs'
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import AppointmentBuilder from '@/builders/appointmentBuilder'

export default function Home() {
  const { t } = useTranslation('home-page')
  const { user } = useUser()
  const { chores } = useChores()
  const { events } = useEvents()

  const appointmentsBuilder = new AppointmentBuilder(chores.concat(events))
  const choresBuilder = new AppointmentBuilder(chores)

  const ownAppointmentsToday = appointmentsBuilder
    .ownAppointments(user)
    .appointmentsInDay(dayjs())
    .build()
  const ownChores = choresBuilder.ownAppointments(user).build()

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
    <div className="px-4 md:px-10">
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
          'home-page',
        ])),
      },
    }
  },
})
