import useValidation from '@/hooks/useValidation'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const validation = {
  customFrequency: {
    required: true,
  },
}

export default function DailyRecurringEventForm() {
  const { register, unregister } = useFormContext()
  const { t } = useTranslation('chores-creation')
  const { error } = useValidation(['rrule.customFrequency'])

  useEffect(() => {
    return () => {
      unregister('rrule.customFrequency', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <>
      <div className="flex gap-4 mt-4 xl:w-2/3">
        <span className="my-auto text-slate-600">{t('every')}</span>
        <input
          type="number"
          min={1}
          className="py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          placeholder={t('fields.custom-frequency.placeholder')}
          {...register('rrule.customFrequency', validation.customFrequency)}
        />
        <span className="my-auto text-slate-600">{t('day')}</span>
      </div>
      {error['rrule.customFrequency'] && (
        <span className="text-red-500">
          {t('fields.custom-frequency.error.' + error['rrule.customFrequency'])}
        </span>
      )}
    </>
  )
}
