import React, { useState } from "react";
import Square from "./Square";
import './GameBoard.css';

const GameBoard = ({ rows = 8, cols = 8 }) => {
  const createInitialBoard = () => {
    return Array(rows * cols).fill("default");
  };

  const [boardState, setBoardState] = useState(createInitialBoard());

  const handleLeftClick = (index) => {
    setBoardState((prev) => {
      const newState = [...prev];
      if (newState[index] === "default") {
        newState[index] = "opened";
      }
      return newState;
    });
  };

  const handleRightClick = (index) => {
    setBoardState((prev) => {
      const newState = [...prev];
      switch (newState[index]) {
        case "default":
          newState[index] = "flagged";
          break;
        case "flagged":
          newState[index] = "question";
          break;
        case "question":
          newState[index] = "default";
          break;
        default:
          break;
      }
      return newState;
    });
  };

  const renderBoard = () => {
    return boardState.map((state, index) => (
      <Square
        key={index}
        state={state}
        onLeftClick={() => handleLeftClick(index)}
        onRightClick={() => handleRightClick(index)}
      />
    ));
  };

  return <div className="game-board">{renderBoard()}</div>;
};

export default GameBoard;
