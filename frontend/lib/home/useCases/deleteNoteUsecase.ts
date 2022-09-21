import { gql } from '@apollo/client'
import apolloClient from '../../../shared/apollo-client'
import { TodoItem } from '../types/todoitem'

export interface IDeleteNoteUsecase {
  deleteNote: (id: number) => Promise<TodoItem>
}

const DeleteNoteUsecase = () => {
  const deleteNote = async (id: number): Promise<TodoItem> => {
    const deleteNote = gql`
      mutation DeleteNote($id: Int!) {
        deleteNote(id: $id) {
          id
          title
          description
          createdAt
          updatedAt
        }
      }
    `

    const result = await apolloClient.mutate({
      mutation: deleteNote,
      variables: { id }
    })

    return result.data.deleteNote
  }

  return {
    deleteNote
  }
}

export default DeleteNoteUsecase