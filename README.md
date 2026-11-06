# Snake Game

A browser-based Snake game built for **CPSC 1045 — Introduction to Web Programming** at **Langara College**. The project uses HTML, CSS, and vanilla JavaScript with the HTML Canvas API.

Starting from a YouTube tutorial, this project extends traditional Snake with wrapping boundaries, a red bomb obstacle, increasing difficulty, custom visuals, and player feedback. This README draws on the project's development report and the current implementation.

## Features

- **Wrapping boundaries:** crossing an edge brings the snake around to the opposite side of the board.
- **Growing snake and score:** each apple adds one point and one body segment.
- **Red bomb obstacle:** a red box starts on the board and moves to a random position whenever an apple is eaten. Hitting it ends the game.
- **Increasing difficulty:** the snake speeds up as the score grows.
- **Custom visuals:** a yellow snake body, randomly changing colors for the head and apple, canvas shadows, and gradient game-over text.
- **Player feedback:** messages explain speed changes and, at game over, the cause of the collision and the number of apples collected.
- **Restart button:** reloads the page to reset the game.

## Run locally

No installation, dependencies, or build step is required.

1. Clone or download this repository.
2. Keep `snake.HTML` and `snake.JS` in the same folder.
3. Open **`snake.HTML`** in a desktop web browser.
4. Press an arrow key to start moving.

Alternatively, if Python 3 is installed, serve the project folder locally:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000/snake.HTML](http://localhost:8000/snake.HTML). File names are case-sensitive on some systems, so preserve the uppercase extensions.

## How to play

| Control | Action |
| --- | --- |
| ↑ | Move up |
| ↓ | Move down |
| ← | Move left |
| → | Move right |
| Restart button | Reset the game and score |

Collect the apple (the square with changing colors) while avoiding the red bomb and your own yellow body. The snake grows with each apple, making navigation more challenging. You cannot immediately reverse direction. Crossing the board's edges wraps the snake to the other side instead of ending the game.

Colliding with the bomb or the snake's body ends the game. Read the message below the canvas for your score and the cause, then click **Restart** to play again.

### Difficulty progression

| Score | Target game updates per second |
| --- | --- |
| 0–10 | 6 |
| 11–20 | 9 |
| 21–30 | 14 |
| 31+ | 21 |

The report describes milestones of 10, 20, and 30 apples; the implementation uses `score > 10`, `score > 20`, and `score > 30`, so each increase takes effect on the next apple after that milestone.

## Project structure

```text
snake-game/
├── README.md    # Project overview and playing instructions
├── snake.HTML   # Page structure, inline CSS, canvas, and restart button
└── snake.JS     # Game loop, rendering, keyboard input, and collision logic
```

The game runs on a 400 × 400 canvas. JavaScript maintains the snake's position and body segments, handles keyboard events, checks collisions, and redraws the board using a `setTimeout` game loop. The restart button resets the state by reloading the page.

## Current limitations

- Controls require a keyboard; touch controls and pause are not implemented.
- Scores reset on restart and are not saved between sessions.
- Random apple and bomb placement does not exclude occupied tiles, so objects can overlap.
- The boundary logic includes a coordinate just outside the visible canvas, which can briefly hide the head during wrapping.

## Acknowledgments

The original project report credits a YouTube tutorial as the starting point. The tutorial's title, creator, and URL were not provided in the report.

The report identifies wrapping boundaries, visual styling, the bomb obstacle, the restart button, speed progression, and feedback messages as the project's enhancements.
