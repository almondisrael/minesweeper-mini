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
    setSeconds(0); 
  }, [resetTrigger]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      ⏱ {formatTime(seconds)}
    </div>
  );
}
