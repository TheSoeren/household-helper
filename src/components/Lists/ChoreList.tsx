import Chore from '@/models/Chore'
import ChoreCard from '@/components/Cards/ChoreCard'
import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import dayjs from 'dayjs'
import { DateAdapter, RRule, VEvent } from '@/setups/rschedule'
import Icon from '@/models/Icon'
import useChores from '@/hooks/useChores'
import { postRequest } from '@/utils/httpRequests'
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
  const { mutateChores } = useChores()
  const { t } = useTranslation()
  const { user } = useUser()

  const createChoreHandler = async () => {
    if (!user) return

    const start = dayjs().subtract(1, 'month')
    const rule = new RRule({
      frequency: 'WEEKLY',
      byDayOfWeek: [DateAdapter.WEEKDAYS[dayjs().day()]],
      byHourOfDay: [dayjs().hour() as DateAdapter.Hour],
      start,
    })

    const icon = new Icon('fas fa-calendar', 'bg-slate-500')
    const vevent = new VEvent({
      start,
      rrules: [rule],
      duration: 2 * 60 * 60 * 1000,
    })
    const chore = new Chore(user.id, 'Abstauben', 'description', icon, vevent)

    // https://swr.vercel.app/docs/mutation#mutation-and-post-request
    mutateChores([...chores, chore], false)

    await postRequest('/api/chore', chore.toString())
    mutateChores()
  }

  return (
    <>
      <div className="flex items-center content-center px-3 pt-6 text-center">
        <h6 className="text-xl font-bold text-slate-700">{title}</h6>
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
