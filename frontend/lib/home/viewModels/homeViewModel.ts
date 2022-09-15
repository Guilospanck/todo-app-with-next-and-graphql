import { useEffect, useState } from "react"
import { TodoItem } from "../types/todoitem"
import { IGetTodoItemsUsecase } from "../useCases/getTodoItemsUsecase"

type HomeViewModelProps = {
  getTodoItemsUsecase: IGetTodoItemsUsecase
}

export interface IUseHomeViewModel {
  todoItems: TodoItem[]
}

const useHomeViewModel = ({ getTodoItemsUsecase }: HomeViewModelProps): IUseHomeViewModel => {

  const [todoItems, setTodoItems] = useState<TodoItem[]>([])

  useEffect(() => {
    const getAllTodoItems = async () => {
      const items = await getTodoItemsUsecase.getAll()
      setTodoItems(items)
    }
    getAllTodoItems()
  }, [])

  return {
    todoItems
  }
}

export default useHomeViewModel