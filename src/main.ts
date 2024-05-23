import "./style.css"
import tictactoe from "./game"
import { generateGB, message, startGame } from "./functionUtils"
import { colors } from "./utils"

const r: any = document.querySelector(":root")
const gameboard = document.querySelector("#gameboard")
const playX = document.querySelector("#startX")
const playO = document.querySelector("#startO")

let game = new tictactoe()

document.addEventListener("DOMContentLoaded", () => {
  if (colors)
    r.style.setProperty("--main-color", colors[Math.ceil(Math.random() * colors.length - 1)])

  generateGB(gameboard, game)
  playX?.addEventListener("click", () => startGame(game, "X"))
  playO?.addEventListener("click", () => startGame(game, "O"))
  playO?.classList.add("cursor-pointer")
  playX?.classList.add("cursor-pointer")
  message("Choose whether to play as X or as O")
})
