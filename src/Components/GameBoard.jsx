import React from "react";
import Square from "./Square";
import './GameBoard.css';


const GameBoard = ({ rows = 8, cols = 8 }) => {
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < rows * cols; i++) {
      board.push(
        <Square
          key={i}
          onLeftClick={() => console.log(`Left click on ${i}`)}
          onRightClick={() => console.log(`Right click on ${i}`)}
          state="default"
        />
      );
    }

    return board;

  };

  return <div className="game-board">{createBoard()}</div>;
};


export default GameBoard;


