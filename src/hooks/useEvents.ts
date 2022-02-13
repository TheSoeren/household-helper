import AuthContext from "@/contexts/AuthContext";
import Event from "@/models/Event";
import { dbEventsToEvents } from "@/utils/dataConverter";
import { isThisMonth, isToday } from "@/utils/rschedule";
import { useContext } from "react";
import useSWR from "swr";
import useHttp from "./useHttp";

export default function useEvents(initialValues?: Event[]) {
  const { getRequest } = useHttp();
  const { user, authenticated } = useContext(AuthContext);

  const fetcher = (url: string) =>
    getRequest(url).then((json) => dbEventsToEvents(json));

  const { data = initialValues || [], mutate } = useSWR<Event[]>(
    "/api/event",
    fetcher
  );

  const getOwnEvents = (events = data) => {
    if (!authenticated || !user) return [];
    return events.filter((event) => event.responsible === user.name);
  };

  const getEventsToday = () =>
    data.filter(({ vEvent }) => vEvent.some(isToday));

  const getEventsThisMonth = (): Event[] =>
    data.filter(({ vEvent }) => vEvent.some(isThisMonth));

  const ownEvents = getOwnEvents();
  const eventsToday = getEventsToday();
  const ownEventsToday = getOwnEvents(eventsToday);
  const eventsThisMonth = getEventsThisMonth();

  return {
    events: data,
    ownEvents,
    eventsToday,
    ownEventsToday,
    eventsThisMonth,
    mutateEvents: mutate,
  };
}
