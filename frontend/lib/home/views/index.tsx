import Table from "../../../components/table"
import { IUseHomeViewModel } from "../viewModels/homeViewModel"
import styles from './index.module.css'

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {
  return (
    <div className="overflow-x-auto relative">
      <Table key={'table'} headers={viewModel.tableItems.headers} body={viewModel.tableItems.body} />
    </div>
  )
}

export default HomeView

