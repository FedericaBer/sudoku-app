import SudokuBoard from "./components/Board"
import { createInitialGrid, createGridSolution, getRandomPuzzle, isGridComplete, isGridCorrect } from "./utils/sudokuUtils"
import { useState } from "react"
import StartScreen from "./components/StartScreen"


const App = () => {
  const [initialGrid, setInitialGrid] = useState(null)
  const [currentGrid, setCurrentGrid] = useState(null)
  const [solutionGrid, setSolutionGrid] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const updatedGrid = currentGrid.map((row) => [...row])

    updatedGrid[rowIndex][colIndex] = newValue

    setCurrentGrid(updatedGrid)

    if (isGridComplete(updatedGrid) && isGridCorrect(updatedGrid, solutionGrid)) setGameWon(true)
  }

  const handleGameStart = (difficulty) =>{
    console.log(difficulty)
    const randomPuzzle = getRandomPuzzle(difficulty)
    const newGrid = createInitialGrid(randomPuzzle)
    const solutionGrid = createGridSolution(randomPuzzle)
    setInitialGrid(newGrid)
    setCurrentGrid(newGrid)
    setSolutionGrid(solutionGrid)
    setGameStarted(true)
  }

  const handleRestartGame = () => {
    setGameWon(false)
    setGameStarted(false)
    setInitialGrid(null)
    setSolutionGrid(null)
    setCurrentGrid(null)
  }

  return (
    <>
      {gameStarted === true ? (
        <>
          <SudokuBoard
            grid={currentGrid}
            initialGrid={initialGrid}
            onCellChange={handleCellChange}
          />

          {gameWon && (
            <div className="popup-backdrop">
              <div className="popup-box">
                <h2>You won!</h2>
                <button onClick={handleRestartGame}>Close</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <StartScreen
          onStartGame={handleGameStart}
        />
      )}
    </>
  )
}

export default App
