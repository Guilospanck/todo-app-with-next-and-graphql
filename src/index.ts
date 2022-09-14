import { ApolloServer } from "apollo-server"
import StartPrisma, { prisma } from "./infrastructure/database/prisma"
import { context } from "./infrastructure/middlewares/prisma/context_middleware"
import { schema } from "./schema"

StartPrisma()
  .catch(err => {
    console.error(`Error tryng to start Prisma: ${err}`)
    throw err
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log(`Prisma disconnected!`)
  })

export const server = new ApolloServer({
  schema,
  context
})

const PORT = process.env.PORT || 3000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})