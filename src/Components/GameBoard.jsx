import React, { useState } from "react";
import Square from "./Square";
import Timer from "./Timer";
import './GameBoard.css';

// 🔁 Neighbor helper
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

  // 🧠 Game State
  const [boardState, setBoardState] = useState(generateBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // ⏱️ Timer control
  const [isRunning, setIsRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

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
    const hasWon = board.every((cell) =>
      cell.isMine || cell.isRevealed
    );
    if (hasWon) {
      setGameOver(true);
      setGameWon(true);
      setIsRunning(false); // Stop timer
      alert("🎉 You Win!");
    }
  };

  const handleLeftClick = (index) => {
    if (gameOver) return;

    // ⏱ Start timer on first click
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
        setIsRunning(false); // Stop timer
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
    setResetTrigger((prev) => prev + 1); // Reset timer
    setIsRunning(false); // Wait for first click to start
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

  return (
    <div>
      <div className="status-bar">
        <Timer
          isRunning={isRunning}
          isGameOver={gameOver}
          resetTrigger={resetTrigger}
        />
        {gameOver ? (
          gameWon ? "🎉 You won!" : "💥 Game over!"
        ) : (
          "🙂 Good luck!"
        )}
        <button onClick={restartGame} className="restart-button">Restart Game</button>
      </div>
      <div className="game-board">{renderBoard()}</div>
    </div>
  );
};

export default GameBoard;
