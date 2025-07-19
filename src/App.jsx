import React from "react";

import GameBoard from "./Components/GameBoard";

function App () {
  return (
    <div className="App">
      <h1 className="app-title">Minesweeper Mini</h1>
      <GameBoard rows = {8} cols={8} />
    </div>
  )
}

export default App;