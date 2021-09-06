const cells = Array.from(document.querySelectorAll('.cell'))
const playerDisplay = document.querySelector('.display-player')
const winningPlayer = document.querySelector('.winner')
const resetButton = document.querySelector('.reset-button')

let boardState = ['', '', '', // board state in 3 by 3
                  '', '', '', // we will fill the array
                  '', '', '']
let currentPlayer = 'X'
let gameActive = true


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

  cells.forEach(function(cell) {
    cell.innerHTML = ''
  })
}
resetButton.addEventListener('click', restartGame)