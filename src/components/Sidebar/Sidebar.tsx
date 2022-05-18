import { Navigation } from './Navigation'
import { useState } from 'react'
import sidebarData from './sidebar-data'
import UserDropdown from '../Dropdowns/UserDropdown'
import Brand from './Brand'
import CollapseHeader from './CollapseHeader'
import Toggler from './Toggler'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState('hidden')

  return (
    <>
      <nav className="relative z-[1500] flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-row-reverse flex-wrap items-center justify-between w-full mx-auto md:justify-start md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          <Toggler onClick={setCollapseShow} />
          <Brand />

          <div
            className={
              'shadow absolute top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none ' +
              collapseShow
            }
          >
            <CollapseHeader onClick={setCollapseShow} />
            {sidebarData.map((data) => (
              <Navigation {...data} key={data.category} />
            ))}
          </div>
          <UserDropdown />
        </div>
      </nav>
    </>
  )
}
