import React from "react";
import './Square.css';

const Square = ({ onLeftClick, onRightClick, data }) => {
  const handleClick = () => {
    onLeftClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick(e);
  };

  let display = "";

  if (data.isRevealed) {
    if (data.isMine) {
      display = "💣";
    } else if (data.adjacentMines > 0) {
      display = data.adjacentMines;
    } else {
      display = "";
    }
  } else if (data.isFlagged) {
    display = "🚩";
  } else if (data.isQuestion) {
    display = "❓";
  }

  // 👇 Dynamically build class names
  const classNames = ["square"];
  if (data.isRevealed) classNames.push("revealed");
  if (data.exploded) classNames.push("exploded");
  if (data.isFlagged) classNames.push("flagged");
  if (data.isQuestion) classNames.push("question");

  return (
    <div
      className={classNames.join(" ")}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {display}
    </div>
  );
};

export default Square;
