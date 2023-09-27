import { useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";

interface Props {
  gameState: {
    start: boolean | null;
    win: boolean | null;
  };
  startTime: string;
  timeElapsed: {
    seconds: number | null;
    minutes: number | null;
  };
  setTimeElapsed: React.Dispatch<
    React.SetStateAction<{
      seconds: number | null;
      minutes: number | null;
    }>
  >;
}

const TimerCounter = ({
  gameState,
  startTime,
  timeElapsed,
  setTimeElapsed,
}: Props) => {
  const formatTimeUnit = (unit: number | null) => {
    return (unit as any) < 10 ? `0${unit}` : unit;
  };

  useEffect(() => {
    if (gameState.win) return;

    const start = Number(startTime);

    const intervalId = setInterval(() => {
      const elapsedSeconds = Math.floor(Date.now() / 1000) - start;

      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;

      setTimeElapsed({ minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, gameState.win, setTimeElapsed]);

  return (
    <Box
      p={2}
      bgColor="white"
      borderRadius="8px"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Text
        fontSize={{ base: "inherit", md: "2xl" }}
        color="red"
        fontWeight="semibold"
      >
        {formatTimeUnit(timeElapsed.minutes)} min{" "}
        {formatTimeUnit(timeElapsed.seconds)}s
      </Text>
    </Box>
  );
};

export default TimerCounter;
