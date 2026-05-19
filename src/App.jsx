import SudokuBoard from "./components/Board"
import { createInitialGrid, getRandomPuzzle } from "./utils/sudokuUtils"
import { useState } from "react"

const App = () => {
  const [initialGrid] = useState(() => { //this only runs once because the value useState gets is the initial value in react
    const randomPuzzle = getRandomPuzzle("medium")
    return createInitialGrid(randomPuzzle)
  })

  const [currentGrid, setCurrentGrid] = useState(initialGrid)

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const updatedGrid = currentGrid.map((row) => [...row])

    updatedGrid[rowIndex][colIndex] = newValue

    setCurrentGrid(updatedGrid)
  }

  return (
    <SudokuBoard
      grid={currentGrid}
      initialGrid={initialGrid}
      onCellChange={handleCellChange}
    />
  )
}

export default App
