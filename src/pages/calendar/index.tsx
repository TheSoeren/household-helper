import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui'
import AppointmentBuilder from '@/builders/AppointmentBuilder'
import useChores from '@/hooks/useChores'
import useEvents from '@/hooks/useEvents'
import dayjs, { Dayjs } from 'dayjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { DayjsDateAdapter } from '@/setups/rschedule'
import { useState } from 'react'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

const RRulePattern = new RegExp('(?<=RRULE:).*', 'gm')

export default function CalendarPage() {
  const { locale } = useRouter()
  const { t } = useTranslation('calendar-page')
  const { chores } = useChores([])
  const { events } = useEvents([])
  const [currentDate, setCurrentDate] = useState(dayjs())

  const choresByMonth = (date: Dayjs) =>
    new AppointmentBuilder([...chores, ...events])
      .appointmentsInMonth(date)
      .build()

  const calendarEntries = choresByMonth(currentDate).map(
    ({ title, vEvent }) => {
      const startDate = vEvent.start.date

      // vEvent.duration is either of type number, or DayjsDateAdapter. This forces me to
      // assume the type, since there is no shared way of transforming the value to string.
      const adapterDate = (vEvent.duration as DayjsDateAdapter).date
      const millis = vEvent.duration as number

      let duration = vEvent.duration ? millis : 0
      if (DayjsDateAdapter.isDate(adapterDate)) {
        duration = adapterDate.diff(vEvent.start.date)
      }

      return {
        title,
        startDate: startDate.toISOString(),
        endDate: startDate.add(duration, 'millis').toISOString(),
        rRule: vEvent.toICal().match(RRulePattern)?.[0] ?? '',
      }
    }
  )

  // https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/date-navigation/#controlled-mode
  const currentDateChange = (date: Date) => {
    setCurrentDate(dayjs(date))
  }

  return (
    <Scheduler data={calendarEntries} firstDayOfWeek={1} locale={locale}>
      <Toolbar />
      <ViewState
        currentDate={currentDate.toISOString()}
        onCurrentDateChange={currentDateChange}
      />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton messages={{ today: t('today') }} />
      <MonthView displayName={t('month-view.label')} />
      <WeekView displayName={t('week-view.label')} />
      <Appointments />
    </Scheduler>
  )
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    const translations = locale
      ? await serverSideTranslations(locale, [
          'dashboard-layout',
          'calendar-page',
        ])
      : {}

    return {
      props: translations,
    }
  },
})
