import {
  Event as PrismaEvent,
  Chore as PrismaChore,
  Icon as PrismaIcon,
} from "@prisma/client";
import Chore from "@/models/Chore";
import { IRuleOptions, Rule, Schedule, VEvent } from "@/setups/rschedule";
import dayjs from "dayjs";
import RuleKey from "@/enums/RuleKey";
import EventRuleKey from "@/enums/EventRuleKey";

const EVENT_RULES = ["rrules", "exrules"];
type RuleKeyUnion = "exrules" | "exrules";

const EVENT_DATES = ["rdates", "exdates"];
type DateKeyUnion = "rdates" | "exdates";

type RestKeyUnion =
  | "id"
  | "timezone"
  | "maxDuration"
  | "choreREventId"
  | "eventREventId";

type DBChore = PrismaChore & {
  icon: PrismaIcon | null;
};

export default function useDataConverter() {
  // const dbREventToREvent = (event: PrismaREvent): REvent => {
  //   const fixedEvent: REvent = {};

  //   Object.keys(event).forEach((key) => {
  //     const ruleKey = key as RuleKeyUnion;
  //     const dateKey = key as DateKeyUnion;
  //     const restKey = key as RestKeyUnion;

  //     if (EVENT_RULES.includes(key)) {
  //       fixedEvent[ruleKey] = JSON.parse(
  //         event[ruleKey] || "[]"
  //       ) as IRuleOptions[];
  //     } else if (EVENT_DATES.includes(key)) {
  //       const dates = JSON.parse(event[ruleKey] || "[]");
  //       dates.map((date: string) => dayjs(date));

  //       fixedEvent[dateKey] = dates;
  //     } else {
  //       fixedEvent[restKey] = event[restKey] as any; // ToDo: Why tho?
  //     }
  //   });

  //   return fixedEvent;
  // };

  // const dbREventsToREvents = (events: PrismaREvent[]): REvent[] => {
  //   return events.map((event: any) => dbREventToREvent(event));
  // };

  // const rEventToSchedule = <T = any>(rEvent: REvent): Schedule<T> => {
  //   return new Schedule({
  //     ...rEvent,
  //     rrules: rEvent.rrules?.map((rule) => ({
  //       ...rule,
  //       start: dayjs(rule.start as unknown as string),
  //       end: dayjs(rule.end as unknown as string),
  //     })),
  //   });
  // };

  // const rEventsToSchedules = <T = any>(rEvents: REvent[]): Schedule<T>[] => {
  //   return rEvents.map((rEvent) => rEventToSchedule(rEvent));
  // };

  // const dbChoreREventsToChoreREvents = (
  //   choreREvents: DynamicDBChoreREventType[]
  // ): ChoreREvent[] => {
  //   const fixedChoreEvents: ChoreREvent[] = [];

  //   choreREvents.forEach((choreREvent) => {
  //     if (choreREvent.rEvent) {
  //       const fixedChoreEvent: ChoreREvent = {
  //         ...choreREvent,
  //         rEvent: dbREventToREvent(choreREvent.rEvent),
  //       };

  //       fixedChoreEvents.push(fixedChoreEvent);
  //     }
  //   });

  //   return fixedChoreEvents;
  // };

  // const dbEventREventsToEventREvents = (
  //   eventREvents: DynamicDBEventREventType[]
  // ): EventREvent[] => {
  //   const fixedChoreEvents: EventREvent[] = [];

  //   eventREvents.forEach((eventREvent) => {
  //     if (eventREvent.rEvent) {
  //       const fixedEventREvent: EventREvent = {
  //         ...eventREvent,
  //         rEvent: dbREventToREvent(eventREvent.rEvent),
  //       };

  //       fixedChoreEvents.push(fixedEventREvent);
  //     }
  //   });

  //   return fixedChoreEvents;
  // };

  //   const fixedEvent: REvent = {};

  //   Object.keys(event).forEach((key) => {
  //     const ruleKey = key as RuleKeyUnion;
  //     const dateKey = key as DateKeyUnion;
  //     const restKey = key as RestKeyUnion;

  //     if (EVENT_RULES.includes(key)) {
  //       fixedEvent[ruleKey] = JSON.parse(
  //         event[ruleKey] || "[]"
  //       ) as IRuleOptions[];
  //     } else if (EVENT_DATES.includes(key)) {
  //       const dates = JSON.parse(event[ruleKey] || "[]");
  //       dates.map((date: string) => dayjs(date));

  //       fixedEvent[dateKey] = dates;
  //     } else {
  //       fixedEvent[restKey] = event[restKey] as any; // ToDo: Why tho?
  //     }
  //   });

  //   return fixedEvent;
  // };

  // const dbREventsToREvents = (events: PrismaREvent[]): REvent[] => {
  //   return events.map((event: any) => dbREventToREvent(event));
  // };

  // const rEventToSchedule = <T = any>(rEvent: REvent): Schedule<T> => {
  //   return new Schedule({
  //     ...rEvent,
  //     rrules: rEvent.rrules?.map((rule) => ({
  //       ...rule,
  //       start: dayjs(rule.start as unknown as string),
  //       end: dayjs(rule.end as unknown as string),
  //     })),
  //   });
  // };

  // const rEventsToSchedules = <T = any>(rEvents: REvent[]): Schedule<T>[] => {
  //   return rEvents.map((rEvent) => rEventToSchedule(rEvent));
  // };

  // const dbChoreREventsToChoreREvents = (
  //   choreREvents: DynamicDBChoreREventType[]
  // ): ChoreREvent[] => {
  //   const fixedChoreEvents: ChoreREvent[] = [];

  //   choreREvents.forEach((choreREvent) => {
  //     if (choreREvent.rEvent) {
  //       const fixedChoreEvent: ChoreREvent = {
  //         ...choreREvent,
  //         rEvent: dbREventToREvent(choreREvent.rEvent),
  //       };

  //       fixedChoreEvents.push(fixedChoreEvent);
  //     }
  //   });

  //   return fixedChoreEvents;
  // };

  // const dbEventREventsToEventREvents = (
  //   eventREvents: DynamicDBEventREventType[]
  // ): EventREvent[] => {
  //   const fixedChoreEvents: EventREvent[] = [];

  //   eventREvents.forEach((eventREvent) => {
  //     if (eventREvent.rEvent) {
  //       const fixedEventREvent: EventREvent = {
  //         ...eventREvent,
  //         rEvent: dbREventToREvent(eventREvent.rEvent),
  //       };

  //       fixedChoreEvents.push(fixedEventREvent);
  //     }
  //   });

  //   return fixedChoreEvents;
  // };

  const dbChoreToChore = ({
    id,
    title,
    icon,
    responsible,
    description,
    vEvent,
  }: Readonly<DBChore>): Chore => {
    return {
      id,
      title,
      icon,
      responsible,
      description,
      vEvent: VEvent.fromICal(vEvent),
    };
  };

  const dbChoresToChores = (dbChores: DBChore[]): Chore[] => {
    return dbChores.map(dbChoreToChore);
  };

  return {
    // dbREventsToREvents,
    // rEventToSchedule,
    // rEventsToSchedules,
    // dbChoreREventsToChoreREvents,
    // dbEventREventsToEventREvents,
    dbChoresToChores,
  };
}
