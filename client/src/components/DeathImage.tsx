import { Image } from "@chakra-ui/react";
import deathImage from "/assets/images/death.jpg";
import { MouseEvent } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  handleClick: (event: MouseEvent) => void;
}

const DeathImage = ({ setCurrentCharacter, allCharacters }: Props) => {
  return (
    <>
      {!allCharacters.includes("Death") && (
        <Box _hover={{ bg: "green" }}>
          <Image
            onClick={() => setCurrentCharacter("Death")}
            cursor={"pointer"}
            src={deathImage}
          />
        </Box>
      )}
    </>
  );
};

export default DeathImage;
