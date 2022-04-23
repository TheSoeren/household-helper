import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { Chore, Icon } from '@/models'
import Option from '@/models/Option'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import dayjs from 'dayjs'
import { DateAdapter, IRuleOptions, RRule, VEvent } from '@/setups/rschedule'
import { getRequest, postRequest } from '@/utils/httpRequests'
import Frequency from '@/enums/Frequency'
import dynamic from 'next/dynamic'
import {
  colors,
  icons,
  repetitionPatterns,
  monthlyRepetitionType,
} from '@/data'
import { ICalRuleFrequency } from '@rschedule/core/rules/ICAL_RULES'
import WeekOfMonth from '@/enums/WeekOfMonth'
import MonthlyRepetitionType from '@/enums/MonthlyRepetitionType'
import User from '@/models/User'
import useSWR from 'swr'

interface RuleOptions
  extends Omit<
    IRuleOptions,
    | 'frequency'
    | 'interval'
    | 'start'
    | 'end'
    | 'byDayOfWeek'
    | 'byDayOfMonth'
    | 'byMonthOfYear'
  > {
  frequency: Option
  interval: string
  start: Date
  end?: Date
  byDayOfWeek: DateAdapter.Weekday[]
  byDayOfMonth: string
  byMonthOfYear: string[]
}

interface RuleConfig {
  allDay: boolean
  monthlyRepetitionType: Option
  byWeekOfMonth: WeekOfMonth
}

interface FormObject {
  title: string
  description: string
  user: Option
  icon: {
    faclass: Option
    color: Option
  }
  ruleConfig: RuleConfig
  ruleOptions: RuleOptions
}

export default function Create() {
  const { t } = useTranslation('chores-creation')

  const currentDayOfWeek = dayjs()
    .format('dd')
    .toUpperCase() as DateAdapter.Weekday
  const currentDayOfMonth = dayjs().date().toString()
  const currentMonthOfYear = dayjs().format('M')

  const formContext = useForm<FormObject>({
    defaultValues: {
      icon: {
        faclass: icons[0],
        color: colors[0],
      },
      ruleConfig: {
        allDay: false,
        monthlyRepetitionType: monthlyRepetitionType[0],
        byWeekOfMonth: WeekOfMonth.FIRST,
      },
      ruleOptions: {
        start: new Date(),
        end: undefined,
        duration: undefined,
        frequency: repetitionPatterns[0],
        interval: '1',
        byDayOfWeek: [currentDayOfWeek],
        byDayOfMonth: currentDayOfMonth,
        byMonthOfYear: [currentMonthOfYear],
      },
    },
  })
  const { handleSubmit, watch } = formContext

  const createEvent = (
    ruleOptions: RuleOptions,
    ruleConfig: RuleConfig
  ): VEvent => {
    const frequency = ruleOptions.frequency.value

    const rrule = new RRule({
      frequency: Frequency.DAILY,
      start: dayjs(ruleOptions.start),
    })

    if (ruleOptions.end) {
      Object.assign(rrule, rrule.set('end', dayjs(ruleOptions.end)))
    }

    if (frequency === Frequency.NONE) {
      Object.assign(rrule, rrule.set('count', 1))
    } else {
      Object.assign(
        rrule,
        rrule.set('frequency', frequency as ICalRuleFrequency)
      )
      Object.assign(rrule, rrule.set('interval', Number(ruleOptions.interval)))

      if (frequency === Frequency.WEEKLY) {
        Object.assign(rrule, rrule.set('byDayOfWeek', ruleOptions.byDayOfWeek))
      }

      if (frequency === Frequency.MONTHLY || frequency === Frequency.YEARLY) {
        const monthlyType = ruleConfig.monthlyRepetitionType.value
        if (monthlyType === MonthlyRepetitionType.DAY) {
          const byDayOfMonth = Number(
            ruleOptions.byDayOfMonth
          ) as DateAdapter.Day
          Object.assign(rrule, rrule.set('byDayOfMonth', [byDayOfMonth]))
        } else if (monthlyType === MonthlyRepetitionType.REGULARITY) {
          const byDayOfWeek: [DateAdapter.Weekday, number][] =
            ruleOptions.byDayOfWeek.map((v) => [
              v,
              Number(ruleConfig.byWeekOfMonth),
            ])
          Object.assign(rrule, rrule.set('byDayOfWeek', byDayOfWeek))
        }
      }

      if (frequency === Frequency.YEARLY) {
        Object.assign(
          rrule,
          rrule.set(
            'byMonthOfYear',
            ruleOptions.byMonthOfYear.map((v) => Number(v) as DateAdapter.Month)
          )
        )
      }
    }

    const vevent = new VEvent({
      start: dayjs(ruleOptions.start),
      rrules: [rrule],
      duration: (ruleOptions.duration ?? 0) * 1000 * 60,
    })

    return vevent
  }

  const onSubmit: SubmitHandler<FormObject> = async ({
    title,
    description,
    user: selectedUser,
    icon,
    ruleConfig,
    ruleOptions,
  }) => {
    const vevent = createEvent(ruleOptions, ruleConfig)
    const iconObject = new Icon(icon.faclass.value, icon.color.value)
    const chore = new Chore(
      selectedUser.value,
      title,
      description,
      iconObject,
      vevent,
      ruleConfig.allDay
    )

    await postRequest('/api/chore', chore.toString())
  }

  const renderFrequencyForms = () => {
    const frequency = watch('ruleOptions.frequency').value
    switch (frequency) {
      case Frequency.DAILY:
        return <DailyRecurringEventForm />
      case Frequency.WEEKLY:
        return <WeeklyRecurringEventForm />
      case Frequency.MONTHLY:
        return <MonthlyRecurringEventForm />
      case Frequency.YEARLY:
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
            className="w-1/3 px-6 py-3 my-4 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow cursor-pointer md:w-1/4 bg-slate-800 active:bg-slate-600 hover:shadow-lg"
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
      props: translations,
    }
  },
})

const ChoreDataForm = dynamic(
  () => import('@/components/Forms/ChoreCreation/ChoreDataForm'),
  { ssr: false }
)

const DailyRecurringEventForm = dynamic(
  () => import('@/components/Forms/ChoreCreation/DailyRecurringEventForm'),
  { ssr: false }
)

const WeeklyRecurringEventForm = dynamic(
  () => import('@/components/Forms/ChoreCreation/WeeklyRecurringEventForm'),
  { ssr: false }
)

const MonthlyRecurringEventForm = dynamic(
  () => import('@/components/Forms/ChoreCreation/MonthlyRecurringEventForm'),
  { ssr: false }
)

const DateRangeForm = dynamic(
  () => import('@/components/Forms/ChoreCreation/DateRangeForm'),
  { ssr: false }
)

const YearlyRecurringEventForm = dynamic(
  () => import('@/components/Forms/ChoreCreation/YearlyRecurringEventForm'),
  { ssr: false }
)
