import { Image } from "@chakra-ui/react";
import sonicImage from "/assets/images/death.jpg";
import { MouseEvent } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  handleClick: (event: MouseEvent) => void;
}

const DeathImage = ({ setCharacter }: Props) => {
  return (
    <Box _hover={{ bg: "green" }}>
      <Image
        onClick={() => setCharacter("Sonic The Hedgehog")}
        cursor={"pointer"}
        src={sonicImage}
        // boxSize={"sm"}
      />
    </Box>
  );
};

export default DeathImage;