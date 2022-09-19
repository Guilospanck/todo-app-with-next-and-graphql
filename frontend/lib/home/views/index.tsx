import { IUseHomeViewModel } from "../viewModels/homeViewModel"
import styles from './index.module.css'

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {
  return (
    <div className="overflow-x-auto relative">
      <table key={'table'} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className={styles.default_td_th}>ID</th>
            <th scope="col" className={styles.default_td_th}>Title</th>
            <th scope="col" className={styles.default_td_th}>Description</th>
            <th scope="col" className={styles.default_td_th}>Created at</th>
            <th scope="col" className={styles.default_td_th}>Updated at</th>
            <th scope="col" className={styles.default_td_th}>Deleted at</th>
          </tr>
        </thead>
        <tbody>
          {
            viewModel.todoItems.length > 0 && viewModel.todoItems.map(item => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className={styles.default_td_th}>{item.id}</td>
                  <td className={`${styles.default_text} ${styles.default_td_th}`}>{item.title}</td>
                  <td className={styles.default_td_th}>{item.description}</td>
                  <td className={styles.default_td_th}>{item.createdAt}</td>
                  <td className={styles.default_td_th}>{item.updatedAt}</td>
                  <td className={styles.default_td_th}>{item.deletedAt}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default HomeView

