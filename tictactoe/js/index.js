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
    cell.innerHTML = currentPlayer
    boardState[index] = currentPlayer
    resultValid()
    playerChange()
  })
})

// Validation if the game is over or won by whoever
function resultValid() {

}

// Player changing between X and O
function playerChange() {

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