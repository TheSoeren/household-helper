import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Chore from '@/models/Chore'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import dayjs from 'dayjs'
import { DateAdapter, RRule, VEvent } from '@/setups/rschedule'
import Icon from '@/models/Icon'
import { postRequest } from '@/utils/httpRequests'
import IconSelect from '@/components/Forms/IconSelect'
import {
  icons,
  colors,
  repetitionPatterns,
  customRepetitionPatterns,
} from '@/data'
import Select from '@/components/Forms/Select'

export default function Create() {
  const { t } = useTranslation('chores-creation')
  const { user } = useUser()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: '',
      description: '',
      icon: {
        faclass: null,
        color: null,
      },
      rrule: {
        frequency: '',
        customFrequency: '',
      },
    },
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data)
    if (!user) return

    const start = dayjs().subtract(1, 'month')
    const rule = new RRule({
      frequency: 'WEEKLY',
      byDayOfWeek: [DateAdapter.WEEKDAYS[dayjs().day()]],
      byHourOfDay: [dayjs().hour() as DateAdapter.Hour],
      start,
    })

    const icon = new Icon(data.icon.faclass.value, data.icon.color.value)
    const vevent = new VEvent({
      start,
      rrules: [rule],
      duration: 2 * 60 * 60 * 1000,
    })
    const chore = new Chore(user.id, data.title, data.description, icon, vevent)

    // https://regebro.wordpress.com/2009/01/28/ui-help-needed-recurring-events-form-usability/
    // await postRequest('/api/chore', chore.toString())
  }

  return (
    <div className="px-3 xl:w-1/3">
      <div className="flex pt-6 text-center">
        <h6 className="text-xl font-bold text-slate-700">{t('title')}</h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col pt-6">
          <div className="relative w-full mb-3">
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
              {errors.title && t('fields.title.error.required')}
            </span>
          </div>
          <div className="relative w-full mb-3">
            <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
              {t('fields.description.label')}
            </label>
            <textarea
              className="w-full py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow resize-none placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
              placeholder={t('fields.description.placeholder')}
              {...register('description')}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative w-full mb-3">
            <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
              {t('fields.icon-faclass.label')}
            </label>
            <IconSelect
              name="icon.faclass"
              control={control}
              placeholder={t('fields.icon-faclass.placeholder')}
              options={icons}
            />
          </div>
          <div className="relative w-full mb-3">
            <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
              {t('fields.icon-color.label')}
            </label>
            <IconSelect
              name="icon.color"
              control={control}
              placeholder={t('fields.icon-color.placeholder')}
              options={colors}
            />
          </div>
        </div>
        <div className="relative w-full mb-3">
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
                isClearable
              />
            )}
          />
        </div>
        <div className="relative flex w-full mb-3">
          <span className="my-auto text-l text-slate-700">{t('every')}</span>
          <input
            type="number"
            min={1}
            className="py-3 mx-2 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            placeholder={t('fields.custom-frequency.placeholder')}
            {...register('title', { required: true })}
          />
          <Controller
            name="rrule.customFrequency"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId={field.name}
                placeholder={t('fields.custom-frequency-pattern.placeholder')}
                options={customRepetitionPatterns}
                blurInputOnSelect
                isClearable
              />
            )}
          />
        </div>
        <div className="relative flex justify-between w-full mb-3">
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              Mo
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              Tu
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              We
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              Th
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              Fr
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              Sa
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
          <div className="form-check">
            <label className="inline-block text-gray-800 form-check-label">
              So
            </label>
            <input
              type="checkbox"
              className="float-left w-4 h-4 mt-1 mr-2 text-transparent align-top transition duration-200 rounded-md cursor-pointer checked:text-slate-800"
            />
          </div>
        </div>
        <button
          className="w-1/3 px-6 py-3 mb-1 mr-1 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow cursor-pointer bg-slate-800 active:bg-slate-600 hover:shadow-lg"
          type="submit"
        >
          {t('create')}
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    const translations = locale
      ? await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'chores-creation',
        ])
      : {}

    return {
      props: {
        ...translations,
      },
    }
  },
})
