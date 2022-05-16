import Event from '@/models/Event'
import { dbEventsToEvents } from '@/utils/dataConverter'
import useSWR from 'swr'
import { getRequest } from '@/utils/httpRequests'
import API_KEY from '@/utils/apiKey'

export default function useEvents(initialValues: Event[] = []) {
  const fetcher = (url: string) =>
    getRequest(url).then((response) => dbEventsToEvents(JSON.parse(response)))

  const { data = initialValues, mutate } = useSWR<Event[]>(
    API_KEY.event,
    fetcher
  )

  return {
    events: data,
    mutateEvents: mutate,
  }
}
