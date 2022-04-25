import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import Frequency from '@/enums/Frequency'
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
  const { error } = useValidation(['ruleOptions.start', 'ruleOptions.duration'])

  const oneTimeEvent = watch('ruleOptions.frequency')?.value === Frequency.NONE
  const allDayEvent = watch('ruleConfig.allDay')

  useEffect(() => {
    register('ruleOptions.start', { required: true, valueAsDate: true })
    if (!oneTimeEvent) register('ruleOptions.end')

    return () => {
      unregister('ruleOptions.start', { keepDefaultValue: true })
      unregister('ruleOptions.end')
    }
  }, [oneTimeEvent, register, unregister])

  useEffect(() => {
    if (allDayEvent) {
      register('ruleOptions.duration')
      unregister('ruleOptions.duration')
    } else {
      unregister('ruleOptions.allDayEnd', { keepDefaultValue: true })
    }
  }, [allDayEvent, register, unregister])

  const renderDurationField = () => {
    return allDayEvent ? (
      <div className="w-full">
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.all-day-end.label')}
        </label>
        <Controller
          control={control}
          name="ruleOptions.allDayEnd"
          render={({ field }) => (
            <DatePicker
              className="w-full border-0 shadow"
              placeholderText={t('fields.all-day-end.placeholder')}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat="dd. MMM yyyy"
              minDate={new Date()}
            />
          )}
        />
        {error['ruleOptions.allDayEnd'] && (
          <span className="text-red-500">
            {t('fields.all-day-end.error.' + error['ruleOptions.allDayEnd'])}
          </span>
        )}
      </div>
    ) : (
      <div className="w-full">
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.duration.label')}
        </label>
        <input
          type="number"
          className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          placeholder={t('fields.duration.placeholder')}
          {...register('ruleOptions.duration', validation.duration)}
        />
        {error['ruleOptions.duration'] && (
          <span className="text-red-500">
            {t('fields.duration.error.' + error['ruleOptions.duration'])}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mt-4 xl:w-2/3">
      <div>
        <div className="flex gap-4 h-11">
          <div className="w-full my-auto form-check">
            <div className="h-4" />
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-600"
              {...register('ruleConfig.allDay')}
            />
            <label className="inline-block text-gray-600 form-check-label">
              {t('all-day')}
            </label>
          </div>
          {renderDurationField()}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <label className="block text-xs font-bold uppercase text-slate-600">
            {t('fields.start-date.label')}
          </label>
          <Controller
            control={control}
            name="ruleOptions.start"
            render={({ field }) => (
              <DatePicker
                showTimeSelect
                className="w-full border-0 shadow"
                placeholderText={t('fields.start-date.placeholder')}
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                dateFormat="dd. MMM yyyy (HH:mm)"
                minDate={new Date()}
              />
            )}
          />
          {error['ruleOptions.start'] && (
            <span className="text-red-500">
              {t('fields.start-date.error.' + error['ruleOptions.start'])}
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
              name="ruleOptions.end"
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
