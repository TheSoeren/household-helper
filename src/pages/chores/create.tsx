import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Chore from '@/models/Chore'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import dayjs from 'dayjs'
import { DateAdapter, RRule, VEvent } from '@/setups/rschedule'
import Icon from '@/models/Icon'
import { postRequest } from '@/utils/httpRequests'
import RepetitionPattern from '@/enums/RepetitionPattern'
import {
  ChoreDataForm,
  DailyRecurringEventForm,
  WeeklyRecurringEventForm,
  DateRangeForm,
  MonthlyRecurringEventForm,
  YearlyRecurringEventForm,
} from '@/components/Forms/ChoreCreation'
import {
  colors,
  icons,
  repetitionPatterns,
  customRepetitionPatterns,
  monthlyRepetitionType,
} from '@/data'

export default function Create() {
  const { t } = useTranslation('chores-creation')
  const { user } = useUser()

  const formContext = useForm({
    defaultValues: {
      icon: {
        faclass: icons[0],
        color: colors[0],
      },
      rrule: {
        frequency: repetitionPatterns[0],
        customFrequency: 1,
        customFrequencyPattern: customRepetitionPatterns[1],
        dayOfWeek: [dayjs().format('dd').toUpperCase()],
        dayOfMonth: dayjs().date(),
        monthOfYear: [dayjs().format('MMM').toUpperCase()],
        startDate: new Date(),
        endDate: null,
      },
      monthlyRepetitionType: monthlyRepetitionType[0],
    },
  })
  const { handleSubmit, watch } = formContext

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data)
    if (!user) return

    const start = dayjs().subtract(1, 'month')
    const rule = new RRule({
      frequency: 'WEEKLY',
      byDayOfWeek: [DateAdapter.WEEKDAYS[dayjs().day()]],
      byHourOfDay: [dayjs().hour() as DateAdapter.Hour],
      start,
    })

    const icon = new Icon(data.icon.faclass.value, data.icon.color.value)
    const vevent = new VEvent({
      start,
      rrules: [rule],
      duration: 2 * 60 * 60 * 1000,
    })
    const chore = new Chore(user.id, data.title, data.description, icon, vevent)

    // https://regebro.wordpress.com/2009/01/28/ui-help-needed-recurring-events-form-usability/
    // await postRequest('/api/chore', chore.toString())
  }

  const renderFrequencyForms = () => {
    const frequency = watch('rrule.frequency').value
    switch (frequency) {
      case RepetitionPattern.DAILY:
        return <DailyRecurringEventForm />
      case RepetitionPattern.WEEKLY:
        return <WeeklyRecurringEventForm />
      case RepetitionPattern.MONTHLY:
        return <MonthlyRecurringEventForm />
      case RepetitionPattern.YEARLY:
        return <YearlyRecurringEventForm />
      default:
        return
    }
  }

  return (
    <div className="px-3">
      <div className="flex py-6 text-center">
        <h6 className="text-xl font-bold text-slate-700">{t('title')}</h6>
      </div>
      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ChoreDataForm />
          {renderFrequencyForms()}
          <DateRangeForm />

          <button
            className="my-4 w-1/3 md:w-1/4 px-6 py-3 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow cursor-pointer bg-slate-800 active:bg-slate-600 hover:shadow-lg"
            type="submit"
          >
            {t('create')}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    const translations = locale
      ? await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'chores-creation',
        ])
      : {}

    return {
      props: {
        ...translations,
      },
    }
  },
})
