const Cell = ({value, cellNotes, notesMode, rowIndex, colIndex, onCellChange, isFixed}) => {
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

    const hasValue = value !== "0"
    const hasNotes = cellNotes && cellNotes.length > 0

    return (
        <div className={className}>
            {!hasValue && hasNotes && (
                <div className="cell-notes">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => {
                    return (
                    <span className="cell-note" key={number}>
                        {cellNotes.includes(number) ? number : ""}
                    </span>
                    )
                })}
                </div>
            )}

            <input
                className="sudoku-input"
                value={value === "0" ? "" : value}
                onChange={handleInputChange}
                disabled={isFixed}
                maxLength={1}
            />
            </div>
  )
}

export default Cell