import { PrismaClient } from '@prisma/client'

type NodeJSGlobal = typeof globalThis

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJSGlobal {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
