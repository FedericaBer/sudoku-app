import SudokuBoard from "./components/Board"
import { createInitialGrid, getRandomPuzzle } from "./utils/sudokuUtils"

const App = () =>{

  const randomPuzzle = getRandomPuzzle("medium")
  const randomGrid = createInitialGrid(randomPuzzle)
  return <SudokuBoard grid={randomGrid} />

}

export default App