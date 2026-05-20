const StartScreen = ({onStartGame}) =>{
           
    return (
        <div className="start-screen">
            <h1 className="start-title">Sudoku</h1>
            <div className="difficulty-buttons">
                <button className="difficulty-button easy" onClick={() => onStartGame("easy")}>
                    Easy
                </button>

                <button className="difficulty-button medium" onClick={() => onStartGame("medium")}>
                    Medium
                </button>

                <button className="difficulty-button hard" onClick={() => onStartGame("hard")}>
                    Hard
                </button>
            </div>
        </div>
    )
}
export default StartScreen