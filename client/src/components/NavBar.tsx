import { Box, HStack, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import TimeCounter from "./TimeCounter";

const NavBar = ({ gameState }) => {
  return (
    <Box>
      <>
        <Box
          p={2}
          pt={5}
          bg="white"
          fontFamily={"inter"}
          fontSize={16}
          textTransform={"capitalize"}
        >
          <HStack justifyContent="space-between" alignItems={"center"}>
            <Heading>Where's Waldo?!</Heading>
            {gameState.start && !gameState.win && (
              <TimeCounter max={0} gameState={gameState} />
            )}
            <Text fontSize={20} fontStyle={"italic"}>
              Find Waldo and his friends!
            </Text>
          </HStack>
        </Box>
      </>
      <Flex justifyContent={"center"}>
        <Divider pt={5} width={"50%"} />
      </Flex>
    </Box>
  );
};

export default NavBar;
