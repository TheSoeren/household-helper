import { useState, createRef, RefObject, MouseEventHandler } from 'react'
import { createPopper } from '@popperjs/core'
import Link from 'next/link'
import useUserAccount from '@/hooks/useUserAccount'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export default function UserDropdown() {
  const { t } = useTranslation('sidebar')
  const { user } = useUserAccount()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = createRef<HTMLAnchorElement>()
  const popoverRef = createRef<HTMLDivElement>()

  const open = () => {
    if (!buttonRef.current || !popoverRef.current) return

    createPopper(buttonRef.current, popoverRef.current, {
      placement: 'bottom-start',
    })
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const handleSignOut: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    supabaseClient.auth.signOut()
    router.push('/auth/authenticate')
  }

  return (
    <div onMouseLeave={close}>
      <a
        className={
          'text-slate-500 block hover:bg-slate-100 rounded-full cursor-pointer' +
          (isOpen ? 'bg-slate-100' : '')
        }
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault()
          isOpen ? close() : open()
        }}
      >
        <div className="w-8 h-8 text-sm text-white bg-slate-500 inline-flex items-center justify-center rounded-full">
          <i className="far fa-user" />
        </div>
        <span className="text-sm ml-2">{user?.displayName}</span>
      </a>
      <div
        ref={popoverRef}
        className={
          (isOpen ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <Link href="/profile">
          <a className="text-sm bold py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-slate-700 hover:text-slate-500">
            <i className="fas fa-user mr-2"></i>
            {t('user-dropdown.profile')}
          </a>
        </Link>
        <a
          className="text-sm py-2 px-4 font-semibold block w-full whitespace-nowrap bg-transparent text-red-700 hover:text-red-400 cursor-pointer"
          onClick={handleSignOut}
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          {t('user-dropdown.signout')}
        </a>
      </div>
    </div>
  )
}
