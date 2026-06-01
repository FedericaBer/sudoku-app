import SudokuBoard from "./components/Board"
import { createInitialGrid, createGridSolution, createEmptyNotesGrid, getRandomPuzzle, isGridComplete, isGridCorrect } from "./utils/sudokuUtils"
import { useState } from "react"
import StartScreen from "./components/StartScreen"


const App = () => {
  const [initialGrid, setInitialGrid] = useState(null)
  const [currentGrid, setCurrentGrid] = useState(null)
  const [solutionGrid, setSolutionGrid] = useState(null)
  const [notesGrid, setNotesGrid] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [notesMode, setNotesMode] = useState(false)

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    if (notesMode) {
      if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(newValue)) {
        return
      }

      const updatedNotesGrid = notesGrid.map((row) => [...row])
      const currentNotes = updatedNotesGrid[rowIndex][colIndex]

      let newNotes

      if (currentNotes.includes(newValue)) {
        newNotes = currentNotes.filter((note) => note !== newValue)
      } else {
        newNotes = [...currentNotes, newValue]
      }

      updatedNotesGrid[rowIndex][colIndex] = newNotes
      setNotesGrid(updatedNotesGrid)

      return
    }

    const updatedGrid = currentGrid.map((row) => [...row])
    updatedGrid[rowIndex][colIndex] = newValue

    const updatedNotesGrid = notesGrid.map((row) => [...row])
    updatedNotesGrid[rowIndex][colIndex] = []
    setNotesGrid(updatedNotesGrid)

    setCurrentGrid(updatedGrid)

    if (isGridComplete(updatedGrid) && isGridCorrect(updatedGrid, solutionGrid)) {
      setGameWon(true)
    }
  }

  const handleGameStart = (difficulty) =>{
    console.log(difficulty)
    const randomPuzzle = getRandomPuzzle(difficulty)
    const newGrid = createInitialGrid(randomPuzzle)
    const solutionGrid = createGridSolution(randomPuzzle)
    const newNotesGrid = createEmptyNotesGrid()
    setInitialGrid(newGrid)
    setCurrentGrid(newGrid)
    setSolutionGrid(solutionGrid)
    setGameStarted(true)
    setNotesGrid(newNotesGrid)
  }

  const handleRestartGame = () => {
    setGameWon(false)
    setGameStarted(false)
    setInitialGrid(null)
    setSolutionGrid(null)
    setCurrentGrid(null)
    setNotesMode(false)
    setNotesGrid(null)
  }
  
  const handleToggleNotesMode = () => {
    if(notesMode){
      setNotesMode(false)
    }else setNotesMode(true)
  }

  let className = "notes-button"

  if(notesMode){
    className += " selected"
  }else{
    className += " not-selected"
  }

  return (
    <>
      {gameStarted === true ? (
        <>
          <div className="game-area">
            <SudokuBoard
              grid={currentGrid}
              initialGrid={initialGrid}
              notesGrid={notesGrid}
              notesMode={notesMode}
              onCellChange={handleCellChange}
            />

            <div className="game-controls">
              <div className={className}>
                <button onClick={handleToggleNotesMode}>Notes</button>
              </div>

              <div className="restart-button">
                <button onClick={handleRestartGame}>I give up</button>
              </div>
            </div>

          </div>

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
