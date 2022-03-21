import Chore from '@/models/Chore'
import ChoreCard from '@/components/Cards/ChoreCard'
import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

type ChoreListProps = {
  chores: Chore[]
  title?: string
  emptyListContent?: string | ReactNode
  create?: boolean
}

export default function ChoreList({
  chores,
  title,
  emptyListContent,
  create,
}: ChoreListProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex items-center content-center px-3 pt-6 text-center">
        <h6 className="text-xl font-bold text-slate-700">{title}</h6>
        {create ? (
          <Link href="/chores/create">
            <a
              href="#pablo"
              className="inline-flex items-center justify-center px-3 mx-6 mr-2 transition-colors duration-150 rounded shadow-lg h-7 bg-slate-50 focus:shadow-outline hover:text-stone-500"
              type="button"
            >
              <i className="fas fa-plus fa-sm" />
              <span className="ml-2">{t('create')}</span>
            </a>
          </Link>
        ) : null}
      </div>
      <div className="flex flex-wrap py-6">
        {!chores.length ? (
          <div className="mx-2 text-2xl md:text-4xl text-slate-300">
            {emptyListContent ?? t('no-appointments')}
          </div>
        ) : null}

        {chores.map((chore) => (
          <div className="w-full px-3 mb-3 xl:w-3/12 md:mb-2" key={chore.id}>
            <ChoreCard {...chore} />
          </div>
        ))}
      </div>
    </>
  )
}
