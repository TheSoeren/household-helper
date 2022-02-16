import Event from "@/models/Event";
import { dbEventsToEvents } from "@/utils/dataConverter";
import useSWR from "swr";
import { getRequest } from "@/utils/httpRequests";

export default function useEvents(initialValues?: Event[]) {
  const fetcher = (url: string) =>
    getRequest(url).then((json) => dbEventsToEvents(json));

  const { data = initialValues || [], mutate } = useSWR<Event[]>(
    "/api/event",
    fetcher
  );

  return {
    events: data,
    mutateEvents: mutate,
  };
}
