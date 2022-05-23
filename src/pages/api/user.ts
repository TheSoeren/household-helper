import type { NextApiRequest, NextApiResponse } from 'next'
import User from '@/models/User'
import prisma from '@/utils/prisma'

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
      if (id) {
        const user = await getUser(id)
        res.status(200).json(user)
      } else {
        const users = await getUsers()
        res.status(200).json(users)
      }
      break
    case 'PUT':
      const updatedUser = await updateUser(req.body)
      res.status(200).json(updatedUser)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

function getUsers() {
  return prisma.user.findMany()
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

function updateUser(body: string) {
  const user: User = JSON.parse(body)

  return prisma.user.update({
    where: { id: user.id },
    data: { ...user, locale: user.locale.value },
  })
}
