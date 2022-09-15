import { Fragment } from "react"
import { IUseHomeViewModel } from "../viewModels/homeViewModel"

type HomeViewProps = {
  viewModel: IUseHomeViewModel
}

const HomeView = ({ viewModel }: HomeViewProps) => {
  return <>
    {viewModel.todoItems.length > 0 && viewModel.todoItems.map(item => {
      return (
        <Fragment key={item.id}>
          <p>{item.id}</p>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.createdAt}</p>
          <p>{item.updatedAt}</p>
          <p>{item.deletedAt}</p>
        </Fragment>
      )
    })}
  </>
}

export default HomeView

