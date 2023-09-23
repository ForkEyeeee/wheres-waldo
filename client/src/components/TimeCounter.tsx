import { useEffect, useState } from "react";

const TimerCounter = ({ max }) => {
  const [counter, setCounter] = useState(max);
  const [minutes, setminutes] = useState(0);
  useEffect(() => {
    if (counter >= 0) {
      setTimeout(() => setCounter(counter + 1), 1000);
    }
    if (counter >= 60) {
      setminutes(prevMinutes => prevMinutes + 1);
      setCounter(0);
    }
  }, [counter]);

  return (
    <span>
      {minutes >= 0 ? minutes + " min " + counter + "s" : counter + " s"}
    </span>
  );
};

export default TimerCounter;
