import { makeSchema } from "nexus"
import { join } from "path"
import * as types from './interfaces/graphql'

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), 'schema.graphql'),
    typegen: join(process.cwd(), 'nexus-typegen.ts')
  },
  contextType: {
    module: join(process.cwd(), './src/infrastructure/middlewares/prisma/context_middleware.ts'),
    export: 'Context'
  }
})