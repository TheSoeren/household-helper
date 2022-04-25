import { monthlyRepetitionType, weekdays, weeksOfMonth } from '@/data'
import { Controller, useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'
import EMonthlyRepetitionType from '@/enums/MonthlyRepetitionType'
import { useTranslation } from 'next-i18next'
import Select from '../Select'
import { useEffect } from 'react'
import useValidation from '@/hooks/useValidation'
import Radiobuttons from '../Radiobuttons'

const validation = {
  byDayOfMonth: {
    required: true,
  },
  byWeekOfMonth: {
    required: true,
  },
  byDayOfWeek: {
    required: true,
  },
}

export default function MonthlyRepetitionTypeForm() {
  const { t } = useTranslation('chores-creation')
  const { watch, register, unregister, control } = useFormContext()
  const { error } = useValidation([
    'ruleOptions.byDayOfMonth',
    'ruleConfig.byWeekOfMonth',
    'ruleOptions.byDayOfWeek',
  ])

  const repTypeValue = watch('ruleConfig.monthlyRepetitionType')?.value
  const isDayRep = repTypeValue === EMonthlyRepetitionType.DAY
  const isRegRep = repTypeValue === EMonthlyRepetitionType.REGULARITY

  useEffect(() => {
    if (!isDayRep) {
      unregister('ruleOptions.byDayOfMonth', { keepDefaultValue: true })
    }

    return () => {
      unregister('ruleOptions.byDayOfMonth', { keepDefaultValue: true })
    }
  }, [isDayRep, unregister])

  useEffect(() => {
    if (isRegRep) {
      register('ruleConfig.byWeekOfMonth', validation.byWeekOfMonth)
      register('ruleOptions.byDayOfWeek', validation.byDayOfWeek)
    } else {
      unregister('ruleConfig.byWeekOfMonth', { keepDefaultValue: true })
      unregister('ruleOptions.byDayOfWeek', { keepDefaultValue: true })
    }

    return () => {
      unregister('ruleConfig.byWeekOfMonth', { keepDefaultValue: true })
      unregister('ruleOptions.byDayOfWeek', { keepDefaultValue: true })
    }
  }, [isRegRep, register, unregister])

  return (
    <>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.monthly-repetition-type.label')}
        </label>
        <Controller
          name="ruleConfig.monthlyRepetitionType"
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
              {...register('ruleOptions.byDayOfMonth', validation.byDayOfMonth)}
            />
          </div>
          {error['ruleOptions.byDayOfMonth'] && (
            <span className="text-red-500">
              {t(
                'fields.day-of-month.error.' + error['ruleOptions.byDayOfMonth']
              )}
            </span>
          )}
        </div>
      ) : null}
      {isRegRep ? (
        <div className="flex gap-4">
          <span className="text-l text-slate-600">{t('on-the')}</span>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <Radiobuttons
                options={weeksOfMonth}
                name="ruleConfig.byWeekOfMonth"
                validation={{
                  required: true,
                }}
              />
            </div>
            {error['ruleConfig.byWeekOfMonth'] && (
              <span className="text-red-500">
                {t(
                  'fields.week-of-month.error.' +
                    error['ruleConfig.byWeekOfMonth']
                )}
              </span>
            )}
            <div className="flex justify-between">
              <Checkboxes
                options={weekdays}
                control={control}
                name="ruleOptions.byDayOfWeek"
              />
            </div>
            {error['ruleOptions.byDayOfWeek'] && (
              <span className="text-red-500">
                {t(
                  'fields.day-of-week.error.' + error['ruleOptions.byDayOfWeek']
                )}
              </span>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
