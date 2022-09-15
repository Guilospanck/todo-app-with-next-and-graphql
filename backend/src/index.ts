import { ApolloServer } from "apollo-server-express"
import StartPrisma, { prisma } from "./infrastructure/database/prisma"
import { context } from "./infrastructure/middlewares/prisma/context_middleware"
import { schema } from "./schema"
import express from 'express'
import http from 'http'

StartPrisma()
  .catch(err => {
    console.error(`Error trying to start Prisma: ${err}`)
    throw err
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log(`Prisma disconnected!`)
  });

(async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: 'bounded'
  })
  await server.start()
  server.applyMiddleware({ app, path: '/api/graphql' })
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})()