import { Box, HStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
// import parseJwt from "./utils/parseJWT";
// import validateToken from "./utils/validateToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { Divider } from "@chakra-ui/react";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("");

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
          <HStack justifyContent="space-around">
            <ChakraLink as={ReactRouterLink} to={`/`} fontWeight={"bold"}>
              <HStack>
                <AiFillHome />
              </HStack>
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to={`/Aboutus`}
              textDecor={
                currentTab === `${import.meta.env.VITE_ENDPOINT}/Aboutus` &&
                "underline"
              }
            >
              About Us
            </ChakraLink>
            (
            <>
              <ChakraLink
                as={ReactRouterLink}
                to={`/users/new`}
                textDecor={
                  currentTab === `${import.meta.env.VITE_ENDPOINT}/users/new` &&
                  "underline"
                }
              >
                Sign Up
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to={`/session/new`}
                textDecor={
                  currentTab ===
                    `${import.meta.env.VITE_ENDPOINT}/session/new` &&
                  "underline"
                }
              >
                Login
              </ChakraLink>
            </>
            )
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
