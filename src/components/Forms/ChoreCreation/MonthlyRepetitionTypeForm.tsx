import { monthlyRepetitionType, weekdays, weekOfMonth } from '@/data'
import { Controller, useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'
import EMonthlyRepetitionType from '@/enums/MonthlyRepetitionType'
import { useTranslation } from 'next-i18next'
import Select from '../Select'
import { useEffect } from 'react'
import useValidation from '@/hooks/useValidation'

const validation = {
  dayOfMonth: {
    required: true,
  },
  weekOfMonth: {
    required: true,
  },
  dayOfWeek: {
    required: true,
  },
}

export default function MonthlyRepetitionTypeForm() {
  const { t } = useTranslation('chores-creation')
  const { watch, register, unregister, control } = useFormContext()
  const { error } = useValidation([
    'rrule.dayOfMonth',
    'rrule.weekOfMonth',
    'rrule.dayOfWeek',
  ])

  const repTypeValue = watch('monthlyRepetitionType')?.value
  const isDayRep = repTypeValue === EMonthlyRepetitionType.DAY
  const isRegRep = repTypeValue === EMonthlyRepetitionType.REGULARITY

  useEffect(() => {
    if (!isDayRep) {
      unregister('rrule.dayOfMonth', { keepDefaultValue: true })
    }
  }, [isDayRep, unregister])

  useEffect(() => {
    if (isRegRep) {
      register('rrule.weekOfMonth', validation.weekOfMonth)
      register('rrule.dayOfWeek', validation.dayOfWeek)
    } else {
      unregister('rrule.weekOfMonth', { keepDefaultValue: true })
      unregister('rrule.dayOfWeek', { keepDefaultValue: true })
    }
  }, [isRegRep, register, unregister])

  return (
    <>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.monthly-repetition-type.label')}
        </label>
        <Controller
          name="monthlyRepetitionType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              instanceId={field.name}
              placeholder={t('fields.monthly-repetition-type.placeholder')}
              options={monthlyRepetitionType}
              blurInputOnSelect
            />
          )}
        />
      </div>

      {isDayRep ? (
        <div>
          <div>
            <span className="my-auto text-slate-600">{t('each')}</span>
            <input
              type="number"
              min={1}
              max={31}
              className="py-3 mx-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
              placeholder={t('fields.day-of-month.placeholder')}
              {...register('rrule.dayOfMonth', validation.dayOfMonth)}
            />
          </div>
          {error['rrule.dayOfMonth'] && (
            <span className="text-red-500">
              {t('fields.day-of-month.error.' + error['rrule.dayOfMonth'])}
            </span>
          )}
        </div>
      ) : null}
      {isRegRep ? (
        <div className="flex gap-4">
          <span className="text-l text-slate-600">{t('on-the')}</span>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <Checkboxes
                options={weekOfMonth}
                control={control}
                name="rrule.weekOfMonth"
              />
            </div>
            {error['rrule.weekOfMonth'] && (
              <span className="text-red-500">
                {t('fields.week-of-month.error.' + error['rrule.weekOfMonth'])}
              </span>
            )}
            <div className="flex justify-between">
              <Checkboxes
                options={weekdays}
                control={control}
                name="rrule.dayOfWeek"
              />
            </div>
            {error['rrule.dayOfWeek'] && (
              <span className="text-red-500">
                {t('fields.day-of-week.error.' + error['rrule.dayOfWeek'])}
              </span>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
