import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export default function DailyRecurringEventForm() {
  const { register, unregister } = useFormContext()
  const { t } = useTranslation('chores-creation')

  useEffect(() => {
    return () => {
      unregister('rrule.customFrequency', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <div className="flex gap-4 w-full xl:w-2/3 mt-4">
      <span className="my-auto text-l text-slate-600">{t('every')}</span>
      <input
        type="number"
        min={1}
        className="py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
        placeholder={t('fields.custom-frequency.placeholder')}
        {...register('rrule.customFrequency')}
      />
      <span className="my-auto text-l text-slate-600">{t('day')}</span>
    </div>
  )
}
