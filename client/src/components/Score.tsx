import { Text, Divider } from "@chakra-ui/react";

const Score = ({ children }: { children: string }) => {
  return (
    <Text fontStyle={"italic"} fontSize={"5xl"}>
      {children}
    </Text>
  );
};

export default Score;
