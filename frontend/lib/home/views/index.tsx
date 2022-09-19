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
            <th scope="col" className="py-3 px-6">ID</th>
            <th scope="col" className="py-3 px-6">Title</th>
            <th scope="col" className="py-3 px-6">Description</th>
            <th scope="col" className="py-3 px-6">Created at</th>
            <th scope="col" className="py-3 px-6">Updated at</th>
            <th scope="col" className="py-3 px-6">Deleted at</th>
          </tr>
        </thead>
        <tbody>
          {
            viewModel.todoItems.length > 0 && viewModel.todoItems.map(item => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-3 px-6">{item.id}</td>
                  <td className={`${styles.default_text} py-3 px-6`}>{item.title}</td>
                  <td className="py-3 px-6">{item.description}</td>
                  <td className="py-3 px-6">{item.createdAt}</td>
                  <td className="py-3 px-6">{item.updatedAt}</td>
                  <td className="py-3 px-6">{item.deletedAt}</td>
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

