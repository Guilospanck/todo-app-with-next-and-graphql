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
  addNewNote: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>,
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
    const headers = Object.keys(todoItems[0]).filter(item => item !== '__typename')
    const body: any[][] = []
    todoItems.map(item => body.push(Object.values(item).filter(item => item !== 'Note')))
    setTableItems({ headers, body })
  }, [todoItems])

  const addNewNote = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setShowModal(!showModal)
    // await createUpdateNoteUsecase.create({ title: 'Test', description: 'Test description' } as TodoItem)
  }

  const onModalCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('modal cancelled')
    setShowModal(!showModal)
  }

  const onModalConfirmClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('modal confirmed')
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