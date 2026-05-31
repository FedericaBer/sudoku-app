import { puzzles } from "./puzzles";    

export const getPuzzleById = (id) => {
    const puzzleId = puzzles.find((puzzle) => puzzle.id === id)
    return puzzleId
}

export const getRandomPuzzle = (difficulty) =>{
    const filteredPuzzles = puzzles.filter((puzzle) => puzzle.difficulty === difficulty)
    const randomIndex = getRandomInt(0, filteredPuzzles.length)
    return filteredPuzzles[randomIndex]
}

export const createInitialGrid = (puzzle) =>{
    const puzzleString = puzzle.puzzle
    const gridArray = []
    for(let i = 0; i < 81; i += 9){
        const gridRowString = puzzleString.slice(i, i + 9)
        const gridRowArray = gridRowString.split('')
        gridArray.push(gridRowArray)
    }
    return gridArray
}

export const createGridSolution = (puzzle) =>{
    const puzzleString = puzzle.solution
    const gridArray = []
    for(let i = 0; i < 81; i += 9){
        const gridRowString = puzzleString.slice(i, i + 9)
        const gridRowArray = gridRowString.split('')
        gridArray.push(gridRowArray)
    }
    return gridArray
}

export const isCellFixed = (grid, rowIndex, colIndex) => {
    return grid[rowIndex][colIndex] !== "0" 
}

export const isGridCorrect = (currentGrid, solutionGrid) => {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j ++){
            if (currentGrid[i][j] !== solutionGrid[i][j]) return false
        }
    }
    return true
}

export const isGridComplete = (currentGrid) =>{
    for(let i = 0; i < currentGrid.length; i++){
        for (let j = 0; j < 9; j ++){
            if (currentGrid[i][j] === "0") return false
        }
    }
    return true
}

const getRandomInt = (min,max) =>{
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}