import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

const TimerCounter = ({ gameState, startTime }) => {
  const [counter, setCounter] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameState.win) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedSeconds = currentTime - startTime;

      setCounter(elapsedSeconds % 60);
      setMinutes(Math.floor(elapsedSeconds / 60));
    }, 1000);

    return () => clearInterval(intervalId); // cleanup when component unmounts
  }, [startTime, gameState.win]);

  return (
    <Text>
      {minutes} min {counter} s
    </Text>
  );
};

export default TimerCounter;
