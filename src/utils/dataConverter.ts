import {
  Chore as PrismaChore,
  Event as PrismaEvent,
  Icon as PrismaIcon,
  User as PrismaUser,
} from '@prisma/client'
import Chore from '@/models/Chore'
import Event from '@/models/Event'
import { VEvent } from '@/setups/rschedule'
import Icon from '@/models/Icon'
import AppointmentType from '@/enums/AppointmentType'
import User from '@/models/User'
import locales from '@/data/locales'

export type DBChore = PrismaChore & {
  icon: PrismaIcon | null
}

export type DBEvent = PrismaEvent & {
  icon: PrismaIcon | null
}

export type DBUser = PrismaUser

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

const dbChoresToChores = (dbChores: DBChore[]): Chore[] =>
  dbChores.map(dbChoreToChore)

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

const dbEventsToEvents = (dbEvents: DBEvent[]): Event[] =>
  dbEvents.map(dbEventToEvent)

const dbUserToUser = (dbUser: DBUser): User => {
  const locale = locales.find((l) => l.value === dbUser.locale) || locales[0]

  return { ...dbUser, locale }
}

export { dbChoresToChores, dbEventsToEvents, dbUserToUser }
