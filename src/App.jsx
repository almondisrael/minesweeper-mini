import React from "react";

import GameBoard from "./Components/GameBoard";

function App () {
  return (
    <div className="App">
      <h1>Minesweeper Mini</h1>
      <GameBoard rows = {8} cols={8} />
    </div>
  )
}

export default App;