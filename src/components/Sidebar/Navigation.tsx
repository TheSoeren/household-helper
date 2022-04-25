import { NavItem } from './NavItem'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { SidebarData } from './sidebar-data'

export function Navigation(data: SidebarData) {
  const { t } = useTranslation('dashboard-layout')

  return (
    <Fragment key={data.category}>
      <hr className="my-4 md:min-w-full" />

      <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        {t(data.category)}
      </h6>

      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        {data.elements.map((element) => (
          <NavItem {...element} key={element.label} />
        ))}
      </ul>
    </Fragment>
  )
}
