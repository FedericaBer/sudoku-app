import csv from "csv-parser"
import fs from "fs"

const readCsvFile = (filePath) => {

    const datasetPuzzles = [];

    return new Promise(function(resolve, reject){
        fs.createReadStream(filePath) //to read piece by piece and not loading the entire file at once
            .pipe(csv())
            .on('data', (row) =>{ //'data' is an event
                datasetPuzzles.push({
                    puzzle: row.puzzle,
                    solution: row.solution
                });
            })
            .on('end', () => {
                resolve(datasetPuzzles);
            })
            .on('error', (error) => {
                reject(error)
            });
    })    
}

const countGivenNumbers = (puzzleString) => {
    let countNumbersGiven = 0;
    for (let i = 0; i < puzzleString.length; i++){
        if(puzzleString[i] !== '0') countNumbersGiven++;
    }
    return countNumbersGiven;
}

const getDifficulty = (puzzleString) => {
    const numbersGiven = countGivenNumbers(puzzleString);
    let difficultyLevel = "";
    if(numbersGiven > 37){
        difficultyLevel = "easy";
    } else if (numbersGiven < 27){
        difficultyLevel = "hard";
    } else {
        difficultyLevel = "medium"
    }
    return difficultyLevel
}

const createPuzzleObject = (csvRow, id) => {
    const puzzle = {
        id: id,
        difficulty: getDifficulty(csvRow.puzzle),
        puzzle: csvRow.puzzle,
        solution: csvRow.solution,
    };
    return puzzle;
}

const selectPuzzlesByDifficulty = (puzzleObjects, amountPerDifficulty) =>{
    const selectedPuzzles = {
        easy: [],
        medium: [],
        hard: [],
    }

    for (let i = 0; i < puzzleObjects.length; i++) {
        const puzzle = puzzleObjects[i]
        const difficulty = puzzle.difficulty
        if (
        selectedPuzzles[difficulty] &&
        selectedPuzzles[difficulty].length < amountPerDifficulty
        ) {
        selectedPuzzles[difficulty].push(puzzle)
        }
        if (
        selectedPuzzles.easy.length === amountPerDifficulty &&
        selectedPuzzles.medium.length === amountPerDifficulty &&
        selectedPuzzles.hard.length === amountPerDifficulty
        ) {
        break
        }
    }

    return selectedPuzzles

}

const formatAsJavaScriptFile = (selectedPuzzles) => {
    const formattedPuzzles = JSON.stringify(selectedPuzzles, null, 2);
    const fileContent = `export const puzzles = ${formattedPuzzles};`
    return fileContent;
}

const writePuzzlesFile = (outputPath, fileContent) => {
    fs.writeFileSync(outputPath, fileContent, "utf8");
}

const main = async () => {
    const filePath = "src/data/sudoku.csv";
    const arraySudokus = await readCsvFile(filePath);
    let arrayObjectSudokus = [];
    for (let i = 0; i < arraySudokus.length; i ++){
        let objectPuzzle = createPuzzleObject(arraySudokus[i], i);
        arrayObjectSudokus.push(objectPuzzle);
    }
    const puzzlesByDifficulty = selectPuzzlesByDifficulty(arrayObjectSudokus, 150);
    const allSelectedPuzzles = [
    ...puzzlesByDifficulty.easy,
    ...puzzlesByDifficulty.medium,
    ...puzzlesByDifficulty.hard,
    ]

  const puzzleFile = formatAsJavaScriptFile(allSelectedPuzzles)

  writePuzzlesFile("src/utils/puzzles.js", puzzleFile)
}

main()