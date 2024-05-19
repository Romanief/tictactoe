# Tic-Tac-Toe with AI (Minimax Algorithm)

This project is a simple Tic-Tac-Toe game built using vanilla TypeScript and Tailwind CSS, featuring an AI opponent powered by the minimax algorithm.

## Table of Contents

- [Tic-Tac-Toe with AI (Minimax Algorithm)](#tic-tac-toe-with-ai-minimax-algorithm)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
    - [Main.ts](#maints)
    - [Game.ts](#gamets)
    - [Utils.ts](#utilsts)
    - [FunctionUtils.ts](#functionutilsts)
    - [Ai.ts](#aits)
  - [Summary](#summary)

## Features

- Play Tic-Tac-Toe against an AI.
- AI opponent uses the minimax algorithm for optimal moves.
- Responsive design using Tailwind CSS.

## Usage

- Choose wether to play as X or O player.
- Click on a cell to make your move.
- The AI will automatically make its move after you.
- The game will announce the winner or if it's a draw and keep track of the scoring

## Project Structure

The project has a total of 5 ts files:

- main.ts
- game.ts
- utils.ts
- functionUtils.ts
- ai.s

### Main.ts

This file contain the logic to initialise the app.
On `DOMContentLoaded`, it makes sure that the page is rendered correctly, then it assign the appropriate `eventListeners` to the designated elements.
Finally initialise a new object using the imported class tictactoe contained in game.ts

### Game.ts

This file contains only a `tictactoe` class that initialise an object containing the logic needed to run a game.
Its constructor will initialise the board to an empty board and the game status to false.

### Utils.ts

This file contains all the different constants and types used in the whole app such as the `board type`, `action type`, `the possible winning moves` and `possible actions`

### FunctionUtils.ts

This files contains some functions that are not needed for the game logic but needed for the app functionality such the `handleClick` function and
the `startGame` function

### Ai.ts

Finally this file contains the ai logic. The ai uses a `minimax` algorithm which is a decision-making algorithm used in game theory and artificial intelligence for two-player games like Tic Tac Toe. It aims to minimize the possible loss for a worst-case scenario. The algorithm recursively simulates all possible moves, assuming that both players play optimally. The maximizing player aims to maximize their score, while the minimizing player aims to minimize the maximizing player's score. The algorithm evaluates the terminal states (win, lose, draw) and assigns them scores, then backtracks to determine the best move for the current player by selecting the move that leads to the optimal outcome.

To maximise the performance I decided to use a `Depth-Limited minimax`algorithm, which includes a limit in the depth of recruision. By default the limit is set to 5 as it would provide the player with decent challange without impacting the performance of the board.

To furtherly increase the performance I also applied `Alpha-Beta Pruning` to my ai: This is an optimization method for the Minimax algorithm that stops evaluating a move when it finds that at least one possibility has been found that proves the move to be worse than a previously examined move. This reduces the number of nodes that need to be evaluated in the search tree.

## Summary

I completed this project to showcase my ability to create simple ai such as a `minimax` algorithm. I decided to use vanilla ts to demonstrate my good foundation of JavaScript and the ability to handle complex logic without the need of external libraries.
