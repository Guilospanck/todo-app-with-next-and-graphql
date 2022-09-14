import { PrismaClient } from "@prisma/client"
import { Request } from 'express'

export interface Context {
  prisma: PrismaClient
}

export const prisma = new PrismaClient()

export const context = ({ _req }: { _req: Request }): Context => ({ prisma })