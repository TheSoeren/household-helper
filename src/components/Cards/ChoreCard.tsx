import Chore from '@/models/Chore'
import toast from 'react-hot-toast'
import AppointmentCard from './AppointmentCard'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'
import API_KEY from '@/utils/apiKey'
import { choreFetcher, deleteRequest } from '@/utils/httpRequests'

export default function ChoreCard(chore: Chore) {
  const { t } = useTranslation('common')
  const { data: chores = [], mutate: mutateChores } = useSWR(
    API_KEY.chore,
    choreFetcher
  )

  const deleteChore = async (id: string) => {
    mutateChores(
      chores.filter((c) => c.id !== id),
      false
    )

    await deleteRequest(`${API_KEY.chore}?id=${id}`)
    mutateChores()
  }

  const deleteChoreHandler = async () => {
    if (!chore.id) {
      toast.error(t('no-id-prepared'))
      return
    }

    deleteChore(chore.id)
  }

  return <AppointmentCard appointment={chore} onDelete={deleteChoreHandler} />
}
