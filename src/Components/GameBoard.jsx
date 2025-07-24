import React, { useState } from "react";
import Square from "./Square";
import Timer from "./Timer";
import "./GameBoard.css";

const getNeighbors = (index, rows, cols) => {
  const neighbors = [];
  const row = Math.floor(index / cols);
  const col = index % cols;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        neighbors.push(r * cols + c);
      }
    }
  }
  return neighbors;
};

const GameBoard = ({ rows = 8, cols = 8 }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const generateBoard = () => {
    const totalSquares = rows * cols;
    const mineCount = Math.floor(totalSquares * 0.15);

    const board = Array(totalSquares).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      isQuestion: false,
      adjacentMines: 0,
    }));

    let placedMines = 0;
    while (placedMines < mineCount) {
      const index = Math.floor(Math.random() * totalSquares);
      if (!board[index].isMine) {
        board[index].isMine = true;
        placedMines++;
      }
    }

    board.forEach((cell, i) => {
      if (cell.isMine) return;
      const neighbors = getNeighbors(i, rows, cols);
      cell.adjacentMines = neighbors.filter((n) => board[n].isMine).length;
    });

    return board;
  };

  const [boardState, setBoardState] = useState(generateBoard());

  const floodReveal = (board, index) => {
    const stack = [index];
    const visited = new Set();

    while (stack.length > 0) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);

      const cell = board[current];
      if (cell.isRevealed || cell.isFlagged || cell.isMine) continue;

      cell.isRevealed = true;

      if (cell.adjacentMines === 0) {
        const neighbors = getNeighbors(current, rows, cols);
        stack.push(...neighbors);
      }
    }
  };

  const checkWinCondition = (board) => {
    const hasWon = board.every((cell) => cell.isMine || cell.isRevealed);
    if (hasWon) {
      setGameOver(true);
      setGameWon(true);
      setIsRunning(false);
      alert("🎉 You Win!");
    }
  };

  const handleLeftClick = (index) => {
    if (gameOver) return;

    if (!isRunning) {
      setIsRunning(true);
    }

    setBoardState((prev) => {
      const newBoard = [...prev];
      const cell = newBoard[index];

      if (cell.isRevealed || cell.isFlagged) return newBoard;

      if (cell.isMine) {
        cell.exploded = true;
        cell.isRevealed = true;
        setGameOver(true);
        setIsRunning(false);
        alert("💥 Game Over!");
        newBoard.forEach((c) => {
          if (c.isMine) c.isRevealed = true;
        });
      } else {
        floodReveal(newBoard, index);
        checkWinCondition(newBoard);
      }

      return [...newBoard];
    });
  };

  const handleRightClick = (index) => {
    if (gameOver) return;

    setBoardState((prev) => {
      const newBoard = [...prev];
      const cell = { ...newBoard[index] };

      if (cell.isRevealed) return newBoard;

      if (!cell.isFlagged && !cell.isQuestion) {
        cell.isFlagged = true;
      } else if (cell.isFlagged) {
        cell.isFlagged = false;
        cell.isQuestion = true;
      } else {
        cell.isQuestion = false;
      }

      newBoard[index] = cell;
      return newBoard;
    });
  };

  const restartGame = () => {
    setBoardState(generateBoard());
    setGameOver(false);
    setGameWon(false);
    setIsRunning(false);
    setResetTrigger((prev) => prev + 1);

    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  const renderBoard = () => {
    return boardState.map((square, index) => (
      <Square
        key={index}
        data={square}
        onLeftClick={() => handleLeftClick(index)}
        onRightClick={(e) => {
          e.preventDefault();
          handleRightClick(index);
        }}
      />
    ));
  };

if (!hasStarted) {
  return (
    <div className="instructions-screen">
      <h2>🧠 How to Play</h2>
      <ul className="remove-bullets">
        <li><b>Click</b> a cell to reveal it</li>
        <li><b>Numbers</b> show how many mines are in adjacent cells</li>
        <li><b>Right-click</b> to flag a cell you suspect has a mine</li>
        <li><b>Revealing a blank cell</b> auto-clears surrounding safe cells</li>
        <li><b>Clear all non-mine</b> cells to win — hitting a mine ends the game</li>
      </ul>
      <button onClick={() => setHasStarted(true)} className="start-button">
        Start Game
      </button>
    </div>
  );
}



  return (
    <div className="app-container">
         
      <div className="status-bar">
        <Timer
          isRunning={isRunning}
          isGameOver={gameOver}
          resetTrigger={resetTrigger}
        />
        {gameOver ? (
          gameWon ? (
            <span className="status-text">🎉 YOU WON!</span>
          ) : (
            <span className="status-text">💥 GAME OVER!</span>
          )
        ) : (
          <span className="good-luck">🙂 GOOD LUCK!</span>
        )}
        <button onClick={restartGame} className="restart-button">
          Restart Game
        </button>
      </div>
      <div className="game-board">{renderBoard()}</div>
    </div>
  );
};

export default GameBoard;
