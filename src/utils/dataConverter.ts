import {
  Chore as PrismaChore,
  Event as PrismaEvent,
  Icon as PrismaIcon,
} from '@prisma/client'
import Chore from '@/models/Chore'
import Event from '@/models/Event'
import { VEvent } from '@/setups/rschedule'
import Icon from '@/models/Icon'
import AppointmentType from '@/enums/AppointmentType'

export type DBChore = PrismaChore & {
  icon: PrismaIcon | null
}

export type DBEvent = PrismaEvent & {
  icon: PrismaIcon | null
}

const dbChoreToChore = ({
  id,
  title,
  icon,
  description,
  vEvent,
  userId,
  allDay,
}: DBChore): Chore => ({
  id,
  type: AppointmentType.CHORE,
  title,
  icon: icon ? new Icon(icon.faclass, icon.color) : null,
  description,
  vEvent: VEvent.fromICal(vEvent)[0],
  userId,
  allDay,
})

const dbChoresToChores = (dbChores: DBChore[]): Chore[] => {
  return dbChores.map(dbChoreToChore)
}

const dbEventToEvent = ({
  id,
  title,
  icon,
  description,
  vEvent,
  userId,
  allDay,
}: DBEvent): Event => ({
  id,
  type: AppointmentType.EVENT,
  title,
  icon: icon ? new Icon(icon.faclass, icon.color) : null,
  description,
  vEvent: VEvent.fromICal(vEvent)[0],
  userId,
  allDay,
})

const dbEventsToEvents = (dbEvents: DBEvent[]): Event[] => {
  return dbEvents.map(dbEventToEvent)
}

export { dbChoresToChores, dbEventsToEvents }
