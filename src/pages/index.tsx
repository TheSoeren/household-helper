import Occurrence from "@/models/Occurrence";
import useEvents from "@/hooks/useEvents";
import useChores from "@/hooks/useChores";
import { useState } from "react";
import OccurrenceList from "@/components/Lists/OccurrenceList";

export default function Home() {
  const { choresToday, ownChoresToday } = useChores([]);
  const { eventsToday, ownEventsToday } = useEvents([]);

  const [vEventsToday] = useState<Occurrence[]>([
    ...choresToday,
    ...eventsToday,
  ]);
  const [ownVEventsToday] = useState<Occurrence[]>([
    ...ownChoresToday,
    ...ownEventsToday,
  ]);

  return (
    <>
      <OccurrenceList
        title="Meine Aufgaben heute"
        occurrences={ownVEventsToday}
      />
      <OccurrenceList title="Alle Aufgaben heute" occurrences={vEventsToday} />
    </>
  );
}
