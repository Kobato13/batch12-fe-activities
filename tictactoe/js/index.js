const cells = Array.from(document.querySelectorAll('.cell'))
const playerDisplay = document.querySelector('.display-player')
const winningPlayer = document.querySelector('.winner')
const resetButton = document.querySelector('.reset-button')

let boardState = ['', '', '', // board state in 3 by 3
                  '', '', '', // we will fill the array
                  '', '', '']
let currentPlayer = 'X'
let gameActive = true

const winningMoves = [
  [0, 1, 2], // winning row
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // winning column
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // winning diagonally
  [2, 4, 6]
]

// Looping through the array of cells that the cell has been clicked
cells.forEach(function(cell, index) {
  cell.addEventListener('click', function(){
    if(isValid(cell) && gameActive === true){
      cell.innerHTML = currentPlayer
      boardState[index] = currentPlayer
      resultValid()
      playerChange()
    }
  })
})

// Validation if the game is over or won by whoever
function resultValid() {
  let roundWon = false
  for (let i = 0; i <= 7; i++) { // looping through 8 possible winning moves
    const winningMove = winningMoves[i]
    const a = boardState[winningMove[0]] // 1st index of the winning move
    const b = boardState[winningMove[1]] // 2nd index
    const c = boardState[winningMove[2]] // 3rd index
    // if any of the indexes are still empty
    if (a === '' || b === '' || c === '') {
      continue
    }
    if (a === b && b === c) { // if a, b and c have the same 'X' or 'O'
      roundWon = true;
      break
    }
  }
  
  // Just announcing who wins
  if (roundWon === true) {
    if(currentPlayer === 'X') {
      winningPlayer.innerHTML = 'Player <span class="playerO">X</span> Won'
      winningPlayer.classList.remove('hidden')
    } else {
      winningPlayer.innerHTML = 'Player <span class="playerX">O</span> Won'
      winningPlayer.classList.remove('hidden')
    }
    gameActive = false
    return
  }

  // includes means getting a certain variable within the array
  if (!boardState.includes('')){ // so if any of the array is 'NOT' empty
    winningPlayer.innerHTML = 'Tie'
    winningPlayer.classList.remove('hidden')
  }
}

// Player changing between X and O
function playerChange() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O'
  } else {
    currentPlayer = 'X'
  }
  playerDisplay.innerHTML = currentPlayer
}

// Returning true or false for validating if there's already a text inside the cell
function isValid(cell) {
  if (cell.innerHTML === 'X' || cell.innerHTML === 'O'){
    return false
  }
  return true
}

// Restarting the game and the array of the board
function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', '']
  gameActive = true
  winningPlayer.classList.add('hidden')

  if (currentPlayer === 'O') {
    playerChange()
  }

  cells.forEach(function(cell) {
    cell.innerHTML = ''
  })
}
resetButton.addEventListener('click', restartGame)