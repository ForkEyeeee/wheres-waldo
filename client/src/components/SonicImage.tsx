import { Image } from "@chakra-ui/react";
import sonicImage from "/assets/images/sonic.webp";
import { MouseEvent } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  handleClick: (event: MouseEvent) => void;
}

const SonicImage = ({ setCurrentCharacter }: Props) => {
  return (
    <Box _hover={{ bg: "green" }}>
      <Image
        onClick={() => setCurrentCharacter("Sonic The Hedgehog")}
        cursor={"pointer"}
        src={sonicImage}
      />
    </Box>
  );
};

export default SonicImage;
