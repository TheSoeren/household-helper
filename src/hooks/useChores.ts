import Chore from '@/models/Chore'
import useSWR from 'swr'
import { choreFetcher, deleteRequest, postRequest } from '@/utils/httpRequests'
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

  const addChore = async (chore: Chore) => {
    const temp = [...data]
    temp.push(chore)
    mutate(temp, false)

    await postRequest(API_KEY.chore, chore.toString())
    mutate()
  }

  return {
    chores: data,
    mutateChores: mutate,
    deleteChore,
    addChore,
  }
}
