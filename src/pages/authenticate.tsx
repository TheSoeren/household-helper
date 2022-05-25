import { useEffect } from 'react'
import AuthLayout from '@/layouts/Auth'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { postRequest } from '@/utils/httpRequests'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { useForm } from 'react-hook-form'
import AuthUserObject from '@/models/AuthUserObject'
import API_KEY from '@/utils/apiKey'

export default function Authenticate() {
  const { t } = useTranslation('authenticate-page')
  const router = useRouter()
  const { user } = useUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthUserObject>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleLogIn = (data: AuthUserObject) => {
    supabaseClient.auth.signIn(data).then(({ user, error }: any) => {
      reset()

      if (error || !user) {
        return toast.error(t('signin-error'))
      }

      toast.success(t('signin-success'))
      router.push('/')
    })
  }

  const handleSignUp = (data: AuthUserObject) => {
    supabaseClient.auth
      .signUp(data)
      .then(({ user, error }: any) => {
        if (error || !user) {
          throw new Error(error.message)
        }

        const dbUser = { id: user.id, displayName: user.email }
        return postRequest(API_KEY.user, JSON.stringify(dbUser), false)
      })
      .then(() => {
        reset()
        toast.success(t('signup-success'))
      })
      .catch((e: Error) => {
        toast.error(e.message)
      })
  }

  return (
    <div className="container h-full px-4 mx-auto">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-full px-4 lg:w-6/12">
          <div className="relative flex flex-col w-full min-w-0 py-6 break-words border-0 rounded-lg shadow-lg bg-slate-200">
            <div className="flex-auto px-4 pt-0 lg:px-10">
              <form onSubmit={handleSubmit(handleLogIn)}>
                <div className="relative w-full mb-3">
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    {t('fields.email.label')}
                  </label>
                  <input
                    autoFocus
                    type="email"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                    placeholder={t('fields.email.placeholder')}
                    {...register('email', { required: true })}
                  />
                  <span className="text-red-500">
                    {errors.email && t('fields.email.error.required')}
                  </span>
                </div>

                <div className="relative w-full mb-3">
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    {t('fields.password.label')}
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                    placeholder={t('fields.password.placeholder')}
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {t('fields.password.error.' + errors.password.type)}
                    </span>
                  )}
                </div>

                <div className="flex mt-6 text-center">
                  <button
                    className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold transition-all duration-150 ease-linear border-2 rounded shadow outline-none cursor-pointer bg-slate-200 border-slate-800 text-slate-800 active:bg-slate-100 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={handleSubmit(handleSignUp)}
                  >
                    {t('signup')}
                  </button>
                  <button
                    className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none cursor-pointer bg-slate-800 active:bg-slate-600 hover:shadow-lg focus:outline-none"
                    type="submit"
                  >
                    {t('signin')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Authenticate.layout = AuthLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = locale
    ? await serverSideTranslations(locale, ['authenticate-page'])
    : {}

  return {
    props: translations,
  }
}
