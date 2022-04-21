import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import RepetitionPattern from '@/enums/RepetitionPattern'

export default function DateRangeForm() {
  const { t } = useTranslation('chores-creation')
  const { watch, control, register, unregister } = useFormContext()

  const oneTimeEvent =
    watch('rrule.frequency')?.value === RepetitionPattern.NONE

  useEffect(() => {
    if (oneTimeEvent) {
      register('rrule.endDate')
      return () => {
        unregister('rrule.endDate')
      }
    }
  }, [oneTimeEvent, register, unregister])

  return (
    <div className="flex gap-4 w-full md:w-2/3 mt-4">
      <div className="w-full">
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
          {t('fields.start-date.label')}
        </label>
        <Controller
          control={control}
          name="rrule.startDate"
          render={({ field }) => (
            <DatePicker
              className="w-full shadow border-0"
              placeholderText={t('fields.start-date.placeholder')}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat="dd. MMM yyyy"
            />
          )}
        />
      </div>

      {!oneTimeEvent ? (
        <div className="w-full">
          <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
            {t('fields.end-date.label')}
          </label>
          <Controller
            control={control}
            name="rrule.endDate"
            render={({ field }) => (
              <DatePicker
                className="w-full shadow border-0"
                placeholderText={t('fields.end-date.placeholder')}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                dateFormat="dd. MMM yyyy"
              />
            )}
          />
        </div>
      ) : null}
    </div>
  )
}
