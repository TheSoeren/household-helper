import Chore from '@/models/Chore'
import useSWR from 'swr'
import { choreFetcher, deleteRequest } from '@/utils/httpRequests'
import API_KEY from '@/utils/apiKey'

export default function useChores(initialValues: Chore[] = []) {
  const { data = initialValues, mutate } = useSWR<Chore[]>(
    API_KEY.chore,
    choreFetcher
  )

  const deleteChore = async (id: string) => {
    mutate(
      data.filter((c) => c.id !== id),
      false
    )

    await deleteRequest(`${API_KEY.chore}?id=${id}`)
    mutate()
  }

  return {
    chores: data,
    mutateChores: mutate,
    deleteChore,
  }
}
