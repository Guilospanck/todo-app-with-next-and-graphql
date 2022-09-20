import Button from "../../../components/button"
import Modal from "../../../components/modal"
import Table from "../../../components/table"
import { IUseHomeViewModel } from "../viewModels/homeViewModel"
import styles from './index.module.css'

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {

  const modalFactory = () => {
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

    return <Modal
      onCancelClick={onCancelClick}
      onConfirmClick={onConfirmClick}
      title={title}
      confirmTitle={confirmTitle}
      cancelTitle={cancelTitle}
      body={body}
    />
  }

  return (
    <>
      {
        viewModel.showModal &&
        <div className="absolute w-screen h-screen">
          {modalFactory()}
        </div>
      }

      <div className="container mx-auto my-1">
        <div className="flex justify-end">
          <Button content="Add" onClick={viewModel.addNewNote} />
        </div>
        <div className={styles.table_container}>
          <Table key={'table'} headers={viewModel.tableItems.headers} body={viewModel.tableItems.body} />
        </div>
      </div>
    </>
  )
}

export default HomeView

