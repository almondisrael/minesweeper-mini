import React from "react";
import Square from "./Square";
import './GameBoard.css';


const GameBoard = ({
  rows = 8,
  cols = 8,
  onSquareClick = () => {},
  onSquareRightClick = () => {},
  squareStates = [],
}) => {
  const totalSquares = rows * cols;

  return (
    <div className="game-board">
      {Array.from({ length: totalSquares }, (_, i) => (
        <Square
          key={i}
          onLeftClick={() => onSquareClick(i)}
          onRightClick={() => onSquareRightClick(i)}
          state={squareStates[i] || "default"}
        />
      ))}
    </div>
  );
};

export default GameBoard;
