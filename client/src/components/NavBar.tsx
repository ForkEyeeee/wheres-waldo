import { Box, HStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
// import parseJwt from "./utils/parseJWT";
// import validateToken from "./utils/validateToken";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import { useState } from "react";

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
          <HStack justifyContent="space-around"></HStack>
        </Box>
      </>
      <Flex justifyContent={"center"}>
        <Divider pt={5} width={"50%"} />
      </Flex>
    </Box>
  );
};

export default NavBar;
