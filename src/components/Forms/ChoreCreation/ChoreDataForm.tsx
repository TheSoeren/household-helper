import { colors, icons, repetitionPatterns } from '@/data'
import { useTranslation } from 'next-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import IconSelect from '../IconSelect'
import Select from '../Select'

export default function ChoreDataForm() {
  const { control, register, getFieldState } = useFormContext()
  const { t } = useTranslation('chores-creation')

  return (
    <div className="flex flex-col gap-4 xl:w-2/3">
      <div className="w-full">
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
          {t('fields.title.label')}
        </label>
        <input
          type="text"
          className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          placeholder={t('fields.title.placeholder')}
          {...register('title', { required: true })}
        />
        <span className="text-red-500">
          {getFieldState('title').error && t('fields.title.error.required')}
        </span>
      </div>
      <div className="w-full">
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
          {t('fields.description.label')}
        </label>
        <textarea
          className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow resize-none placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          placeholder={t('fields.description.placeholder')}
          {...register('description')}
        />
      </div>
      <div className="w-full">
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
          {t('fields.icon-faclass.label')}
        </label>
        <div className="flex gap-4">
          <div className="w-3/4">
            <IconSelect
              name="icon.faclass"
              control={control}
              placeholder={t('fields.icon-faclass.placeholder')}
              options={icons}
              blurInputOnSelect
            />
          </div>
          <div className="w-1/4">
            <IconSelect
              name="icon.color"
              control={control}
              placeholder={t('fields.icon-color.placeholder')}
              options={colors}
              blurInputOnSelect
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
          {t('fields.frequency.label')}
        </label>
        <Controller
          name="rrule.frequency"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              instanceId={field.name}
              placeholder={t('fields.frequency.placeholder')}
              options={repetitionPatterns}
              blurInputOnSelect
            />
          )}
        />
      </div>
    </div>
  )
}
