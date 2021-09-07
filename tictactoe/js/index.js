const choosePlayer = document.querySelector('.choose-container')
const subContainer = document.querySelector('.sub-container')
const playerX = document.querySelector('.choose.playerX')
const playerO = document.querySelector('.choose.playerO')
const cells = Array.from(document.querySelectorAll('.cell'))
const turnDisplay = document.querySelector('.display.player-turn')
const playerDisplay = document.querySelector('.display-player')
const winningPlayer = document.querySelector('.display.winner')
const resetButton = document.querySelector('.reset-button')
const winningLine = Array.from(document.querySelectorAll('.line'))
const dimLight = document.querySelector('.dim-light')

let boardState = ['', '', '', // board state in 3 by 3
                  '', '', '', // we will fill the array
                  '', '', '']
let currentPlayer = ''
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

// Set the first player
firstPlayer(playerX, 'X')
firstPlayer(playerO, 'O')

function firstPlayer(player, symbol) {
  player.addEventListener('click', function() {
    currentPlayer = symbol
    choosePlayer.classList.add('hidden')
    subContainer.style.display = "flex"
  }) 
}

TicTacToe()

// Looping through the array of cells that the cell has been clicked
function TicTacToe() {
  cells.forEach(function(cell, index) {
    cell.addEventListener('click', function(){
      if(isValid(cell) && gameActive === true) {
        cell.classList.add(currentPlayer)
        boardState[index] = currentPlayer
        resultValid()
        playerChange()
      }
    })
  })
}

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
      // looping through all cell children so you can highlight them
      for (let j = 0; j <= 2; j++) {
        const nCell = 
          document.querySelector(`.cell:nth-child(${winningMoves[i][j]+1})`)
        nCell.style.zIndex = '4'
      }
      winningLine[i].classList.remove('hidden')
      winningLine[i].classList.add(`line-shadow${currentPlayer}`)
      roundWon = true;
      break
    }
  }

  // Just announcing who wins
  if (roundWon === true) {
    if(currentPlayer === 'X') {
      whoWon('X')
    } else {
      whoWon('O')
    }
    gameActive = false
    return
  }

  // includes means getting a certain variable within the array
  if (!boardState.includes('')){ // so if any of the array is 'NOT' empty
    whoWon()
  }
}

// Function to refactor winning messages
function whoWon(player) {
  if (player === 'X'){
    winningPlayer.innerHTML = 
      'Player <span class="display-player playerX">X</span> Won'
  } else if (player === 'O') {
    winningPlayer.innerHTML = 
      'Player <span class="display-player playerO">O</span> Won'
  } else {
    winningPlayer.innerHTML = 'Tie'
  }
  winningPlayer.classList.remove('hidden')
  dimLight.classList.remove('hidden')
  turnDisplay.classList.add('hidden')
}

// Returning true or false for validating if there's already a text inside the cell
function isValid(cell) {
  if (cell.classList.contains('X') || cell.classList.contains('O')){
    return false
  }
  return true
}

// Player changing between X and O
function playerChange() {
  if (currentPlayer === 'X') {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = 'O'
    playerDisplay.classList.add(`player${currentPlayer}`)
  } else {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = 'X'
    playerDisplay.classList.add(`player${currentPlayer}`)
  }
  playerDisplay.innerHTML = currentPlayer
}

// Restarting the game and the array of the board
function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', '']
  gameActive = true
  winningPlayer.classList.add('hidden')
  turnDisplay.classList.remove('hidden')
  dimLight.classList.add('hidden')
  choosePlayer.classList.remove('hidden')
  subContainer.style.display = "none"

  if (currentPlayer === 'O') {
    playerChange()
  }

  cells.forEach(function(cell) {
    cell.classList.remove('X')
    cell.classList.remove('O')
  })
  winningLine.forEach(function(line) {
    line.classList.add('hidden')
    line.classList.remove('line-shadowX')
    line.classList.remove('line-shadowO')
  })

  for (let i = 1; i <= 9; i++) {
    const nCell = document.querySelector(`.cell:nth-child(${i})`)
    nCell.style.zIndex = '2'
  }
}
resetButton.addEventListener('click', restartGame)