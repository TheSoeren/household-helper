import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SidebarElement } from './sidebar-data'

const activeLink = 'text-sky-500 hover:text-sky-600'
const inactiveLink = 'text-slate-700 hover:text-slate-500'
const activeLinkIcon = 'opacity-75'
const inactiveLinkIcon = 'text-slate-300'

export function NavItem(data: SidebarElement) {
  const { t } = useTranslation('dashboard-layout')
  const router = useRouter()

  const isCurrentRoute = router.pathname.indexOf(data.route) !== -1

  return (
    <li className="items-center" key={data.label}>
      <Link href={data.route}>
        <a
          href="#"
          className={`text-xs uppercase py-3 font-bold block ${
            isCurrentRoute ? activeLink : inactiveLink
          }`}
        >
          <i
            className={`${data.icon} mr-2 text-sm ${
              isCurrentRoute ? activeLinkIcon : inactiveLinkIcon
            }`}
          ></i>
          {t(data.label)}
        </a>
      </Link>
    </li>
  )
}
