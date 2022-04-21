import { months } from '@/data'
import useValidation from '@/hooks/useValidation'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'
import MonthlyRepetitionTypeForm from './MonthlyRepetitionTypeForm'

const validation = {
  customFrequency: {
    required: true,
  },
  monthOfYear: {
    required: true,
  },
}

export default function YearlyRecurringEventForm() {
  const { register, unregister, control } = useFormContext()
  const { t } = useTranslation('chores-creation')
  const { error } = useValidation([
    'rrule.customFrequency',
    'rrule.monthOfYear',
  ])

  useEffect(() => {
    register('rrule.monthOfYear', validation.monthOfYear)
    return () => {
      unregister('rrule.customFrequency', { keepDefaultValue: true })
      unregister('rrule.monthOfYear', { keepDefaultValue: true })
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
            placeholder={t('fields.custom-frequency.placeholder')}
            {...register('rrule.customFrequency', validation.customFrequency)}
          />
          <span className="my-auto text-slate-600">{t('year')}</span>
        </div>
        {error['rrule.customFrequency'] && (
          <span className="text-red-500">
            {t(
              'fields.custom-frequency.error.' + error['rrule.customFrequency']
            )}
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
            name="rrule.monthOfYear"
            className="w-1/6"
          />
        </div>
        {error['rrule.monthOfYear'] && (
          <span className="text-red-500">
            {t('fields.month-of-year.error.' + error['rrule.monthOfYear'])}
          </span>
        )}
      </div>
      <MonthlyRepetitionTypeForm />
    </div>
  )
}
