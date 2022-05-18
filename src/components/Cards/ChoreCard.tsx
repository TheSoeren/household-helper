import useChores from '@/hooks/useChores'
import Chore from '@/models/Chore'
import toast from 'react-hot-toast'
import AppointmentCard from './AppointmentCard'
import { useTranslation } from 'next-i18next'

export default function ChoreCard(chore: Chore) {
  const { t } = useTranslation('common')
  const { deleteChore } = useChores()

  const deleteChoreHandler = async () => {
    if (!chore.id) {
      toast.error(t('no-id-prepared'))
      return
    }

    deleteChore(chore.id)
  }

  return <AppointmentCard appointment={chore} onDelete={deleteChoreHandler} />
}
