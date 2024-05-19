import tictactoe from "./game"
import { action, colors, orderedActions, player } from "./utils"
import miniMax from "./ai"

const scoreOelem = document.querySelector("#scoreO")
const scoreXelem = document.querySelector("#scoreX")
const playX = document.querySelector("#startX")
const playO = document.querySelector("#startO")
const messageElem = document.querySelector("#message")
const r: any = document.querySelector(":root")

let scoreO = 0
let scoreX = 0

function update(game: tictactoe) {
  // takes a game as an input
  // update the UI with the current board and the scoring
  // check if the game ends, update scores accordingly
  // Start and stop a game as appropriate
  let board = game.getBoardCopy()
  orderedActions.forEach((action, i) => {
    let elem = document.querySelector(`#elem${i}`)
    if (!elem) return console.error("Unable to locate elem")
    let player = board[action[0]][action[1]]
    elem.textContent = player ? player : " "
  })

  if (game.getIfTerminal(board)) {
    let winner = game.getWinner(board)
    game.stop()
    stopGame()
    if (winner == "X") {
      scoreX++
      message("X wins!")
    } else if (winner == "O") {
      scoreO++
      message("O wins!")
    } else {
      message("Tie!")
    }

    console.log(scoreO, scoreX)
  }

  if (scoreOelem && scoreXelem) {
    scoreOelem.innerHTML = scoreO.toString()
    scoreXelem.innerHTML = scoreX.toString()
  }
}

function handleBoardClick(id: number, game: tictactoe) {
  // Handles board click by modyfing the board approprately if the game is in progress
  // Then let the ai make its move
  if (!game.getIsPlaying()) return console.error("Game not in progress")
  let move = orderedActions[id]
  let board = game.getBoardCopy()

  if (!game.getValidity(board, move)) return

  game.makeMove(board, move)
  board = game.getBoardCopy()
  update(game)

  setTimeout(() => {
    aiMove(game)
  }, 200)
}

function aiMove(game: tictactoe) {
  // gets a game as an input and return the best move looking into the next 5 actions
  if (!game.getIsPlaying()) return console.error("Game not in progress")

  let move: action | null = miniMax(game)
  if (!move) return console.error("terminal board")
  let board = game.getBoardCopy()

  console.log("aiMove: ", move)
  game.makeMove(board, move)
  update(game)
}

function startGame(game: tictactoe, player: player) {
  // Start a new game of tic tac toe, randomises the board color
  if (game.getIsPlaying()) return

  playO?.classList.add("opacity-0", "cursor-default")
  playX?.classList.add("opacity-0", "cursor-default")
  playO?.classList.remove("cursor-pointer")
  playX?.classList.remove("cursor-pointer")

  if (colors)
    r.style.setProperty("--main-color", colors[Math.ceil(Math.random() * colors.length - 1)])

  message("Game started")

  game.initializeBoard()
  update(game)
  game.start()

  if (player == "O") aiMove(game)
}

function stopGame() {
  // makes the button to start the game appear again
  playO?.classList.remove("opacity-0", "cursor-default")
  playX?.classList.remove("opacity-0", "cursor-default")
  playO?.classList.add("cursor-pointer")
  playX?.classList.add("cursor-pointer")
}

function generateGB(gameboard: Element | null, game: tictactoe) {
  // Generates the gameboard squares and assigns them a numeric ID from 0 to 8
  if (!gameboard) return message("Unable to locate gameboard")
  for (let j = 0; j < 9; j++) {
    let elem = document.createElement("div")
    elem.id = "elem" + j.toString()
    elem.classList.add("GBelem")
    elem.addEventListener("click", () => {
      handleBoardClick(j, game)
    })
    gameboard.appendChild(elem)
  }
}

function message(message: string) {
  // Shows a message to the UI
  if (!messageElem) return
  messageElem.textContent = message
}

export { update, handleBoardClick, startGame, generateGB, stopGame, message }
