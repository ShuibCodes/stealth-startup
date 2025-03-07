// Configuration for the Tic Tac Toe game

const gameConfig = {
  // Initial HTML content
  getInitialHtml: () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
</head>
<body>
    <div class="game">
        <h1 class="title">Tic Tac Toe</h1>
        <div id="status">Player X's turn</div>
        <div class="board">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
        <button id="reset">Reset Game</button>
    </div>
</body>
</html>`,

  // Initial CSS content
  getInitialCss: () => `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #333;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-10px);
  transition: transform 0.3s ease;
}

.game:hover {
  transform: translateY(-15px);
}

.title {
  color: #6e48aa;
  font-size: 1.8rem;
  margin-bottom: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

#status {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
  background-color: #f8f9fa;
  padding: 8px 15px;
  border-radius: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(3, 80px);
  gap: 6px;
  background-color: #6e48aa;
  padding: 6px;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cell {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.cell:hover {
  background-color: #f0f0f0;
  transform: scale(1.02);
}

/* X styling */
.cell.x::before,
.cell.x::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 60px;
  background-color: #e74c3c;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(231, 76, 60, 0.5);
}

.cell.x::before {
  transform: rotate(45deg);
  animation: fadeIn 0.2s ease-in-out;
}

.cell.x::after {
  transform: rotate(-45deg);
  animation: fadeIn 0.2s ease-in-out 0.1s;
}

/* O styling */
.cell.o::before {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 8px solid #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

#reset {
  padding: 8px 20px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
  margin-top: 8px;
}

#reset:hover {
  background: linear-gradient(135deg, #5a7cf7, #9561dc);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

#reset:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}`,

  // Initial JS content
  getInitialJs: () => "",

  // Handle code selection specifically for tic-tac-toe
  handleCodeSelect: (option, prevJs) => {
    if (!option) return prevJs;

    // Step 1: Initialize board
    if (option.includes('var board = ["", "", "", "", "", "", "", "", ""]')) {
      const boardCode = `// Step 1: Initialize the game board
var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var cells = document.querySelectorAll(".cell");
var statusDiv = document.getElementById("status");
var resetButton = document.getElementById("reset");`;
      return boardCode;
    }

    // Step 2: Select DOM elements
    if (option.includes('var cells = document.querySelectorAll(".cell")')) {
      return prevJs;
    }

    // Step 3: Add click events
    if (option.includes('cell.addEventListener("click"')) {
      const clickEventsCode = `${prevJs}

// Step 3: Add click events to cells
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(index));
});`;
      return clickEventsCode;
    }

    // Step 4: Handle move function
    if (option.includes("function handleMove(index)")) {
      const handleMoveCode = `${prevJs}

// Step 4: Handle player moves
function handleMove(index) {
  // Only proceed if the cell is empty
  if (board[index] === "") {
    // Update board data
    board[index] = currentPlayer;
    
    // Update cell display
    cells[index].classList.add(currentPlayer.toLowerCase());
    
    // Check if game is over
    if (checkWinner()) {
      statusDiv.textContent = "Player " + currentPlayer + " wins!";
      // Disable further moves
      disableCells();
    } else if (board.every(cell => cell !== "")) {
      // Check for tie
      statusDiv.textContent = "It's a tie!";
    } else {
      // Switch turns and update status
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDiv.textContent = "Player " + currentPlayer + "'s turn";
    }
  }
}`;
      return handleMoveCode;
    }

    // Step 5: Alternate turns
    if (option.includes('currentPlayer = currentPlayer === "X" ? "O" : "X"')) {
      return prevJs;
    }

    // Step 6: Check winner
    if (option.includes("winningCombos")) {
      const checkWinnerCode = `${prevJs}

// Step 6: Check for a winner
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

function checkWinner() {
  return winningCombos.some(combo => 
    board[combo[0]] && 
    board[combo[0]] === board[combo[1]] && 
    board[combo[0]] === board[combo[2]]
  );
}

// Helper function to disable all cells
function disableCells() {
  cells.forEach(cell => {
    cell.style.pointerEvents = "none";
  });
}`;
      return checkWinnerCode;
    }

    // Step 7: Update status
    if (option.includes('statusDiv.textContent = "Winner: "')) {
      return prevJs;
    }

    // Step 8: Reset game
    if (option.includes("function resetGame()")) {
      const resetGameCode = `${prevJs}

// Step 8: Reset the game
resetButton.addEventListener("click", resetGame);

function resetGame() {
  // Reset board data
  board.fill("");
  
  // Reset UI
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.style.pointerEvents = "auto";
  });
  
  // Reset game state
  currentPlayer = "X";
  statusDiv.textContent = "Player X's turn";
}`;
      return resetGameCode;
    }

    return prevJs;
  }
};

export default gameConfig; 