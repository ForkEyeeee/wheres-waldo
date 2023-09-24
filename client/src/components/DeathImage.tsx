import { Image } from "@chakra-ui/react";
import deathImage from "/assets/images/death.jpg";
import { Box } from "@chakra-ui/react";

interface Props {
  setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>;
  chosenCharacters: Array<string>;
}

const DeathImage = ({ setCurrentCharacter, chosenCharacters }: Props) => {
  return (
    <>
      {!chosenCharacters.includes("Death") && (
        <Box _hover={{ bg: "green" }}>
          <Image
            onClick={() => setCurrentCharacter("Death")}
            cursor={"pointer"}
            src={deathImage}
            role="death-image"
            data-testid="death-image"
          />
        </Box>
      )}
    </>
  );
};

export default DeathImage;
