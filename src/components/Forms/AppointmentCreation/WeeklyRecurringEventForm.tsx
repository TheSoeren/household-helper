import { weekdays } from '@/data'
import useValidation from '@/hooks/useValidation'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'

const validation = {
  interval: {
    required: true,
  },
  byDayOfWeek: {
    required: true,
  },
}

export default function WeeklyRecurringEventForm() {
  const { register, unregister, control } = useFormContext()
  const { t } = useTranslation('appointment-creation')
  const { error } = useValidation([
    'ruleOptions.interval',
    'ruleOptions.byDayOfWeek',
  ])

  useEffect(() => {
    register('ruleOptions.byDayOfWeek', validation.byDayOfWeek)

    return () => {
      unregister('ruleOptions.interval', { keepDefaultValue: true })
      unregister('ruleOptions.byDayOfWeek', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div>
        <div className="flex gap-4">
          <span className="my-auto text-slate-600">{t('every')}</span>
          <input
            type="number"
            min={1}
            className="py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            placeholder={t('fields.interval.placeholder')}
            {...register('ruleOptions.interval', validation.interval)}
          />
          <span className="my-auto text-slate-600">{t('week')}</span>
        </div>
        {error['ruleOptions.interval'] && (
          <span className="text-red-500">
            {t('fields.interval.error.' + error['ruleOptions.interval'])}
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
              name="ruleOptions.byDayOfWeek"
            />
          </div>
        </div>
        {error['ruleOptions.byDayOfWeek'] && (
          <span className="text-red-500">
            {t('fields.day-of-week.error.' + error['ruleOptions.byDayOfWeek'])}
          </span>
        )}
      </div>
    </div>
  )
}
