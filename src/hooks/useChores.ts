import Chore from '@/models/Chore'
import { dbChoresToChores } from '@/utils/dataConverter'
import useSWR from 'swr'
import { getRequest } from '@/utils/httpRequests'
import API_KEY from '@/utils/apiKey'

const fetcher = (url: string) =>
  getRequest(url).then((response) => dbChoresToChores(JSON.parse(response)))

export default function useChores(initialValues: Chore[] = []) {
  const { data = initialValues, mutate } = useSWR<Chore[]>(
    API_KEY.chore,
    fetcher
  )

  console.log(data)
  console.log(API_KEY.chore)

  return {
    chores: data,
    mutateChores: mutate,
  }
}
