import { Image } from "@chakra-ui/react";
import deathImage from "/assets/images/death.jpg";
import { Box } from "@chakra-ui/react";

interface Props {
  setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>;
  allCharacters: Array<string>;
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
            role="death-image"
            data-testid="death-image"
          />
        </Box>
      )}
    </>
  );
};

export default DeathImage;
