const choosePlayer = document.querySelector('.choose-container')
const subContainer = document.querySelector('.sub-container')
const playerX = document.querySelector('.choose.playerX')
const playerO = document.querySelector('.choose.playerO')
const cells = Array.from(document.querySelectorAll('.cell'))
const turnDisplay = document.querySelector('.display.player-turn')
const playerDisplay = document.querySelector('.display-player')
const winningPlayer = document.querySelector('.display.winner')
const resetButton = document.querySelector('.reset-button')
const prevButton = document.querySelector('#prev-button')
const nextButton = document.querySelector('#next-button')
const winningLine = Array.from(document.querySelectorAll('.line'))
const dimLight = document.querySelector('.dim-light')

let boardState = ['', '', '', // board state in 3 by 3
                  '', '', '', // we will fill the array
                  '', '', '']
let storedMoves = [] // storing player for move history
let storedIndex = [] // storing index for move history
let winningIndex = 0
let moveCount = -1
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
    playerDisplay.classList.add(`player${symbol}`)
    playerDisplay.innerHTML = symbol
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
        moveHistory(currentPlayer, index)
        moveCount++
        playerChange()
      }
    })
    cell.addEventListener('mouseenter', function(){
      if(currentPlayer === 'X'){
        cell.style.boxShadow = 'inset 0 0 .3rem .3rem var(--color-1)'
      } else {
        cell.style.boxShadow = 'inset 0 0 .3rem .3rem var(--color-4)'
      }
    })
    cell.addEventListener('mouseleave', function(){
      cell.style.boxShadow = ''
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
      winningIndex = i
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
    winningPlayer.style.color = 'white'
  }
  winningPlayer.classList.remove('hidden')
  dimLight.classList.remove('hidden')
  turnDisplay.classList.add('hidden')
  showHistoryButtons()
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

function showHistoryButtons(){
  prevButton.classList.remove('hidden')
  nextButton.classList.remove('hidden')
  nextButton.style.pointerEvents = 'none'
  console.log(winningIndex)
}

function moveHistory(player, index) {
  storedMoves.push(player)
  storedIndex.push(index)
}

function previousBtn() {
  if(moveCount === 1) prevButton.style.pointerEvents = 'none' //prevButton.disabled = true
  if(moveCount > 0){
    cells[storedIndex[moveCount]].classList.remove(storedMoves[moveCount])
    moveCount--
    nextButton.style.pointerEvents = 'auto'
  }
  dimLight.classList.add('hidden')
  winningLine[winningIndex].classList.add('hidden')

}

function nextBtn() {
  if(moveCount === storedMoves.length-2){
    nextButton.style.pointerEvents = 'none'
    dimLight.classList.remove('hidden')
    if(winningIndex > 0){
      winningLine[winningIndex].classList.remove('hidden')
    }
  }
  if (moveCount <= storedMoves.length){
    moveCount++
    cells[storedIndex[moveCount]].classList.add(storedMoves[moveCount])
    prevButton.style.pointerEvents = 'auto'
  }
}

// Restarting the game and the array of the board
function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', '']
  gameActive = true
  storedMoves = []
  storedIndex = []
  winningIndex = 0
  moveCount = -1

  winningPlayer.classList.add('hidden')
  turnDisplay.classList.remove('hidden')
  choosePlayer.classList.remove('hidden')
  dimLight.classList.add('hidden')
  subContainer.style.display = "none"
  prevButton.style.pointerEvents = 'auto'

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
prevButton.addEventListener('click', previousBtn)
nextButton.addEventListener('click', nextBtn)