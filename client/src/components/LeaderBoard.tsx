import {
  HStack,
  VStack,
  Text,
  Box,
  Heading,
  Center,
  Divider,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Score from "./Score";
import UserName from "./UserName";
import useDataFetching from "../hooks/useDataFetching";
import { useLocation } from "react-router-dom";

const LeaderBoard = () => {
  const location = import.meta.env.VITE_ENDPOINT + useLocation().pathname;
  const [data, loading, error] = useDataFetching(location) as [
    DataProps | null,
    boolean,
    string
  ];

  if (loading)
    return (
      <Center p={10}>
        <HStack spacing={5}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Loading...</Text>
        </HStack>
      </Center>
    );

  if (error) {
    return (
      <Box>
        <Text>Failed to fetch post</Text>
      </Box>
    );
  }

  interface User {
    _id: string;
    username: string;
    time: string;
    __v: number;
  }

  interface DataProps {
    success: boolean;
    users: User[];
  }

  return (
    <Box>
      <Center p={10}>
        <Heading>Leaderboard</Heading>
      </Center>
      <Center>
        <VStack alignItems={"stretch"}>
          {data &&
            data.users.map(user => (
              <HStack spacing={100} justifyContent={"space-between"}>
                <UserName key={user._id}>{user.username}</UserName>
                <Score key={user._id}>{user.time}</Score>
              </HStack>
            ))}
        </VStack>
      </Center>
    </Box>
  );
};

export default LeaderBoard;
