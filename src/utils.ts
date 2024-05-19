// Constants
const orderedActions: action[] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
]

const winningLines = [
  // Horizontals
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],

  // Vertical
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],

  // Diagonal
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
]

const colors: string[] = ["#d5a021", "#9627a7", "#a72e30", "#304CA0", "#0C7500"]

// Types
type board = [
  ["X" | "O" | null, "X" | "O" | null, "X" | "O" | null],
  ["X" | "O" | null, "X" | "O" | null, "X" | "O" | null],
  ["X" | "O" | null, "X" | "O" | null, "X" | "O" | null]
]
type player = "X" | "O"
type winner = player | null
type action = [number, number]
type valueMove = [number, action | null]

export { orderedActions, winningLines, colors }
export type { player, winner, board, action, valueMove }
