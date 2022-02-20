import useUserAccount from '@/hooks/useUserAccount'
import { putRequest } from '@/utils/httpRequests'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FormEvent, useEffect, useState } from 'react'

export default function UserSettings() {
  const { t } = useTranslation('user-settings-page')
  const { user, mutateUser } = useUserAccount()

  const [displayName, setDisplayName] = useState(user?.displayName ?? '')

  useEffect(() => {
    setDisplayName(user?.displayName ?? '')
  }, [user?.displayName])

  const getUpdatedUser = () => {
    return Object.assign({}, user, {
      displayName,
    })
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    // https://swr.vercel.app/docs/mutation#mutation-and-post-request
    mutateUser(user, false)

    await putRequest('/api/user', JSON.stringify(getUpdatedUser()))
    mutateUser()
  }

  return (
    <div className="px-3 w-1/3">
      <div className="text-center flex pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{t('title')}</h6>
      </div>
      <form onSubmit={handleSave}>
        <div className="flex flex-col py-6">
          <div className="relative w-full mb-3">
            <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
              {t('fields.display-name.label')}
            </label>
            <input
              type="text"
              className="border-0 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder={t('fields.display-name.placeholder')}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-slate-800 w-1/3 text-white active:bg-slate-600 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
          type="submit"
        >
          {t('save')}
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps = withAuthRequired({
  redirectTo: '/authenticate',
  getServerSideProps: async ({ locale }) => {
    let translations = {}

    if (locale) {
      translations = await serverSideTranslations(locale, [
        'dashboard-layout',
        'user-settings-page',
      ])
    }

    return {
      props: {
        ...translations,
      },
    }
  },
})
