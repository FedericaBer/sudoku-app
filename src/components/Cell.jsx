const Cell = ({value, rowIndex, colIndex, onCellChange, isFixed}) => {
    let className = "sudoku-cell"

    const handleInputChange = (event) =>{
        if (isFixed) return 

        const userInput = event.target.value

        if (userInput === "") {
        onCellChange(rowIndex, colIndex, "0")
        return
        }

        if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(userInput)) {
        return
        }

        onCellChange(rowIndex, colIndex, userInput)
        
    }

    if (colIndex === 2 || colIndex === 5) {
        className += " thick-right"
    }

    if(isFixed){
        className += " fixed-cell"
    }

    if (rowIndex === 2 || rowIndex === 5) {
        className += " thick-bottom"
    }

    return (
        <div className={className}>
            <input //creates an input field inside the cell
                className="sudoku-input"
                value={value === "0" ? "" : value}
                onChange={handleInputChange}
                disabled={isFixed} //if isFixed is true, the user cannot edit this input
                maxLength={1} //prevents the user from typing more than one character.
            />
        </div>
  )
}

export default Cell //so that Board.jsx can use it