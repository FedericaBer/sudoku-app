import SudokuBoard from "./components/Board"
import { createInitialGrid, getRandomPuzzle } from "./utils/sudokuUtils"
import { useState } from "react"
import StartScreen from "./components/StartScreen"


const App = () => {
  const [initialGrid, setInitialGrid] = useState(null)
  const [currentGrid, setCurrentGrid] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const updatedGrid = currentGrid.map((row) => [...row])

    updatedGrid[rowIndex][colIndex] = newValue

    setCurrentGrid(updatedGrid)
  }

  const handleGameStart = (difficulty) =>{
    console.log(difficulty)
    const newGrid = createInitialGrid(getRandomPuzzle(difficulty))
    setInitialGrid(newGrid)
    setCurrentGrid(newGrid)
    setGameStarted(true)
  }

  return (
    <>
      {gameStarted === true ? (
        <SudokuBoard
          grid = {currentGrid}
          initialGrid = {initialGrid}
          onCellChange = {handleCellChange}
        />
      ) : ( 
        <StartScreen
          onStartGame = {handleGameStart}
        />
      )}
    </>
    
  )
}

export default App
