import { extendType, objectType } from 'nexus'

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