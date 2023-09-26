import {
  HStack,
  VStack,
  Text,
  Box,
  Heading,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Score from "./Score";
import UserName from "./UserName";

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
          console.log(json);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLeaderBoard();
  }, []);
  console.log(data);
  return (
    <Box>
      <Center>
        <Heading>Leaderboard</Heading>
      </Center>
      <Center>
        <HStack spacing={100}>
          <VStack>
            {data &&
              data.map(user => (
                <Box>
                  <UserName>{user.username}</UserName>
                </Box>
              ))}
          </VStack>
          <VStack>
            {data &&
              data.map(user => (
                <Box>
                  <Score>{user.time}</Score>
                </Box>
              ))}
          </VStack>
        </HStack>
      </Center>
    </Box>
  );
};

export default LeaderBoard;
