import { gql } from '@apollo/client'
import apolloClient from '../../../shared/apollo-client'
import { TodoItem } from '../types/todoitem'

export interface ICreateUpdateNoteUsecase {
  create: () => Promise<TodoItem[]>
}

const CreateUpdateNoteUsecase = () => {
  const create = async (note: TodoItem): Promise<void> => {
    console.log(note)

    const postNote = gql`
      mutation PostNote($title: String!, $description: String) {
        postNote(title: $title, description: $description) {
          id
          title
          description
          createdAt
          updatedAt
          deletedAt
        }
      }
    `

    const result = await apolloClient.mutate({
      mutation: postNote,
      variables: { title: note.title, description: note.description }
    })

    console.log(result)
  }

  return {
    create
  }
}

export default CreateUpdateNoteUsecase