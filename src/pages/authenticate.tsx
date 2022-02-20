import { FormEvent, useState } from 'react'
import AuthLayout from '@/layouts/Auth'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { postRequest } from '@/utils/httpRequests'

export default function Login() {
  const { t } = useTranslation('authenticate-page')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleLogIn = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    supabaseClient.auth
      .signIn({ email, password })
      .then(({ user, error }: any) => {
        setLoading(false)
        resetForm()

        if (error || !user) {
          return toast.error(t('signin-error'))
        }

        toast.success(t('login-success'))
        router.push('/')
      })
  }

  const handleSignUp = async () => {
    setLoading(true)

    supabaseClient.auth
      .signUp({ email, password })
      .then(({ user, error }: any) => {
        if (error || !user) {
          throw new Error()
        }

        const dbUser = { id: user.id, displayName: user.email }
        return postRequest('/api/user', JSON.stringify(dbUser), false)
      })
      .then(() => {
        resetForm()
        toast.success(t('signup-success'))
      })
      .catch(() => {
        toast.error(t('signup-error'))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full py-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="flex-auto px-4 lg:px-10 pt-0">
                <form onSubmit={handleLogIn}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                      {t('fields.email.label')}
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder={t('fields.email.placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                      {t('fields.password.label')}
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder={t('fields.password.placeholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex text-center mt-6">
                    <button
                      className="bg-slate-200 border-slate-800 border-2 text-slate-800 active:bg-slate-100 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 cursor-pointer"
                      type="button"
                      onClick={handleSignUp}
                      disabled={loading}
                    >
                      {t('signup')}
                    </button>
                    <button
                      className="bg-slate-800  text-white active:bg-slate-600 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 cursor-pointer"
                      type="submit"
                      disabled={loading}
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

Login.layout = AuthLayout

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let translations = {}

  if (locale) {
    translations = await serverSideTranslations(locale, ['authenticate-page'])
  }

  return {
    props: {
      ...translations,
    },
  }
}
