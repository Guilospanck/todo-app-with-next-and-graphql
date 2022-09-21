import { gql } from '@apollo/client'
import apolloClient from '../../../shared/apollo-client'
import { TodoItem } from '../types/todoitem'

export interface ICreateUpdateNoteUsecase {
  create: (note: TodoItem) => Promise<TodoItem>
}

const CreateUpdateNoteUsecase = () => {
  const create = async (note: TodoItem): Promise<TodoItem> => {
    const postNote = gql`
      mutation PostNote($title: String!, $description: String) {
        postNote(title: $title, description: $description) {
          id
          title
          description
          createdAt
          updatedAt
        }
      }
    `

    const result = await apolloClient.mutate({
      mutation: postNote,
      variables: { title: note.title, description: note.description }
    })

    return result.data.postNote
  }

  return {
    create
  }
}

export default CreateUpdateNoteUsecase