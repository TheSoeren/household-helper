import { weekdays } from '@/data'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'

export default function WeeklyRecurringEventForm() {
  const { register, unregister, control } = useFormContext()
  const { t } = useTranslation('chores-creation')

  useEffect(() => {
    return () => {
      unregister('rrule.customFrequency', { keepDefaultValue: true })
      unregister('rrule.dayOfWeek', { keepDefaultValue: true })
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
        <span className="my-auto text-l text-slate-600">{t('week')}</span>
      </div>
      <div className="flex gap-4 w-full">
        <span className="my-auto text-l text-slate-600">{t('on')}</span>
        <div className="flex justify-between w-full">
          <Checkboxes
            options={weekdays}
            control={control}
            name="rrule.dayOfWeek"
          />
        </div>
      </div>
    </div>
  )
}
