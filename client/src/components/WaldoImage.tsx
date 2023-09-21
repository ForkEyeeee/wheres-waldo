import { Image, border } from "@chakra-ui/react";
import waldoImage from "/assets/images/waldo.png";
import { MouseEvent } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>;
  allCharacters: Array<string>;
}
const WaldoImage = ({ setCurrentCharacter, allCharacters }: Props) => {
  return (
    <>
      {!allCharacters.includes("Waldo") && (
        <Box _hover={{ bg: "green" }}>
          <Image
            onClick={() => setCurrentCharacter("Waldo")}
            cursor={"pointer"}
            src={waldoImage}
            data-testid="waldo-image"
          />
        </Box>
      )}
    </>
  );
};

export default WaldoImage;
