import { useEffect, useState } from "react";

// Box component for rendering individual cells
const Box = ({ text, onClick }) => (
  <button className="box" onClick={onClick}>
    {text}
  </button>
);

// Function to generate winning patterns based on board size
const getWinningPatterns = (size) => {
  let patterns = [];

  // Rows
  for (let i = 0; i < size; i++) {
    let rowPattern = [];
    for (let j = 0; j < size; j++) {
      rowPattern.push(i * size + j);
    }
    patterns.push(rowPattern);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    let columnPattern = [];
    for (let j = 0; j < size; j++) {
      columnPattern.push(j * size + i);
    }
    patterns.push(columnPattern);
  }

  // Left-to-right diagonal
  let leftToRightDiagonal = [];
  for (let i = 0; i < size; i++) {
    leftToRightDiagonal.push(i * (size + 1));
  }
  patterns.push(leftToRightDiagonal);

  // Right-to-left diagonal
  let rightToLeftDiagonal = [];
  for (let i = 0; i < size; i++) {
    rightToLeftDiagonal.push((i + 1) * (size - 1));
  }
  patterns.push(rightToLeftDiagonal);

  return patterns;
};

// Board component to manage the game state and render the board
const Board = ({ size }) => {
  let total = size * size;
  const [board, setBoard] = useState(new Array(total).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // Generate winning patterns for the board
  const winningPatterns = getWinningPatterns(size);

  // Handle a player's move
  const handleClick = (index) => {
    if (board[index] !== null || winner) return; // Prevent making a move if the cell is occupied or the game is over
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // Check if there is a winner
  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [first, ...rest] = pattern;
      if (
        board[first] &&
        rest.every((index) => board[index] === board[first])
      ) {
        setWinner(board[first]);
        return;
      }
    }
  };

  // Check for a winner whenever the board changes
  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <div className="game-container">
      {winner && <p>{winner} is the winner!</p>} {/* Display the winner */}
      <div
        className="board-container"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {board.map((value, index) => (
          <Box
            key={index}
            text={value || ""}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
