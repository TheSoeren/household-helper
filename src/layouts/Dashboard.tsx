import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'

export type DashboardProps = {
  children: ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="w-full mx-auto">{children}</div>
      </div>
    </>
  )
}
