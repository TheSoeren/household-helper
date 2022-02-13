import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Event from "@/models/Event";
import { dbEventsToEvents } from "@/utils/dataConverter";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      const event = await getEvents();
      res.status(200).json(event);
      break;
    case "POST":
      const createdEvent = await createEvent(req.body);
      res.status(200).json(createdEvent);
      break;
    case "DELETE":
      const deletedEvent = await deleteEvent(id);
      res.status(200).json(deletedEvent);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getEvents() {
  return prisma.event
    .findMany({
      include: {
        icon: true,
      },
    })
    .then((data) => dbEventsToEvents(data));
}

function createEvent(body: string) {
  const event: Event = JSON.parse(body);

  if (!event.icon) return;

  const icon = { create: event.icon };
  const createEvent = {
    ...event,
    icon,
    vEvent: event.vEvent.map((vEvent) => vEvent.toICal()).join(";"),
  };

  return prisma.event.create({
    data: createEvent,
  });
}

function deleteEvent(eventIds: string | string[]) {
  if (!Array.isArray(eventIds)) {
    eventIds = [eventIds];
  }

  return prisma.event.deleteMany({ where: { id: { in: eventIds } } });
}
