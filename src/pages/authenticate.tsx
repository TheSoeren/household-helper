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
  }, [user])

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
          throw new Error()
        }

        const dbUser = { id: user.id, displayName: user.email }
        return postRequest('/api/user', JSON.stringify(dbUser), false)
      })
      .then(() => {
        reset()
        toast.success(t('signup-success'))
      })
      .catch(() => {
        toast.error(t('signup-error'))
      })
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full py-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="flex-auto px-4 lg:px-10 pt-0">
                <form onSubmit={handleSubmit(handleLogIn)}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                      {t('fields.email.label')}
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder={t('fields.email.placeholder')}
                      {...register('email', { required: true })}
                    />
                    <span className="text-red-500">
                      {errors.email && t('fields.email.error.required')}
                    </span>
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                      {t('fields.password.label')}
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder={t('fields.password.placeholder')}
                      {...register('password', { required: true })}
                    />
                    <span className="text-red-500">
                      {errors.password && t('fields.password.error.required')}
                    </span>
                  </div>

                  <div className="flex text-center mt-6">
                    <button
                      className="bg-slate-200 border-slate-800 border-2 text-slate-800 active:bg-slate-100 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 cursor-pointer"
                      type="button"
                      onClick={handleSubmit(handleSignUp)}
                    >
                      {t('signup')}
                    </button>
                    <button
                      className="bg-slate-800  text-white active:bg-slate-600 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 cursor-pointer"
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
    </>
  )
}

Authenticate.layout = AuthLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = locale
    ? await serverSideTranslations(locale, ['authenticate-page'])
    : {}

  return {
    props: {
      ...translations,
    },
  }
}
