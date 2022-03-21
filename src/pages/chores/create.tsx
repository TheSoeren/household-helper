import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Chore from '@/models/Chore'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import dayjs from 'dayjs'
import { DateAdapter, RRule, VEvent } from '@/setups/rschedule'
import Icon from '@/models/Icon'
import { postRequest } from '@/utils/httpRequests'
import IconSelect from '@/components/Forms/IconSelect'
import { icons, colors } from '@/data'

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

    // await postRequest('/api/chore', chore.toString())
  }

  return (
    <div className="px-3 xl:w-1/3">
      <div className="text-center flex pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{t('title')}</h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-6">
          <div className="relative w-full mb-3">
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
              {t('fields.title.label')}
            </label>
            <input
              type="text"
              className="border-0 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder={t('fields.title.placeholder')}
              {...register('title', { required: true })}
            />
            <span className="text-red-500">
              {errors.title && t('fields.title.error.required')}
            </span>
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
              {t('fields.description.label')}
            </label>
            <textarea
              className="border-0 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
              placeholder={t('fields.description.placeholder')}
              {...register('description')}
            />
          </div>
        </div>
        <div className="flex flex-col py-6">
          <div className="relative w-full mb-3">
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
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
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
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
        <button
          className="bg-slate-800 w-1/3 text-white active:bg-slate-600 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
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
