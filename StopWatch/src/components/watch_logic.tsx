import { WatchDesign } from "./watch_design";
import React, { useState, useEffect } from "react";

export const Watch: React.FC = () => {
  const [milsec, setMilsec] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [intervalIds, setIntervalIds] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false); // New state to track if timer is running

  useEffect(() => {
    return () => {
      if (intervalIds) {
        clearInterval(intervalIds);
      }
    };
  }, [intervalIds]);

  const start = () => {
    if (intervalIds) return;

    setIsRunning(true); // Set running state to true
    const newIntervalIds = setInterval(() => {
      setMilsec((e) => {
        if (e < 99) {
          return e + 1;
        } else {
          setSeconds((se) => {
            if (se < 59) {
              return se + 1;
            } else {
              setMinutes((ea) => {
                if (ea < 59) {
                  return ea + 1;
                } else {
                  setHours((e) => e + 1);
                  return 0;
                }
              });
              return 0;
            }
          });
          return 0;
        }
      });
    }, 10);
    setIntervalIds(newIntervalIds);
  };

  const stop = () => {
    if (intervalIds) {
      clearInterval(intervalIds);
      setIntervalIds(null);
      setIsRunning(false); // Set running state to false
    }
  };

  const reset = () => {
    if (intervalIds) {
      clearInterval(intervalIds);
      setIntervalIds(null);
    }
    setMilsec(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false); // Set running state to false
  };

  return (
    <div>
      <WatchDesign
        milsec={milsec}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        isRunning={isRunning}
        start={start}
        stop={stop}
        reset={reset}
      />
    </div>
  );
};
