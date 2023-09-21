import { Image } from "@chakra-ui/react";
import sonicImage from "/assets/images/sonic.webp";
import { MouseEvent } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  handleClick: (event: MouseEvent) => void;
}

const SonicImage = ({ setCurrentCharacter, allCharacters }: Props) => {
  return (
    <>
      {!allCharacters.includes("Sonic The Hedgehog") && (
        <Box _hover={{ bg: "green" }}>
          <Image
            onClick={() => setCurrentCharacter("Sonic The Hedgehog")}
            cursor={"pointer"}
            src={sonicImage}
            data-testid="sonic-image"
          />
        </Box>
      )}
    </>
  );
};

export default SonicImage;
