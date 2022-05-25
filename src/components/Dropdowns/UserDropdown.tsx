import { useState, createRef, MouseEventHandler } from 'react'
import { createPopper } from '@popperjs/core'
import Link from 'next/link'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import useSWR from 'swr'
import API_KEY from '@/utils/apiKey'
import { userFetcher } from '@/utils/httpRequests'

export default function UserDropdown() {
  const { t } = useTranslation('dashboard-layout')
  const { user: sbUser } = useUser()
  const { data: user } = useSWR(`${API_KEY.user}?id=${sbUser?.id}`, userFetcher)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = createRef<HTMLAnchorElement>()
  const popoverRef = createRef<HTMLDivElement>()

  const open = () => {
    if (!buttonRef.current || !popoverRef.current) return

    createPopper(buttonRef.current, popoverRef.current, {
      placement: 'top-start',
    })
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const handleSignOut: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    supabaseClient.auth.signOut()
    router.push('/authenticate')
  }

  return (
    <div onMouseLeave={close}>
      {user ? (
        <a
          href="#"
          className={
            'flex items-center text-slate-500 hover:bg-slate-100 rounded-full cursor-pointer' +
            (isOpen ? 'bg-slate-100' : '')
          }
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault()
            isOpen ? close() : open()
          }}
        >
          <div className="inline-flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-slate-500">
            <i className="fa-regular fa-user" />
          </div>
          <span className="hidden ml-2 text-sm uppercase md:block">
            {user.displayName}
          </span>
        </a>
      ) : null}
      <div
        ref={popoverRef}
        className={
          (isOpen ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <Link href="/user-settings">
          <a className="block w-full px-4 py-2 text-sm font-semibold bg-transparent bold whitespace-nowrap text-slate-700 hover:text-slate-500">
            <i className="mr-2 fa-solid fa-user"></i>
            {t('user-dropdown.settings')}
          </a>
        </Link>
        <a
          className="block w-full px-4 py-2 text-sm font-semibold text-red-700 bg-transparent cursor-pointer whitespace-nowrap hover:text-red-400"
          onClick={handleSignOut}
        >
          <i className="mr-2 fa-solid fa-sign-out-alt"></i>
          {t('user-dropdown.signout')}
        </a>
      </div>
    </div>
  )
}
