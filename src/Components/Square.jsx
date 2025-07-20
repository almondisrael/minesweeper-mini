import React from "react";
import './Square.css';

const Square = ({ onLeftClick, onRightClick, state }) => {
  const handleClick = () => {
    onLeftClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault(); // prevents context menu
    onRightClick();
  };

  return (
    <div
      className={`square ${state}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {state === "flagged" ? "🚩" : state === "question" ? "❓" : ""}
    </div>
  );
};

export default Square;
