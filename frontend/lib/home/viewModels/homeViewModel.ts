import { useEffect, useRef, useState } from "react"
import { ModalType } from "../../../components/modal"
import { TableProps } from "../../../components/table"
import { TodoItem } from "../types/todoitem"
import { ICreateUpdateNoteUsecase } from "../useCases/createUpdateNoteUsecase"
import { IDeleteNoteUsecase } from "../useCases/deleteNoteUsecase"
import { IGetTodoItemsUsecase } from "../useCases/getTodoItemsUsecase"

type HomeViewModelProps = {
  getTodoItemsUsecase: IGetTodoItemsUsecase
  createUpdateNoteUsecase: ICreateUpdateNoteUsecase
  deleteNoteUsecase: IDeleteNoteUsecase
}
export interface IUseHomeViewModel {
  showModal: ShowModal,
  todoItems: TodoItem[],
  tableItems: TableProps,
  onAddNewNoteClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onDeleteNoteClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void,
  onModalCancelClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modalType: ModalType) => void,
  onModalConfirmClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modalType: ModalType) => void,
}

type ShowModal = {
  [key in keyof typeof ModalType]: boolean
}

const useHomeViewModel = ({ getTodoItemsUsecase, createUpdateNoteUsecase, deleteNoteUsecase }: HomeViewModelProps): IUseHomeViewModel => {
  const [showModal, setShowModal] = useState<ShowModal>({ ADD_NOTE_MODAL: false, DELETE_NODE_MODAL: false })
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])
  const [tableItems, setTableItems] = useState<TableProps>({ headers: [], body: [] })

  const deleteNoteRef = useRef<number | null >(null)

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
    todoItems.map(item => {
      const items = Object.values(item)
      const itemsLength = items.length
      body.push(items.filter((item, idx) => item !== 'Note' && idx !== itemsLength - 1)) // remove 'deletedAt' and 'Note'
    })
    setTableItems({ headers, body })
  }, [todoItems])

  const onAddNewNoteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setShowModal({ ...showModal, ADD_NOTE_MODAL: true })
  }

  const onDeleteNoteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault()
    deleteNoteRef.current = id
    setShowModal({ ...showModal, DELETE_NODE_MODAL: true })
  }

  const onModalCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modalType: ModalType) => {
    e.preventDefault()
    setShowModal({ ...showModal, [ModalType[modalType]]: false })
  }

  const onModalConfirmClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, modalType: ModalType) => {
    e.preventDefault()

    switch(modalType) {
      case ModalType.ADD_NOTE_MODAL: {
        await _addNewNote()
        break
      }
      case ModalType.DELETE_NODE_MODAL: {
        await _deleteNote()
        break
      }
      default: {
        break
      }
    }
    
    setShowModal({ ...showModal, [ModalType[modalType]]: false })
  }

  const _addNewNote = async () => {
    const title = (document.getElementById("title") as HTMLInputElement)?.value
    const description = (document.getElementById("description") as HTMLInputElement)?.value

    if (!title || title?.length === 0) {
      alert('Title is required.')
      return
    }

    const result = await createUpdateNoteUsecase.create({ title, description } as TodoItem)
    const todoItemsClone: TodoItem[] = JSON.parse(JSON.stringify(todoItems))
    todoItemsClone.push(result)

    setTodoItems(todoItemsClone)
  }

  const _deleteNote = async () => {
    await deleteNoteUsecase.deleteNote(deleteNoteRef.current as number)
    let todoItemsClones: TodoItem[] = JSON.parse(JSON.stringify(todoItems))
    todoItemsClones = todoItemsClones.filter(item => Number(item.id) !== deleteNoteRef.current as number)
    setTodoItems(todoItemsClones)
  }

  return {
    showModal,
    todoItems,
    tableItems,
    onAddNewNoteClick,
    onDeleteNoteClick,
    onModalCancelClick,
    onModalConfirmClick,
  }
}

export default useHomeViewModel