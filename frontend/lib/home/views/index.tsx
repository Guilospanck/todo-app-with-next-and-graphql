import { IUseHomeViewModel } from "../viewModels/homeViewModel"
import styles from './index.module.css'

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {
  return (
    <table key={'table'} className="table-auto w-full">
      <thead className="table-header-group">
        <tr className="table-row-group">
          <th className="table-cell">ID</th>
          <th className="table-cell">Title</th>
          <th className="table-cell">Description</th>
          <th className="table-cell">Created at</th>
          <th className="table-cell">Updated at</th>
          <th className="table-cell">Deleted at</th>
        </tr>
      </thead>
      <tbody>
        {
          viewModel.todoItems.length > 0 && viewModel.todoItems.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td className={styles.default_text}>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td>{item.deletedAt}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default HomeView

