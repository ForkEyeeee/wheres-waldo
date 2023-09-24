import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
const TimerCounter = ({ max, gameState }: any) => {
  const [counter, setCounter] = useState(max);
  const [minutes, setminutes] = useState(0);
  useEffect(() => {
    if (gameState.win) return;
    if (counter >= 0) {
      setTimeout(() => setCounter(counter + 1), 1000);
    }
    if (counter >= 60) {
      setminutes(prevMinutes => prevMinutes + 1);
      setCounter(0);
    }
  }, [counter]);

  return (
    <Text>
      {minutes >= 0 ? minutes + " min " + counter + "s" : counter + " s"}
    </Text>
  );
};

export default TimerCounter;
