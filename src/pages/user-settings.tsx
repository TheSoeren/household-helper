import useUserAccount from '@/hooks/useUserAccount'
import User from '@/models/User'
import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from '@/components/Forms/Select'
import locales from '@/data/locales'
import { setCookies } from 'cookies-next'
import { useRouter } from 'next/router'

export default function UserSettings() {
  const { t } = useTranslation('user-settings-page')
  const { user, updateUser } = useUserAccount()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<User>()

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  const onSubmit = async (data: User) => {
    updateUser(data)

    setCookies('NEXT_LOCALE', data.locale.value, { sameSite: 'lax' })
    router.push(router.pathname, undefined, { locale: data.locale.value })
  }

  return (
    <div className="px-4 md:px-10 xl:w-1/3">
      <div className="text-center flex pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{t('title')}</h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-6">
          <div className="relative w-full mb-3">
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
              {t('fields.display-name.label')}
            </label>
            <input
              type="text"
              className="border-0 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder={t('fields.display-name.placeholder')}
              {...register('displayName', { required: true })}
            />
            <span className="text-red-500">
              {errors.displayName && t('fields.display-name.error.required')}
            </span>
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
              {t('fields.display-name.label')}
            </label>
            <Controller
              name="locale"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  instanceId={field.name}
                  placeholder={'Sprache'}
                  options={locales}
                  blurInputOnSelect
                />
              )}
            />
          </div>
        </div>
        <button
          className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
          type="submit"
        >
          {t('save')}
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    if (!locale) return { props: {} }

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'dashboard-layout',
          'user-settings-page',
        ])),
      },
    }
  },
})
