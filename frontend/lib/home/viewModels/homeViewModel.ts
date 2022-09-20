import { useEffect, useState } from "react"
import { TableProps } from "../../../components/table"
import { TodoItem } from "../types/todoitem"
import { ICreateUpdateNoteUsecase } from "../useCases/createUpdateNoteUsecase"
import { IGetTodoItemsUsecase } from "../useCases/getTodoItemsUsecase"

type HomeViewModelProps = {
  getTodoItemsUsecase: IGetTodoItemsUsecase
  createUpdateNoteUsecase: ICreateUpdateNoteUsecase
}
export interface IUseHomeViewModel {
  showModal: boolean,
  todoItems: TodoItem[],
  tableItems: TableProps,
  addNewNote: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onModalCancelClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onModalConfirmClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const useHomeViewModel = ({ getTodoItemsUsecase, createUpdateNoteUsecase }: HomeViewModelProps): IUseHomeViewModel => {
  const [showModal, setShowModal] = useState<boolean>(false)
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
    const headers = Object.keys(todoItems[0]).filter(item => item !== '__typename' && item !== 'deletedAt')
    const body: any[][] = []
    todoItems.map(item => body.push(Object.values(item).filter(item => item && item !== 'Note')))
    setTableItems({ headers, body })
  }, [todoItems])

  const addNewNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setShowModal(!showModal)
  }

  const onModalCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setShowModal(!showModal)
  }

  const onModalConfirmClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const title = (document.getElementById("title") as HTMLInputElement)?.value
    const description = (document.getElementById("description") as HTMLInputElement)?.value

    if(!title || title?.length === 0) {
      alert('Title is required.')
      return
    }

    const result = await createUpdateNoteUsecase.create({ title, description } as TodoItem)
    const todoItemsClone: TodoItem[] = JSON.parse(JSON.stringify(todoItems))
    todoItemsClone.push(result)

    setTodoItems(todoItemsClone)
    setShowModal(!showModal)
  }

  return {
    showModal,
    todoItems,
    tableItems,
    addNewNote,
    onModalCancelClick,
    onModalConfirmClick
  }
}

export default useHomeViewModel