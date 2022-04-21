import { months } from '@/data'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'
import MonthlyRepetitionTypeForm from './MonthlyRepetitionTypeForm'

export default function YearlyRecurringEventForm() {
  const { register, unregister, control } = useFormContext()
  const { t } = useTranslation('chores-creation')

  useEffect(() => {
    return () => {
      unregister('rrule.customFrequency', { keepDefaultValue: true })
      unregister('rrule.monthOfYear', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <div className="flex flex-col gap-4 xl:w-2/3 mt-4">
      <div className="flex gap-4 w-full">
        <span className="my-auto text-l text-slate-600">{t('every')}</span>
        <input
          type="number"
          min={1}
          className="py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          placeholder={t('fields.custom-frequency.placeholder')}
          {...register('rrule.customFrequency')}
        />
        <span className="my-auto text-l text-slate-600">{t('year')}</span>
      </div>
      <div>
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
          {t('on')}
        </label>
        <div className="flex flex-wrap justify-between w-full">
          <Checkboxes
            options={months}
            control={control}
            name="rrule.monthOfYear"
            className="w-1/6"
          />
        </div>
      </div>
      <MonthlyRepetitionTypeForm />
    </div>
  )
}
