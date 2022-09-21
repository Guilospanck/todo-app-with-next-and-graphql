import Button from "../../../components/button"
import Modal, { ModalProps, ModalType } from "../../../components/modal"
import Table from "../../../components/table"
import { IUseHomeViewModel } from "../viewModels/homeViewModel"
import styles from './index.module.css'

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {

  const onAddNewNoteClickModal = (): ModalProps => {
    const onCancelClick = viewModel.onModalCancelClick
    const onConfirmClick = viewModel.onModalConfirmClick
    const title = 'Add new Todo item'
    const confirmTitle = 'Add'
    const cancelTitle = 'Cancel'

    const body =
      <form className="flex flex-col gap-2">
        <label className="text-sm">Title*</label>
        <input id="title" type={'text'} className="appearance-none border rounded py-1 px-3 leading-tight focus:outline-none focus:shadow-outline" />
        <label className="text-sm">Description</label>
        <input id="description" type={'text'} className="appearance-none border rounded py-1 px-3 leading-tight focus:outline-none focus:shadow-outline" />
      </form>

    return {
      body,
      cancelTitle,
      confirmTitle,
      onCancelClick,
      onConfirmClick,
      title,
      modalType: ModalType.ADD_NOTE_MODAL
    }
  }

  const deleteNoteModal = (): ModalProps => {
    const onCancelClick = viewModel.onModalCancelClick
    const onConfirmClick = viewModel.onModalConfirmClick
    const title = ''
    const confirmTitle = 'Yes, I\'m sure'
    const cancelTitle = 'No, cancel'

    const body =
      <div className="p-6 text-center">
        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this note?</h3>
      </div>

    return {
      body,
      cancelTitle,
      confirmTitle,
      onCancelClick,
      onConfirmClick,
      title,
      modalType: ModalType.DELETE_NODE_MODAL
    }
  }

  const modalFactory = (modalType: ModalType) => {
    let modalProps

    switch (modalType) {
      case ModalType.ADD_NOTE_MODAL: {
        modalProps = onAddNewNoteClickModal()
        break
      }
      case ModalType.DELETE_NODE_MODAL: {
        modalProps = deleteNoteModal()
        break
      }
      default: {
        modalProps = onAddNewNoteClickModal()
        break
      }
    }

    return <Modal
      onCancelClick={modalProps.onCancelClick}
      onConfirmClick={modalProps.onConfirmClick}
      title={modalProps.title}
      confirmTitle={modalProps.confirmTitle}
      cancelTitle={modalProps.cancelTitle}
      body={modalProps.body}
      modalType={modalProps.modalType}
    />
  }

  return (
    <>
      {
        viewModel.showModal &&
          viewModel.showModal.ADD_NOTE_MODAL ?
          <div className="absolute w-screen h-screen">
            {modalFactory(ModalType.ADD_NOTE_MODAL)}
          </div>
          : viewModel.showModal.DELETE_NODE_MODAL ?
            <div className="absolute w-screen h-screen">
              {modalFactory(ModalType.DELETE_NODE_MODAL)}
            </div> : null
      }

      <div className="container mx-auto my-1">
        <div className="flex justify-end">
          <Button content="Add" onClick={viewModel.onAddNewNoteClick} />
        </div>
        <div className={styles.table_container}>
          {
            viewModel.tableItems.headers.length !== 0 ?
              <Table key={'table'} headers={viewModel.tableItems.headers} body={viewModel.tableItems.body} onDeleteClick={viewModel.onDeleteNoteClick} />
              :
              <p>No data.</p>
          }
        </div>
      </div>
    </>
  )
}

export default HomeView

