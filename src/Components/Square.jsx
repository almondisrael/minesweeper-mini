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


  // Determine what to show based on the data
let display = "";

if (data.isRevealed) {
  if (data.isMine) {
    display = "💣";
  } else if (data.adjacentMines > 0) {
    display = data.adjacentMines;
  } else {
    display = ""; // empty revealed square (0 adjacent mines)
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
