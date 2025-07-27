import React from "react";
import "./Square.css";

const Square = ({ data, onLeftClick, onRightClick }) => {
  let content = "";
if (data.isRevealed) {
  if (data.isBomb) {
    content = "💣";
  } else if (data.neighborBombs > 0) {
    content = data.neighborBombs;
  }
} else if (data.isFlagged) {
  content = "🚩";
}


  return (
    <div
      className={`square ${data.isRevealed ? "revealed" : ""}`}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {content}
    </div>
  );
};

export default Square;
