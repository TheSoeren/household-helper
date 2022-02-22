import Chore from '@/models/Chore'
import ChoreCard from '@/components/Cards/ChoreCard'
import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'

type ChoreListProps = {
  chores: Chore[]
  title?: string
  empty?: string | ReactNode
}

export default function ChoreList({ chores, title, empty }: ChoreListProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="text-center flex px-3 pt-6">
        <h6 className="text-slate-700 text-xl font-bold">{title}</h6>
      </div>
      <div className="flex flex-wrap py-6">
        {!chores.length ? (
          <div className="mx-2 text-2xl md:text-4xl text-slate-300">
            {empty ?? t('no-appointments')}
          </div>
        ) : null}
        {chores.map((chore) => (
          <div className="w-full xl:w-3/12 mb-3 md:mb-2 px-3" key={chore.id}>
            <ChoreCard {...chore} />
          </div>
        ))}
      </div>
    </>
  )
}
