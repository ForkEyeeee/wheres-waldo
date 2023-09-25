import { HStack, VStack, Text, Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getLeaderBoard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_ENDPOINT}/leaderboard`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        } else {
          const json = await response.json();
          setData(json.users);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLeaderBoard();
  }, []);

  return (
    <Box>
      <Heading>Leaderboard</Heading>
      <HStack>
        <VStack></VStack>
        <VStack></VStack>
      </HStack>
    </Box>
  );
};

export default LeaderBoard;
