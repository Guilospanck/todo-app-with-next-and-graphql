import { gql } from '@apollo/client'
import apolloClient from '../../../shared/apollo-client'
import { TodoItem } from '../types/todoitem'

export interface IGetTodoItemsUsecase {
  getAll: () => Promise<TodoItem[]>
}

const GetTodoItemsUsecase = () => {
  const getAll = async (): Promise<TodoItem[]> => {
    const allTodoItems = gql`
      query {
        getAllNotes {
          id
          title
          description
          createdAt
          updatedAt
          deletedAt
        }
      }
    `

    const result = await apolloClient.query({
      query: allTodoItems
    })

    return result.data.getAllNotes
  }

  return {
    getAll
  }
}

export default GetTodoItemsUsecase