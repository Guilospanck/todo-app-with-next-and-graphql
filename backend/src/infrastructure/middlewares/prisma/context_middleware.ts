import { PrismaClient } from "@prisma/client"
import { Request } from 'express'
import { prisma } from "../../database/prisma"

export interface Context {
  prisma: PrismaClient
}

export const context = ({ _req }: { _req: Request }): Context => ({ prisma })