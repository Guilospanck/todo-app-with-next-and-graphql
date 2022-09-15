// useCases
import { NextPage } from "next"
import GetTodoItemsUsecase from "../../lib/home/useCases/getTodoItemsUsecase"

// viewModels
import useHomeViewModel from "../../lib/home/viewModels/homeViewModel"

// views
import HomeView from "../../lib/home/views"

const Home: NextPage = () => {
  const getTodoItemsUsecase = GetTodoItemsUsecase()
  const viewModel = useHomeViewModel({ getTodoItemsUsecase })

  return <HomeView viewModel={viewModel} />
}

export default Home