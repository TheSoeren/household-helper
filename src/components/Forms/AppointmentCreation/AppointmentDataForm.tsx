import { colors, icons, repetitionPatterns } from '@/data'
import useValidation from '@/hooks/useValidation'
import { useTranslation } from 'next-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import IconSelect from '../IconSelect'
import Select from '../Select'
import { useEffect } from 'react'
import { getRequest } from '@/utils/httpRequests'
import useSWR from 'swr'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import Option from '@/models/Option'
import API_KEY from '@/utils/apiKey'
import { DBUser } from '@/utils/dataConverter'

const fetcher = (url: string) =>
  getRequest<DBUser[]>(url).then((res) =>
    res.map((u: DBUser) => ({ value: u.id, label: u.displayName }))
  )

export default function AppointmentDataForm() {
  const { control, register, unregister, setValue } = useFormContext()
  const { t } = useTranslation('appointment-creation')
  const { error } = useValidation(['title'])
  const { data: users } = useSWR<Option[]>(API_KEY.user, fetcher)
  const { user: sbUser } = useUser()

  useEffect(() => {
    if (users?.length && sbUser) {
      setValue(
        'user',
        users.find((u) => u.value === sbUser.id)
      )
    }
  }, [sbUser, setValue, users])

  useEffect(() => {
    register('user', { required: true })

    return () => {
      unregister('user', { keepDefaultValue: true })
    }
  }, [register, unregister])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-full">
          <label className="block text-xs font-bold uppercase text-slate-600">
            {t('fields.title.label')}
          </label>
          <input
            type="text"
            className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            placeholder={t('fields.title.placeholder')}
            {...register('title', { required: true })}
          />
          {error['title'] && (
            <span className="text-red-500">
              {t('fields.title.error.' + error['title'])}
            </span>
          )}
        </div>
        <div className="w-full">
          <label className="block text-xs font-bold uppercase text-slate-600">
            {t('fields.user.label')}
          </label>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId={field.name}
                placeholder={t('fields.user.placeholder')}
                options={users}
                blurInputOnSelect
              />
            )}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.description.label')}
        </label>
        <textarea
          rows={3}
          className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow resize-y placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          placeholder={t('fields.description.placeholder')}
          {...register('description')}
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
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

      <div>
        <label className="block text-xs font-bold uppercase text-slate-600">
          {t('fields.frequency.label')}
        </label>
        <Controller
          name="ruleOptions.frequency"
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
