import { Box, HStack, Flex, Heading, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
// import parseJwt from "./utils/parseJWT";
// import validateToken from "./utils/validateToken";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import { useState } from "react";
import TimeCounter from "./TimeCounter";
const NavBar = () => {
  const navigate = useNavigate();

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
            <TimeCounter />
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
