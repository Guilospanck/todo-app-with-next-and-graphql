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
          <h1 className="text-3xl font-bold underline">{item.title}</h1>
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

