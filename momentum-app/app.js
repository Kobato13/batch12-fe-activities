const mainContainer = document.querySelector(".main-container")
const container2 = document.querySelector(".container")

const inputForm = document.querySelector("#input-form")
const username = document.querySelector("#username")
const focusForm = document.querySelector("#focus-form")
const mainFocus = document.querySelector("#main-focus")

const setGreetings = document.querySelector(".greetings-container")
const setGreetingName = document.createElement("h1")
const setFocus = document.querySelector(".focus-container")
const setFocusH1 = document.createElement("h1")

const setTime = document.querySelector(".time")

//inputForm.style.display = "block"
inputForm.addEventListener("submit", function(e) {
  e.preventDefault()
  greetings()
})
focusForm.addEventListener("submit", function(e) {
  e.preventDefault()
  focusFunction()
})

function greetings(){
  inputForm.style.display = "none"
  setGreetings.append(setGreetingName)
  setGreetingName.innerHTML = "Hi " + username.value + ", have a great day!"
  setGreetings.style.display = "flex"
  container2.classList.add("fade-in")
  setFocus.style.display = "flex"
  setTime.style.display = "block"
  todoToggle.style.visibility = "visible"
  backgroundToggle.style.visibility = "visible"
  quotesMain.style.visibility = "visible"
}
function focusFunction(){
  focusForm.style.display = "none"
  setFocus.classList.add("fade-in")
  setFocus.append(setFocusH1)
  setFocusH1.innerHTML = "Your main focus for today <br><strong>" 
          + mainFocus.value + "</strong>"
  setFocus.classList.add("fade-in")
}

setInterval(function(){
  let today = new Date()

  let hours = addZero(today.getHours())
  let minutes = addZero(today.getMinutes())
  let seconds = addZero(today.getSeconds())

  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  setTime.innerHTML = "<h1>" + hours + ":" + minutes + " " + ampm + "</h1>"
}, 1000)

function addZero(num) {
  //return num < 10 ? `0${num}` : num
  if (num < 10){
    return '0' + num
  }
  else return num
}

const todoContainer = document.querySelector(".todo-container")
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const todoToggle = document.querySelector(".todo-toggle")
const todoExit = document.querySelector(".todo-exit")

todoToggle.addEventListener('click', function() {
  todoContainer.style.display = "block"
  todoToggle.style.display = "none"
  todoContainer.classList.add("appear")
  todoContainer.classList.remove("disappear2")
})
function ToDoExit(){
  todoContainer.classList.add("disappear2")
    todoContainer.classList.remove("appear")
    //todoContainer.addEventListener('transitionend', function(){
      todoContainer.style.display = "none"
      todoToggle.style.display = "block"
      console.log("fired")
    //})
}
todoExit.addEventListener('click', ToDoExit)
mainContainer.addEventListener('click', ToDoExit)



todoButton.addEventListener('click', function(e) {
  e.preventDefault()
  addTodo()
})
todoList.addEventListener('click', todoCheck)

function addTodo() {
  const newTodo = document.createElement('li')
  newTodo.classList.add("todo-item")

  const completeBtn = document.createElement('button')
  completeBtn.innerHTML = "<i class='fas fa-check'></i>"
  completeBtn.classList.add("todo-complete")
  newTodo.appendChild(completeBtn)

  const todoText = document.createElement('p')
  todoText.innerHTML = todoInput.value
  newTodo.appendChild(todoText)

  const deleteBtn = document.createElement('button')
  deleteBtn.innerHTML = "<i class='fas fa-trash'></i>"
  deleteBtn.classList.add("todo-delete")
  newTodo.appendChild(deleteBtn)

  todoList.append(newTodo)
  todoInput.value = ""
}

function todoCheck(e) {
  const item = e.target

  if(item.classList[0] === 'todo-delete'){
    const todo = item.parentElement
    todo.classList.add("disappear")
    todo.addEventListener('transitionend', function(){
      todo.remove()
    })
  }

  if(item.classList[0] === 'todo-complete'){
    const todo = item.parentElement
    todo.classList.toggle("completed")
  }
}


const backgroundToggle = document.querySelector(".background-toggle")
const backgroundImage = document.querySelector(".image-container")
const backgrounds = [ 'url(./images/1.jpg)', 'url(./images/2.png)',
          'url(./images/3.jpg)', 'url(./images/4.png)', 'url(./images/5.jpg)']

backgroundToggle.addEventListener('click', ToggleBackground)

function ToggleBackground() {
  const randomize = Math.floor(Math.random()*backgrounds.length)
  if (backgroundImage.style.backgroundImage === backgrounds[randomize]){
    ToggleBackground()
  }
  else backgroundImage.style.backgroundImage = backgrounds[randomize]
}


const quotesMain = document.querySelector(".quotes-container")
const quoteContainer = document.querySelector(".quotes-container2")
const quoteText = document.createElement("p")
quoteContainer.appendChild(quoteText)
const newQuote = document.querySelector(".new-quote")


const getQuote = async() => {
  quoteContainer.style.display = 'block'
  const res = await fetch("https://type.fit/api/quotes")
  const quotes = await res.json()
  const num = Math.floor(Math.random()*quotes.length)
  const item = quotes[num]
  const quote = item.text
  quoteForm.style.visibility = 'hidden'
  quoteText.innerHTML = quote
}

newQuote.addEventListener('click', getQuote)
getQuote()

const addQuote = document.querySelector(".add-quote")
const quoteForm = document.querySelector("#quote-form")
const quoteInput = document.querySelector("#quote-input")
const quoteText2 = document.createElement("p")
quoteForm.appendChild(quoteText2)

addQuote.addEventListener('click', addedQuote)

function addedQuote() {
  quoteForm.style.visibility = 'visible'
  quoteContainer.style.display = 'none'
}

quoteForm.addEventListener('submit', function(e){
  e.preventDefault()
  quoteText.innerHTML = quoteInput.value
  quoteForm.style.visibility = 'hidden'
  quoteContainer.style.display = 'block'
})