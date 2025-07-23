import { useEffect, useState } from "react";

export default function Timer({ isRunning, isGameOver, resetTrigger }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning && !isGameOver) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isGameOver]);

  useEffect(() => {
    // Reset the timer when resetTrigger changes (e.g., a new game)
    setSeconds(0);
  }, [resetTrigger]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="text-xl font-mono">
        {formatTime(seconds)}
      </div>
      <div className="mt-4 p-2 bg-gray-100 rounded text-sm text-gray-700">
        <strong>How to Play Minesweeper:</strong>
        <ul className="list-disc ml-5 mt-1">
          <li>Click a cell to reveal it.</li>
          <li>Numbers show how many mines are in adjacent cells.</li>
          <li>Right-click (or long-press) to flag a cell as a mine.</li>
          <li>Clear all non-mine cells to win. Hitting a mine ends the game.</li>
        </ul>
      </div>
    </div>
  );
}
