const Cell = ({value, rowIndex, colIndex}) => {
    return (
        <div className="sudoku-cell">
            {value === "0" ? "" : value}
        </div>
  )
}

export default Cell //so that Board.jsx can use it