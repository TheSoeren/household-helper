import React, { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'

export type DashboardProps = {
  children: ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <div className="px-4 md:px-10 mx-auto w-full">{children}</div>
      </div>
    </>
  )
}
