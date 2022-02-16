import {
  Chore as PrismaChore,
  Event as PrismaEvent,
  Icon as PrismaIcon,
} from "@prisma/client";
import Chore from "@/models/Chore";
import Event from "@/models/Event";
import { VEvent } from "@/setups/rschedule";
import Icon from "@/models/Icon";

export type DBChore = PrismaChore & {
  icon: PrismaIcon | null;
};

export type DBEvent = PrismaEvent & {
  icon: PrismaIcon | null;
};

const dbChoreToChore = ({
  id,
  title,
  icon,
  responsible,
  description,
  vEvent,
}: DBChore): Chore => ({
  id,
  title,
  icon: icon ? new Icon(icon.faclass, icon.color) : null,
  responsible,
  description,
  vEvent: VEvent.fromICal(vEvent)[0],
});

const dbChoresToChores = (dbChores: DBChore[]): Chore[] => {
  return dbChores.map(dbChoreToChore);
};

const dbEventToEvent = ({
  id,
  title,
  icon,
  responsible,
  description,
  vEvent,
}: DBEvent): Event => ({
  id,
  title,
  icon,
  responsible,
  description,
  vEvent: VEvent.fromICal(vEvent)[0],
});

const dbEventsToEvents = (dbEvents: DBEvent[]): Event[] => {
  return dbEvents.map(dbEventToEvent);
};

export { dbChoresToChores, dbEventsToEvents };
