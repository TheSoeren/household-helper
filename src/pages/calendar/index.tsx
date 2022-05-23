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
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui'
import useChores from '@/hooks/useChores'
import useEvents from '@/hooks/useEvents'
import dayjs, { Dayjs } from 'dayjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'
import AppointmentTooltipContent from '@/components/Calendar/AppointmentTooltipContent'
import AppointmentFormLayout from '@/components/Calendar/AppointmentFormLayout'
import DefaultModal from '@/components/Modals/DefaultModal'
import AppointmentBuilder from '@/builders/AppointmentBuilder'

const RRulePattern = new RegExp('(?<=RRULE:).*', 'gm')

export default function CalendarPage() {
  const { locale } = useRouter()
  const { t } = useTranslation('calendar-page')
  const { chores } = useChores()
  const { events } = useEvents()

  const [currentDate, setCurrentDate] = useState(dayjs())
  const [newStartDate, setNewStartDate] = useState<Date>()
  const [appointmentFormVisible, setAppointmentFormVisible] = useState(false)
  const [appointmentData, setAppointmentData] = useState<AppointmentModel>()
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const builder = new AppointmentBuilder(chores.concat(events))

  const getAppointments = (date: Dayjs) =>
    builder
      .appointmentsInMonth(date, { leeway: { value: 2, unit: 'w' } })
      .build()

  const calendarEntries = getAppointments(currentDate).map((appointment) => {
    const startDate: Dayjs = appointment.vEvent.start.date
    const duration = appointment.vEvent.duration

    // It is possible to chain multiple rules together, but it requires additional
    // logic to work. After minimal testing i assume the chaining only works when
    // writing the faster frequencies first:
    // WORKING: FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,MO;FREQ=MONTHLY;INTERVAL=2
    // NOT WORKING: FREQ=MONTHLY;INTERVAL=2;FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,MO
    const rRule =
      appointment.vEvent.toICal().match(RRulePattern)?.join(';') ?? ''

    const output: AppointmentModel = {
      ...appointment,
      startDate: startDate.toDate(),
      endDate: startDate.add(1, 'm').toDate(),
      rRule,
    }

    if (duration && typeof duration === 'number') {
      output.endDate = startDate.add(duration, 'millisecond').toDate()
    }

    return output
  })

  const currentDateChange = (date: Date) => {
    setCurrentDate(dayjs(date))
  }

  return (
    <>
      <DefaultModal
        open={tooltipVisible}
        onHide={() => setTooltipVisible(false)}
      >
        <AppointmentTooltipContent data={appointmentData} />
      </DefaultModal>
      <Scheduler data={calendarEntries} firstDayOfWeek={1} locale={locale}>
        <Toolbar />
        <ViewState
          currentDate={currentDate.toISOString()}
          onCurrentDateChange={currentDateChange}
        />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton messages={{ today: t('today') }} />
        <WeekView
          displayName={t('week-view.label')}
          cellDuration={60}
          startDayHour={6}
          timeTableCellComponent={(props) => (
            <WeekView.TimeTableCell
              {...props}
              onDoubleClick={() => {
                setNewStartDate(props.startDate)
                setAppointmentFormVisible(true)
              }}
            >
              {props.children}
            </WeekView.TimeTableCell>
          )}
        />
        <MonthView displayName={t('month-view.label')} />
        <Appointments
          recurringIconComponent={() => null}
          appointmentComponent={(props) => (
            <Appointments.Appointment
              {...props}
              onClick={(e) => {
                setAppointmentData(e.data)
                setTooltipVisible(true)
              }}
              onDoubleClick={() => {
                /* Nothing */
              }}
            />
          )}
        />
        <AllDayPanel />
        <AppointmentForm
          layoutComponent={() => (
            <AppointmentFormLayout
              startDate={newStartDate}
              onClose={() => setAppointmentFormVisible(false)}
            />
          )}
          visible={appointmentFormVisible}
        />
      </Scheduler>
    </>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    if (!locale) return { props: {} }

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'dashboard-layout',
          'calendar-page',
          'appointment-creation',
        ])),
      },
    }
  },
})
