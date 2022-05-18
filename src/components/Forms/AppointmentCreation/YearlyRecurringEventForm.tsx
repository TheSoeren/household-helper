import { months } from '@/data'
import useValidation from '@/hooks/useValidation'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'
import MonthlyRepetitionTypeForm from './MonthlyRepetitionTypeForm'

const validation = {
  interval: {
    required: true,
  },
  byMonthOfYear: {
    required: true,
  },
}

export default function YearlyRecurringEventForm() {
  const { register, unregister, control } = useFormContext()
  const { t } = useTranslation('appointment-creation')
  const { error } = useValidation([
    'ruleOptions.interval',
    'ruleOptions.byMonthOfYear',
  ])

  useEffect(() => {
    register('ruleOptions.byMonthOfYear', validation.byMonthOfYear)
    return () => {
      unregister('ruleOptions.interval', { keepDefaultValue: true })
      unregister('ruleOptions.byMonthOfYear', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <div className="flex flex-col gap-4 mt-4 xl:w-2/3">
      <div>
        <div className="flex w-full gap-4">
          <span className="my-auto text-slate-600">{t('every')}</span>
          <input
            type="number"
            min={1}
            className="py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            placeholder={t('fields.interval.placeholder')}
            {...register('ruleOptions.interval', validation.interval)}
          />
          <span className="my-auto text-slate-600">{t('year')}</span>
        </div>
        {error['ruleOptions.interval'] && (
          <span className="text-red-500">
            {t('fields.interval.error.' + error['ruleOptions.interval'])}
          </span>
        )}
      </div>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('on')}
        </label>
        <div className="flex flex-wrap justify-between">
          <Checkboxes
            options={months}
            control={control}
            name="ruleOptions.byMonthOfYear"
            className="w-1/6"
          />
        </div>
        {error['ruleOptions.byMonthOfYear'] && (
          <span className="text-red-500">
            {t(
              'fields.month-of-year.error.' + error['ruleOptions.byMonthOfYear']
            )}
          </span>
        )}
      </div>
      <MonthlyRepetitionTypeForm />
    </div>
  )
}
