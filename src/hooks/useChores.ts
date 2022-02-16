import Chore from '@/models/Chore'
import { dbChoresToChores } from '@/utils/dataConverter'
import useSWR from 'swr'
import { getRequest } from '@/utils/httpRequests'

export default function useChores(initialValues?: Chore[]) {
    const fetcher = (url: string) =>
        getRequest(url).then((json) => dbChoresToChores(json))

    const { data = initialValues || [], mutate } = useSWR<Chore[]>(
        '/api/chore',
        fetcher
    )

return {
    chores: data,
    mutateChores: mutate,
}
}
