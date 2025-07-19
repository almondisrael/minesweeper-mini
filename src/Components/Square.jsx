import React from "react";
import './Square.css';

const Square = ({ data, onLeftClick, onRightClick }) => {
  const handleClick = () => {
    onLeftClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault(); // prevents context menu
    onRightClick();
  };

  let display = "";
  if (data.isRevealed) {
    if (data.isMine) {
      display = "💣";
    } else if (data.adjacentMines > 0) {
      display = data.adjacentMines;
    }
  } else if (data.isFlagged) {
    display = "🚩";
  } else if (data.isQuestion) {
    display = "❓";
  }

  return (
    <div
      className={`square ${data.isRevealed ? "revealed" : ""}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {display}
    </div>
  );
};

export default Square;
