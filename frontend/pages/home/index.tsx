import { NextPage } from "next"

// useCases
import GetTodoItemsUsecase from "../../lib/home/useCases/getTodoItemsUsecase"
import CreateUpdateNoteUsecase from "../../lib/home/useCases/createUpdateNoteUsecase"

// viewModels
import useHomeViewModel from "../../lib/home/viewModels/homeViewModel"

// views
import HomeView from "../../lib/home/views"

const Home: NextPage = () => {
  const getTodoItemsUsecase = GetTodoItemsUsecase()
  const createUpdateNoteUsecase = CreateUpdateNoteUsecase()
  const viewModel = useHomeViewModel({ getTodoItemsUsecase, createUpdateNoteUsecase })

  return <HomeView viewModel={viewModel} />
}

export default Home