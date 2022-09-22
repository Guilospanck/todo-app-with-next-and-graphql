import { UserInputError } from 'apollo-server-express'
import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.string('description')
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
    t.dateTime('deletedAt')
  },
})

export const NoteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getAllNotes', {
      type: 'Note',
      async resolve(parent, args, context) {
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

    t.nonNull.field('deleteNote', {
      type: 'Note',
      args: {
        id: nonNull(intArg())
      },
      async resolve(parent, args, context, info) {
        return context.prisma.note.delete({
          where: {
            id: args.id
          }
        })
      }
    })

    t.nonNull.field('updateNote', {
      type: 'Note',
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        description: stringArg()
      },
      async resolve(_parent, args, context, _info) {
        const { id, title, description } = args

        // verify if id exists
        const note = await context.prisma.note.findUnique({ where: { id } })
        if(note === null) {
          throw new UserInputError('Note with this ID is non-existent')
        }

        return context.prisma.note.update({
          where: {
            id: args.id
          },
          data: {
            title: args.title ?? note.title,
            description: args.description ?? note.description
          }
        })
      }
    })
  },
})