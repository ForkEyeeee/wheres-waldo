import { Text } from "@chakra-ui/react";

const UserNameScore = ({ children }: { children: string[] }) => {
  return (
    <>
      <Text fontStyle={"italic"} fontSize={"5xl"}>
        {children[0]}
      </Text>
      <Text fontWeight={"medium"} fontSize={"5xl"}>
        {children[2]}
      </Text>
    </>
  );
};

export default UserNameScore;
