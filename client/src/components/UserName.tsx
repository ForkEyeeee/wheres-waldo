import { Text } from "@chakra-ui/react";

const UserName = ({ children }) => {
  return (
    <Text fontWeight={"medium"} fontSize={"5xl"}>
      {children}
    </Text>
  );
};

export default UserName;
