import Button from "../../../components/button"
import Modal from "../../../components/modal"
import Table from "../../../components/table"
import { IUseHomeViewModel } from "../viewModels/homeViewModel"
import styles from './index.module.css'

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {
  return (
    <>
      {
        viewModel.showModal &&
        <div className="absolute w-screen h-screen">
          <Modal onCancelClick={viewModel.onModalCancelClick} onConfirmClick={viewModel.onModalConfirmClick} />
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

