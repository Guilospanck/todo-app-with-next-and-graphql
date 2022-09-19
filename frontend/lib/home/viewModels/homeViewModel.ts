import { useEffect, useState } from "react"
import { TableProps } from "../../../components/table"
import { TodoItem } from "../types/todoitem"
import { IGetTodoItemsUsecase } from "../useCases/getTodoItemsUsecase"

type HomeViewModelProps = {
  getTodoItemsUsecase: IGetTodoItemsUsecase
}
export interface IUseHomeViewModel {
  todoItems: TodoItem[],
  tableItems: TableProps,
  addNewNote: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const useHomeViewModel = ({ getTodoItemsUsecase }: HomeViewModelProps): IUseHomeViewModel => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])
  const [tableItems, setTableItems] = useState<TableProps>({ headers: [], body: [] })

  useEffect(() => {
    const getAllTodoItems = async () => {
      const items = await getTodoItemsUsecase.getAll()
      setTodoItems(items)
    }
    getAllTodoItems()
  }, [])

  useEffect(() => {
    if (todoItems.length === 0) { return }
    const headers = Object.keys(todoItems[0]).filter(item => item !== '__typename')
    const body: any[][] = []
    todoItems.map(item => body.push(Object.values(item).filter(item => item !== 'Note')))
    setTableItems({ headers, body })
  }, [todoItems])

  const addNewNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('here')
  }

  return {
    todoItems,
    tableItems,
    addNewNote
  }
}

export default useHomeViewModel