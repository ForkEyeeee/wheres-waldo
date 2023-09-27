import { Text } from "@chakra-ui/react";

const UserNameScore = ({ children }: { children: string[] }) => {
  return (
    <>
      <Text
        fontStyle={"italic"}
        fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
      >
        {children[0]}
      </Text>
      <Text
        fontWeight={"medium"}
        fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
      >
        {children[1]}
      </Text>
    </>
  );
};

export default UserNameScore;
