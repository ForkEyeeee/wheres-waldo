import { Box, HStack, Flex, Heading, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
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
      <Box p={5} fontFamily={"inter"} fontSize={16}>
        <HStack justifyContent="space-between">
          <Heading fontSize={{ base: "inherit", md: 20 }}>
            Where's Waldo?!
          </Heading>
          {!isLocation && (
            <Box>
              {gameState.start && !gameState.win && (
                <TimeCounter
                  gameState={gameState}
                  startTime={startTime}
                  timeElapsed={timeElapsed}
                  setTimeElapsed={setTimeElapsed}
                />
              )}
            </Box>
          )}

          {isLocation && (
            <ChakraLink
              as={ReactRouterLink}
              to={`/`}
              fontSize={20}
              fontWeight={"semibold"}
              color={"blue"}
            >
              Back to Game
            </ChakraLink>
          )}
        </HStack>
      </Box>
      {!isLocation && (
        <Flex justifyContent="center" alignItems="center" pb={"10px"}>
          <Image
            src="/assets/images/waldo.png"
            boxSize={{ base: "50px", md: "100px" }}
            height={"auto"}
          />
          <Image
            src="/assets/images/sonic.webp"
            boxSize={{ base: "50px", md: "100px" }}
            height={"auto !important"}
          />
          <Image
            src="/assets/images/death.jpg"
            boxSize={{ base: "50px", md: "100px" }}
            height={"auto"}
          />
        </Flex>
      )}
    </Box>
  );
};

export default NavBar;
