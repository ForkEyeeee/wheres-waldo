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
        p={5}
        // pl={5}
        // pr={5}
        // pt={5}
        // bg="white"
        fontFamily={"inter"}
        fontSize={16}
      >
        <HStack
          justifyContent="space-between"
          // alignItems={{ base: "flex-start", md: "center" }}
          // flexDir={{ base: "column", md: "row" }}
          // textAlign={"center"}
        >
          <Heading fontSize={{ base: "inherit", md: 16 }}>
            Where's Waldo?!
          </Heading>
          {
            !isLocation && (
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
            )
            // <HStack boxSize={{ base: 10, md: 20 }} justifyContent="center">

            // </HStack>
          }

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

          {/* <Text fontSize={{ base: "inherit", md: 20 }} fontStyle={"italic"}>
            Find Waldo and his friends!
          </Text> */}
        </HStack>
      </Box>
      <Flex justifyContent="center" alignItems="center">
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
    </Box>
  );
};

export default NavBar;
