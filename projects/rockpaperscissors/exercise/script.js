/*
  Rock Paper Scissors 🚀🔥
  Concepts covered in this project
    👉 For loops
    👉 Dom Manipulation
    👉 Variables
    👉 Conditionals (if else if)
    👉 Template Literals
    👉 Event Listeners
    👉 Higher order Function (Math.random())
*/

const divs = document.querySelector(".resultContainer").querySelectorAll("div")
const playerScore = document.getElementById("player-score")
const hands = document.getElementById("hands")
const result = document.getElementById("result")
let score = 0

// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **
// getComputerChoice() 👉 'Rock'
// getComputerChoice() 👉 'Scissors'
function getComputerChoice() {
  const id = Math.floor(Math.random() * 3)
  const array = ['Rock', 'Paper', 'Scissors']
  return array[id]
}

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
function getResult(playerChoice, computerChoice) {
  // return the result of score based on if you won, drew, or lost
  // All situations where human draws, set `score` to 0
  // All situations where human wins, set `score` to 1
  // make sure to use else ifs here
  // Otherwise human loses (aka set score to -1)
  if (playerChoice == computerChoice) {
    result.textContent="It's a Draw!"
  } else if ((playerChoice == 'Rock' && computerChoice == 'Scissors') || (playerChoice == 'Scissors' && computerChoice == 'Paper') || (playerChoice == 'Paper' && computerChoice == 'Rock')) {
    score++
    result.textContent="You Win!"
  } else if ((computerChoice == 'Rock' && playerChoice == 'Scissors') || (computerChoice == 'Scissors' && playerChoice == 'Paper') || (computerChoice == 'Paper' && playerChoice == 'Rock')) {
    score--
    result.textContent="You Lose!"
  }

  // return score
  return score
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
  // Hint: on a score of -1
  // You should do result.innerText = 'You Lose!'
  // Don't forget to grab the div with the 'result' id!
  playerScore.textContent = score
  hands.textContent = `🧓${playerChoice} vs 🤖${computerChoice}`
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
  const computerChoice = getComputerChoice()
  const score = getResult(playerChoice, computerChoice)
  showResult(score, playerChoice, computerChoice)
}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
  // use querySelector to select all RPS Buttons
  const btns = document.querySelectorAll(".rpsButton")

  // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
  // 1. loop through the buttons using a forEach loop
  // 2. Add a 'click' event listener to each button
  // 3. Call the onClickRPS function every time someone clicks
  // 4. Make sure to pass the currently selected rps button as an argument
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      divs.forEach(div => div.style.display = "block")
      onClickRPS(btn.value)
    })
  });

  // Add a click listener to the end game button that runs the endGame() function on click
  const endGameBtn = document.getElementById("endGameButton")
  endGameBtn.addEventListener("click", endGame)
}

// ** endGame function clears all the text on the DOM **
function endGame() {
  score = 0
  divs.forEach(div => div.style.display = "none")
}

playGame()