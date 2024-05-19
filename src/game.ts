import { action, board, orderedActions, player, winningLines } from "./utils"

class tictactoe {
  // Initialise a tic tac toe game
  board: board
  isPlaying: boolean
  constructor() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
    this.isPlaying = false
  }

  // Getters
  getIsPlaying() {
    return this.isPlaying
  }

  getBoardCopy(): board {
    // Return a deep copy of the current board
    //@ts-ignore
    return this.board.map((row) => [...row])
  }

  getPlayer(board: board) {
    // Determine which player's turn it is
    // Assuming player 1 is represented by "X" and player 2 by "O"
    const flatBoard = board.flat(3)
    const player1Moves = flatBoard.filter((cell) => cell === "X").length
    const player2Moves = flatBoard.filter((cell) => cell === "O").length
    return player1Moves <= player2Moves ? "X" : "O"
  }

  getActions(board: board) {
    // Take a board as an input and returns an array containing all the possible actions
    let possibleActions = orderedActions.filter((action) => !board[action[0]][action[1]])
    return possibleActions
  }

  getValidity(board: board, action: action) {
    // Takes a board and an action as input and returns a boolean based on wether the action is valid or not
    return !board[action[0]][action[1]]
  }

  getResult(board: board, action: action) {
    // Takes a board and an action as input, returns a new board that is the result of taking that action on the input board
    // This function does not modify the gameBoard
    if (!this.getValidity(board, action)) return console.error("Invalid action")

    let boardCopy = this.getBoardCopy()
    let player: player = this.getPlayer(board)

    boardCopy[action[0]][action[1]] = player
    return boardCopy
  }

  getWinner(board: board) {
    // Takes a board as an input. return a winner if there is one, otherwise return null
    for (let line of winningLines) {
      let x = 0
      let o = 0

      line.forEach((elem) => {
        if (board[elem[0]][elem[1]] == "X") x++
        if (board[elem[0]][elem[1]] == "O") o++
      })

      if (x == 3) return "X"
      if (o == 3) return "O"
    }

    return null
  }

  getIfTerminal(board: board) {
    // Takes a board as an Input, if the board is terminal then return true
    // Otherwise return false
    if (this.getWinner(board)) return true

    let count = 0
    board.forEach((line) => {
      line.forEach((e) => {
        if (e) count++
      })
    })
    return count == 9
  }

  // Setters
  makeMove(board: board, action: action) {
    // Takes a board and an action as input, if the action is valid modify the board.
    let newBoard = this.getResult(board, action)
    if (newBoard) this.setBoard(newBoard)

    return
  }

  setBoard(board: board) {
    this.board = board
    return
  }

  start() {
    this.isPlaying = true
    return
  }

  stop() {
    this.isPlaying = false
    return
  }

  initializeBoard() {
    // Reset the board
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  }
}

export default tictactoe
