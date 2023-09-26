import { Text } from "@chakra-ui/react";

const UserName = ({ children }: { children: string }) => {
  return (
    <Text fontWeight={"medium"} fontSize={"5xl"}>
      {children}
    </Text>
  );
};

export default UserName;
