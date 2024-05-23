import tictactoe from "./game"
import { action, board, valueMove, orderedActions } from "./utils"

function miniMax(game: tictactoe) {
  // Takes a game as an input, returns the best move for the player having his turn
  // Limit of action set to 5 means that will look into the next 5 turns
  let board = game.getBoardCopy()

  const flatBoard = board.flat(3)
  if (flatBoard.filter((cell) => cell == null).length > 7) return orderedActions[Math.floor(Math.random() * orderedActions.length)]

  if (game.getIfTerminal(board)) return null

  const limit = 5
  let count = 0

  if (game.getPlayer(board) === "X") {
    let [_, move]: valueMove = max(game, board, limit, count)
    return move
  } else if (game.getPlayer(board) === "O") {
    let [_, move]: valueMove = min(game, board, limit, count)
    return move
  } else return null
}

function max(game: tictactoe, board: board, limit: number, count: number): valueMove {
  // Return the action with the highest possible value
  if (game.getIfTerminal(board)) return utility(game, board)

  if (limit == count) return [0, null]

  let value = -Infinity
  let bestMove: null | action = null
  let actions = game.getActions(board)
  count += 1

  for (let action of actions) {
    if (!game.getValidity(board, action)) continue
    let [actValue, _]: valueMove = min(game, game.getResult(board, action)!, limit, count)
    if (actValue > value) {
      value = actValue
      bestMove = action
    }

    if (value === 1) break // Best possible move found, no need to continue
  }

  return [value, bestMove]
}

function min(game: tictactoe, board: board, limit: number, count: number): valueMove {
  // Returns the action with the lowest possible value
  if (game.getIfTerminal(board)) return utility(game, board)

  if (limit == count) return [0, null]

  let value = Infinity
  let bestMove: null | action = null
  let actions = game.getActions(board)
  count += 1

  for (let action of actions) {
    if (!game.getValidity(board, action)) continue
    let [actValue, _]: valueMove = max(game, game.getResult(board, action)!, limit, count)
    if (actValue < value) {
      value = actValue
      bestMove = action
    }

    if (value === -1) break // Best possible move found, no need to continue
  }
  return [value, bestMove]
}

function utility(game: tictactoe, board: board): valueMove {
  let winner = game.getWinner(board)
  if (winner === "X") return [+1, null]
  if (winner === "O") return [-1, null]
  return [0, null]
}

export default miniMax
