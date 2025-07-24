import React from "react";
import "./Square.css";

const Square = ({ onLeftClick, onRightClick, data }) => {
  const handleClick = () => {
    if (typeof onLeftClick === "function") onLeftClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (typeof onRightClick === "function") onRightClick(e);
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

  
  const classNames = ["square"];
  if (data.isRevealed) classNames.push("opened");
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
