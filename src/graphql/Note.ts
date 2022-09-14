import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.string('description')
    t.nonNull.dateTime('createdAt')
  },
})

export const NoteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getAllNotes', {
      type: 'Note',
      resolve(parent, args, context) {
        return context.prisma.note.findMany()
      }
    })
  },
})

export const NoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('postNote', {
      type: 'Note',
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
      },
      async resolve(parent, args, context) {
        return context.prisma.note.create({
          data: {
            description: args.description,
            title: args.title
          }
        })
      }
    })
  },
})