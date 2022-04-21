import { weekdays } from '@/data'
import useValidation from '@/hooks/useValidation'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'

const validation = {
  customFrequency: {
    required: true,
  },
  dayOfWeek: {
    required: true,
  },
}

export default function WeeklyRecurringEventForm() {
  const { register, unregister, control } = useFormContext()
  const { t } = useTranslation('chores-creation')
  const { error } = useValidation(['rrule.customFrequency', 'rrule.dayOfWeek'])

  useEffect(() => {
    register('rrule.dayOfWeek', validation.dayOfWeek)

    return () => {
      unregister('rrule.customFrequency', { keepDefaultValue: true })
      unregister('rrule.dayOfWeek', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <div className="flex flex-col gap-4 mt-4 xl:w-2/3">
      <div>
        <div className="flex gap-4">
          <span className="my-auto text-slate-600">{t('every')}</span>
          <input
            type="number"
            min={1}
            className="py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            placeholder={t('fields.custom-frequency.placeholder')}
            {...register('rrule.customFrequency', validation.customFrequency)}
          />
          <span className="my-auto text-slate-600">{t('week')}</span>
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
        <div className="flex gap-4">
          <span className="my-auto text-slate-600">{t('on')}</span>
          <div className="flex justify-between w-full">
            <Checkboxes
              options={weekdays}
              control={control}
              name="rrule.dayOfWeek"
            />
          </div>
        </div>
        {error['rrule.dayOfWeek'] && (
          <span className="text-red-500">
            {t('fields.day-of-week.error.' + error['rrule.dayOfWeek'])}
          </span>
        )}
      </div>
    </div>
  )
}
