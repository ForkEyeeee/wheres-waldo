import { Text, Divider } from "@chakra-ui/react";

const Score = ({ children }) => {
  return (
    <Text fontStyle={"italic"} fontSize={"5xl"}>
      {children}
    </Text>
  );
};

export default Score;
