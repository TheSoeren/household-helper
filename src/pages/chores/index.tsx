import ChoreList from '@/components/Lists/ChoreList'
import Chore from '@/models/Chore'
import { DateAdapter, RRule, VEvent } from '@/setups/rschedule'
import dayjs from 'dayjs'
import { postRequest } from '@/utils/httpRequests'
import ChoresPageSkeleton from '@/components/Skeletons/ChoresPageSkeleton'
import useChores from '@/hooks/useChores'
import Icon from '@/models/Icon'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AppointmentBuilder from '@/builders/AppointmentBuilder'
import Dashboard from '@/layouts/Dashboard'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

export default function Chores() {
  const { chores, mutateChores } = useChores([])
  const { t } = useTranslation('chores-page')

  if (!chores) {
    return <ChoresPageSkeleton />
  }

  const ownChores = new AppointmentBuilder(chores).ownAppointments().build()

  const createChoreHandler = async () => {
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
    const chore = new Chore(
      '7e28b771-0570-4e02-bcab-bf8229feaa14',
      'Abstauben',
      'description',
      icon,
      vevent
    )

    // https://swr.vercel.app/docs/mutation#mutation-and-post-request
    mutateChores([...chores, chore], false)

    await postRequest('/api/chore', chore.toString())
    mutateChores()
  }

  return (
    <>
      <ChoreList title={t('my-chores')} chores={ownChores} />
      <ChoreList title={t('all-chores')} chores={chores} />
      <button
        className="bg-slate-50 hover:text-stone-500 shadow-lg h-10 w-10 items-center justify-center align-center rounded-full focus:outline-none mx-3"
        type="button"
        onClick={createChoreHandler}
      >
        <i className="fas fa-plus"></i>
      </button>
    </>
  )
}

Chores.layout = Dashboard

export const getServerSideProps = withAuthRequired({
  redirectTo: '/auth/authenticate',
  getServerSideProps: async ({ locale }) => {
    let translations = {}

    if (locale) {
      translations = await serverSideTranslations(locale, [
        'sidebar',
        'chores-page',
      ])
    }

    return {
      props: {
        ...translations,
      },
    }
  },
})
