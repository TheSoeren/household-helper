import type { NextApiRequest, NextApiResponse } from 'next'
import Event from '@/models/Event'
import prisma from '@/utils/prisma'

interface preparedEvent extends Omit<Event, 'vEvent'> {
  vEvent: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      const event = await getEvents()
      res.status(200).json(event)
      break
    case 'POST':
      const createdEvent = await createEvent(req.body)
      res.status(200).json(createdEvent)
      break
    case 'DELETE':
      const deletedEvent = await deleteEvent(id)
      res.status(200).json(deletedEvent)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

function getEvents() {
  return prisma.event
    .findMany({
      include: {
        icon: true,
      },
    })
    .then((data) => JSON.stringify(data))
}

function createEvent(body: string) {
  const event: preparedEvent = JSON.parse(body)

  if (!event.icon) return

  const icon = { create: event.icon }
  const createEvent = {
    ...event,
    icon,
  }

  return prisma.event.create({
    data: createEvent,
  })
}

function deleteEvent(eventIds: string | string[]) {
  if (!Array.isArray(eventIds)) {
    eventIds = [eventIds]
  }

  return prisma.event.deleteMany({ where: { id: { in: eventIds } } })
}
