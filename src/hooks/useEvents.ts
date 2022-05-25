import Event from '@/models/Event'
import useSWR from 'swr'
import { deleteRequest, eventFetcher, postRequest } from '@/utils/httpRequests'
import API_KEY from '@/utils/apiKey'

export default function useEvents(initialValues: Event[] = []) {
  const { data = initialValues, mutate } = useSWR<Event[]>(
    API_KEY.event,
    eventFetcher
  )

  const deleteEvent = async (id: string) => {
    mutate(
      data.filter((c) => c.id !== id),
      false
    )

    await deleteRequest(`${API_KEY.event}?id=${id}`)
    mutate()
  }

  const addEvent = async (event: Event) => {
    const temp = [...data]
    temp.push(event)
    mutate(temp, false)

    await postRequest(API_KEY.event, event.toString())
    mutate()
  }

  return {
    events: data,
    mutateEvents: mutate,
    deleteEvent,
    addEvent,
  }
}
