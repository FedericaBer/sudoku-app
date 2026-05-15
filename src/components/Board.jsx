import Cell from "./Cell"

const SudokuBoard = ({ grid }) => { //react component with big S
  const getCellKey = (rowIndex, colIndex) => {
    return `${rowIndex}-${colIndex}`
  }

  const renderCell = (cellValue, rowIndex, colIndex) => {
    return (
      <Cell //a new react component with props: value, rowindex, colindex
        key={getCellKey(rowIndex, colIndex)} //this isn't a prop, react uses it internally to know which item is which
        value={cellValue}
        rowIndex={rowIndex}
        colIndex={colIndex}
      />
    )
  }

  const renderRow = (row, rowIndex) => {
    return (
      <div className="sudoku-row" key={rowIndex}>
        {row.map((cellValue, colIndex) => {
          return renderCell(cellValue, rowIndex, colIndex)
        })}
      </div>
    )
  }

  return (
    <div className="sudoku-board">
      {grid.map((row, rowIndex) => {
        return renderRow(row, rowIndex)
      })}
    </div>
  )
}

export default SudokuBoard
