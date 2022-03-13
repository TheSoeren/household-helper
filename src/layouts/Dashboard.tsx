import React, { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'

export type DashboardProps = {
  children: ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="w-full px-4 mx-auto md:px-10">{children}</div>
      </div>
    </>
  )
}
