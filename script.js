// Representation of the game board
let board = ['', '', '', '', '', '', '', '', ''];

// Mapping of HTML cell indices to board positions
const cellIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// Map of possible winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

// DOM elements
const cells = Array.from(document.getElementsByClassName('cell'));
const resultOverlay = document.getElementById('result-overlay');
const resultMessage = document.getElementById('result-message');

// Function to clear the game board
function clearBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', handleHumanTurn);
  });
}

// Function to handle the human player's turn
function handleHumanTurn(event) {
  const cell = event.target;
  const index = cells.indexOf(cell);

  if (board[index] === '') {
    board[index] = 'X';
    cell.innerText = 'X';
    cell.classList.add('x'); 

    if (checkWin('X')) {
      showResult('You win!');
      return;
    }

    if (checkTie()) {
      document.getElementById("result-message").style.fontSize = "3em";
      showResult("It's a draw!");
      return;
    }

    handleBotTurn();
  }
}

// Function to handle the bot's turn
function handleBotTurn() {
  const bestMove = minimax(board, 'O').index;
  const cell = cells[bestMove];

  board[bestMove] = 'O';
  cell.innerText = 'O';
  cell.classList.add('o');

  if (checkWin('O')) {
    showResult('Bot wins!');
    return;
  }

  if (checkTie()) {
    showResult("It's a draw!");
    return;
  }
}

// Function to evaluate the game board state
function evaluate(board) {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === 'O') {
        return 1;
      } else if (board[a] === 'X') {
        return -1;
      }
    }
  }

  return 0;
}

// Function to check if the game ended in a tie
function checkTie() {
  return board.every(cell => cell !== '');
}

// Function to generate all possible moves
function generateMoves(board) {
  const moves = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      moves.push(i);
    }
  }

  return moves;
}

// Recursive function for the Minimax algorithm
function minimax(board, player) {
  const availableMoves = generateMoves(board);

  // Terminal conditions
  if (checkWin('X')) {
    return { score: -1 };
  } else if (checkWin('O')) {
    return { score: 1 };
  } else if (availableMoves.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availableMoves.length; i++) {
    const move = {};
    move.index = availableMoves[i];

    board[availableMoves[i]] = player;

    if (player === 'O') {
      const result = minimax(board, 'X');
      move.score = result.score;
    } else {
      const result = minimax(board, 'O');
      move.score = result.score;
    }

    board[availableMoves[i]] = '';
    moves.push(move);
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// Function to check if a player has won
function checkWin(player) {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

// Function to show the game result popup
function showResult(message) {
  resultMessage.textContent = message;
  resultOverlay.style.visibility = 'visible';
}

// Function to reset the game
function resetGame() {
  resultOverlay.style.visibility = 'hidden';
  clearBoard();
}

// Game initialization
clearBoard();
