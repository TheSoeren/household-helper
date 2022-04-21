import { monthlyRepetitionType, weekdays, weekOfMonth } from '@/data'
import { Controller, useFormContext } from 'react-hook-form'
import Checkboxes from '../Checkboxes'
import EMonthlyRepetitionType from '@/enums/MonthlyRepetitionType'
import { useTranslation } from 'next-i18next'
import Select from '../Select'
import { useEffect } from 'react'

export default function MonthlyRepetitionTypeForm() {
  const { t } = useTranslation('chores-creation')
  const { watch, register, unregister, control } = useFormContext()

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
      register('rrule.weekOfMonth')
      register('rrule.dayOfWeek')
    } else {
      unregister('rrule.weekOfMonth', { keepDefaultValue: true })
      unregister('rrule.dayOfWeek', { keepDefaultValue: true })
    }
  }, [isRegRep, register, unregister])

  return (
    <>
      <div className="w-full">
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
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
        <div className="w-full">
          <span className="my-auto text-l text-slate-600">{t('each')}</span>
          <input
            type="number"
            min={1}
            max={31}
            className="py-3 mx-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            placeholder={t('fields.custom-frequency.placeholder')}
            {...register('rrule.dayOfMonth')}
          />
        </div>
      ) : null}
      {isRegRep ? (
        <div className="flex gap-4 w-full">
          <span className="text-l text-slate-600">{t('on-the')}</span>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between w-full">
              <Checkboxes
                options={weekOfMonth}
                control={control}
                name="rrule.weekOfMonth"
              />
            </div>
            <div className="flex justify-between w-full">
              <Checkboxes
                options={weekdays}
                control={control}
                name="rrule.dayOfWeek"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
