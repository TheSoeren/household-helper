import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import RepetitionPattern from '@/enums/RepetitionPattern'
import useValidation from '@/hooks/useValidation'

const validation = {
  duration: {
    required: true,
    min: 15,
    pattern: /[0-9]*[05]/,
  },
  startDate: {
    valueAsDate: true,
    required: true,
  },
}

export default function DateRangeForm() {
  const { t } = useTranslation('chores-creation')
  const { watch, control, register, unregister } = useFormContext()
  const { error } = useValidation(['timeframe.startDate', 'timeframe.duration'])

  const oneTimeEvent =
    watch('rrule.frequency')?.value === RepetitionPattern.NONE
  const allDayEvent = watch('timeframe.allDay')

  useEffect(() => {
    register('timeframe.startDate', { required: true, valueAsDate: true })
    if (oneTimeEvent) register('timeframe.endDate')

    return () => {
      unregister('timeframe.startDate', { keepDefaultValue: true })
      if (oneTimeEvent) unregister('timeframe.endDate')
    }
  }, [oneTimeEvent, register, unregister])

  useEffect(() => {
    if (allDayEvent) {
      return () => {
        unregister('timeframe.duration')
      }
    }
  }, [allDayEvent, register, unregister])

  return (
    <div className="flex flex-col gap-4 mt-4 xl:w-2/3">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.duration.label')}
        </label>
        <div className="flex gap-4 h-11">
          <div className="w-full my-auto form-check">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-600"
              {...register('timeframe.allDay')}
            />
            <label className="inline-block text-gray-600 form-check-label">
              {t('all-day')}
            </label>
          </div>
          {!allDayEvent ? (
            <div className="w-full">
              <input
                type="number"
                className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                placeholder={t('fields.duration.placeholder')}
                {...register('timeframe.duration', validation.duration)}
              />
              {error['timeframe.duration'] && (
                <span className="text-red-500">
                  {t('fields.duration.error.' + error['timeframe.duration'])}
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <label className="block text-xs font-bold uppercase text-slate-600">
            {t('fields.start-date.label')}
          </label>
          <Controller
            control={control}
            name="timeframe.startDate"
            render={({ field }) => (
              <DatePicker
                className="w-full border-0 shadow"
                placeholderText={t('fields.start-date.placeholder')}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                dateFormat="dd. MMM yyyy"
                minDate={new Date()}
              />
            )}
          />
          {error['timeframe.startDate'] && (
            <span className="text-red-500">
              {t('fields.start-date.error.' + error['timeframe.startDate'])}
            </span>
          )}
        </div>

        {!oneTimeEvent ? (
          <div className="w-full">
            <label className="block text-xs font-bold uppercase text-slate-600">
              {t('fields.end-date.label')}
            </label>
            <Controller
              control={control}
              name="timeframe.endDate"
              render={({ field }) => (
                <DatePicker
                  className="w-full border-0 shadow"
                  placeholderText={t('fields.end-date.placeholder')}
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  dateFormat="dd. MMM yyyy"
                  minDate={new Date()}
                />
              )}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
