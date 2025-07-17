import React from "react";
import './Square.css';

const Square = ({ onLeftClick, onRightClick, state }) => {
  const handleClick = () => {
    onLeftClick();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick();
  };

  return (
    <div
      className={`square ${state}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    ></div>
  );
};

export default Square;
