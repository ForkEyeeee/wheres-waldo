import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
const TimerCounter = ({ gameState, counter, setCounter }: any) => {
  useEffect(() => {
    if (gameState.win) return;
    if (counter.seconds >= 0) {
      setTimeout(
        () =>
          setCounter({
            seconds: counter.seconds + 1,
            minutes: counter.minutes,
          }),
        1000
      );
    }
    if (counter.seconds >= 60) {
      setCounter({
        seconds: 0,
        minutes: counter.minutes + 1,
      });
    }
  }, [counter]);

  return (
    <Text>
      {counter.minutes >= 0
        ? counter.minutes + " min " + counter.seconds + "s"
        : counter.seconds + " s"}
    </Text>
  );
};

export default TimerCounter;
