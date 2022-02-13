import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Chore from "@/models/Chore";
import { dbChoresToChores } from "@/utils/dataConverter";

const prisma = new PrismaClient();

interface preparedChore extends Omit<Chore, "vEvent"> {
  vEvent: string;
}

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
      const chores = await getChores();
      res.status(200).json(chores);
      break;
    case "POST":
      const createdChore = await createChore(req.body);
      res.status(200).json(createdChore);
      break;
    case "DELETE":
      const deletedChore = await deleteChore(id);
      res.status(200).json(deletedChore);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getChores() {
  return prisma.chore
    .findMany({
      include: {
        icon: true,
      },
    })
    .then((data) => {
      return JSON.stringify(data);
    });
}

function createChore(body: string) {
  const chore: preparedChore = JSON.parse(body);

  if (!chore.icon) return;

  const icon = { create: chore.icon };
  const createChore = {
    ...chore,
    icon,
  };

  return prisma.chore.create({
    data: createChore,
  });
}

function deleteChore(choreIds: string | string[]) {
  if (!Array.isArray(choreIds)) {
    choreIds = [choreIds];
  }

  return prisma.chore.deleteMany({ where: { id: { in: choreIds } } });
}
