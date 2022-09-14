import { PrismaClient } from "@prisma/client"
import SoftDeleteMiddleware from "../../middlewares/prisma/softdelete_middleware"

export const prisma = new PrismaClient()

const StartPrisma = async () => {
  SoftDeleteMiddleware()
}

export default StartPrisma