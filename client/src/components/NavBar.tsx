import { Box, HStack, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import TimeCounter from "./TimeCounter";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

interface Props {
  gameState: {
    start: null | boolean;
    win: null | boolean;
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

const NavBar = ({
  gameState,
  startTime,
  timeElapsed,
  setTimeElapsed,
}: Props) => {
  const isLocation = useLocation().pathname === "/leaderboard";

  return (
    <Box>
      <Box
        p={2}
        pl={5}
        pr={5}
        pt={5}
        bg="white"
        fontFamily={"inter"}
        fontSize={16}
        textTransform={"capitalize"}
      >
        <HStack justifyContent="space-between" alignItems={"center"}>
          <Heading>Where's Waldo?!</Heading>
          <HStack boxSize={20}>
            <Image src="/assets/images/waldo.png" />
            <Image src="/assets/images/sonic.webp" />
            <Image src="/assets/images/death.jpg" />
          </HStack>
          {gameState.start && !gameState.win && (
            <TimeCounter
              gameState={gameState}
              startTime={startTime}
              timeElapsed={timeElapsed}
              setTimeElapsed={setTimeElapsed}
            />
          )}
          {isLocation && (
            <ChakraLink as={ReactRouterLink} to={`/`}>
              Back to Game
            </ChakraLink>
          )}

          <Text fontSize={20} fontStyle={"italic"}>
            Find Waldo and his friends!
          </Text>
        </HStack>
      </Box>
      <Flex justifyContent={"center"}>
        <Divider pt={5} width={"50%"} />
      </Flex>
    </Box>
  );
};

export default NavBar;
