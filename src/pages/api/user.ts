import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '@/models/User'

const prisma = new PrismaClient()

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
      const user = await getUser(id)
      res.status(200).json(user)
      break
    case 'POST':
      const createdChore = await createUser(req.body)
      res.status(200).json(createdChore)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

function getUser(userId: string | string[]) {
  const where = { id: '' }

  if (!Array.isArray(userId)) {
    where.id = userId
  } else {
    where.id = userId[0]
  }

  return prisma.user.findUnique({ where })
}

function createUser(body: string) {
  const user: User = JSON.parse(body)

  return prisma.user.create({
    data: user,
  })
}
