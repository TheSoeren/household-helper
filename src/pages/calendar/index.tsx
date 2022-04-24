import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
  AllDayPanel,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui'
import AppointmentBuilder from '@/builders/AppointmentBuilder'
import useChores from '@/hooks/useChores'
import useEvents from '@/hooks/useEvents'
import dayjs, { Dayjs } from 'dayjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect } from 'react'
import AppointmentTooltipContent from '@/components/Calendar/AppointmentTooltipContent'

const RRulePattern = new RegExp('(?<=RRULE:).*', 'gm')

export default function CalendarPage() {
  const { locale } = useRouter()
  const { t } = useTranslation('calendar-page')
  const { chores } = useChores()
  const { events } = useEvents()
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [calendarEntries, setCalendarEntries] = useState<AppointmentModel[]>([])

  const getAppointments = (date: Dayjs) =>
    new AppointmentBuilder([...chores, ...events])
      .appointmentsInMonth(date, { leeway: { value: 2, unit: 'w' } })
      .build()

  useEffect(() => {
    const relevantAppointments = getAppointments(currentDate).map(
      ({ title, vEvent, allDay }) => {
        const startDate: Dayjs = vEvent.start.date

        // It is possible to chain multiple rules together, but it requires additional
        // logic to work. After minimal testing i assume the chaining only works when
        // writing the faster frequencies first:
        // WORKING: FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,MO;FREQ=MONTHLY;INTERVAL=2
        // NOT WORKING: FREQ=MONTHLY;INTERVAL=2;FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,MO
        const rRule = vEvent.toICal().match(RRulePattern)?.join(';') ?? ''

        const output: AppointmentModel = {
          title,
          startDate: startDate.toDate(),
          endDate: startDate.add(1, 'm').toDate(),
          rRule,
          allDay,
        }

        if (vEvent.duration && typeof vEvent.duration === 'number') {
          output.endDate = startDate
            .add(vEvent.duration, 'millisecond')
            .toDate()
        }

        return output
      }
    )

    setCalendarEntries(relevantAppointments)
  }, [currentDate])

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
      <WeekView
        displayName={t('week-view.label')}
        cellDuration={60}
        startDayHour={6}
      />
      <Appointments />
      <AllDayPanel />
      <AppointmentTooltip
        recurringIconComponent={() => <></>}
        contentComponent={(props) => <AppointmentTooltipContent {...props} />}
      />
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
