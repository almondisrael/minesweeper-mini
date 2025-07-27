import React, { useState, useEffect } from "react";
import Square from "./Square";
import "./GameBoard.css";

const BOARD_SIZE = 8;
const BOMB_COUNT = 10;


const getNeighbors = (index) => {
  const x = index % BOARD_SIZE;
  const y = Math.floor(index / BOARD_SIZE);
  const neighbors = [];

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;

      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE) {
        neighbors.push(ny * BOARD_SIZE + nx);
      }
    }
  }

  return neighbors;
};

const createBoard = () => {
  const board = [];
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    board.push({
      isBomb: false,
      isRevealed: false,
      isFlagged: false,
      index: i,
      neighborBombs: 0,
    });
  }


  let bombsPlaced = 0;
  while (bombsPlaced < BOMB_COUNT) {
    const randIndex = Math.floor(Math.random() * board.length);
    if (!board[randIndex].isBomb) {
      board[randIndex].isBomb = true;
      bombsPlaced++;
    }
  }


  for (let i = 0; i < board.length; i++) {
    if (board[i].isBomb) continue;

    const neighbors = getNeighbors(i);
    board[i].neighborBombs = neighbors.filter(
      (n) => board[n].isBomb
    ).length;
  }

  return board;
};


const GameBoard = () => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setBoard(createBoard());
  }, []);

  const handleLeftClick = (index) => {
    if (gameOver || board[index].isFlagged || board[index].isRevealed) return;

    const newBoard = [...board];
    newBoard[index].isRevealed = true;

    if (newBoard[index].isBomb) {
      setGameOver(true);
      alert("Game Over!");
    }

    setBoard(newBoard);
  };

  const handleRightClick = (index, e) => {
    e.preventDefault();
    if (gameOver || board[index].isRevealed) return;

    const newBoard = [...board];
    newBoard[index].isFlagged = !newBoard[index].isFlagged;
    setBoard(newBoard);
  };

  return (
    <div className="game-board">
      {board.map((square, i) => (
        <Square
          key={i}
          data={square}
          onLeftClick={() => handleLeftClick(i)}
          onRightClick={(e) => handleRightClick(i, e)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
