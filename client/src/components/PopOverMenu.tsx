import { useState } from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Button,
  VStack,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import SonicImage from "./sonicImage";
import WaldoImage from "./WaldoImage";
import DeathImage from "./DeathImage";
import { MouseEvent } from "react";

const PopOverMenu = ({
  currentcharacter,
  setCurrentCharacter,
  allCharacters,
  setAllCharacters,
}) => {
  const [imageCoords, setImageCoords] = useState<{
    pageX?: null | number;
    pageY?: null | number;
  }>({
    pageX: null,
    pageY: null,
  });

  const [popupCoords, setPopUpCoords] = useState<{
    pageX?: string | number;
    pageY?: string | number;
  }>({
    pageX: "",
    pageY: "",
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const toast = useToast();
  const handleClick = (event: MouseEvent): void => {
    const { clientX, clientY } = event;

    const rect = event.currentTarget.getBoundingClientRect();

    const xRelativeToElement = clientX - rect.left;
    const yRelativeToElement = clientY - rect.top;

    const xPercentage = (xRelativeToElement / rect.width) * 100;
    const yPercentage = (yRelativeToElement / rect.height) * 100;

    setImageCoords({ pageX: xPercentage, pageY: yPercentage });
    setPopUpCoords({
      pageX: xRelativeToElement - 40,
      pageY: yRelativeToElement + 55,
    });
    setIsPopUp(!isPopUp);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          character: currentcharacter,
          pageX: imageCoords.pageX, //pass the coordinates
          pageY: imageCoords.pageY,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
        if (json.characterName === currentcharacter) {
          console.log(allCharacters.length);
          // const getCharacters = allCharacters.length <= 1 ? currentcharacter : ...allCharacters, currentcharacter
          setAllCharacters(
            allCharacters.length <= 0
              ? [currentcharacter]
              : [...allCharacters, currentcharacter]
          );

          toast({
            title: `You found ${currentcharacter}!`,
            description: "Find the rest!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: `No ones here!`,
            description: "Keep trying",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        if (allCharacters.length >= 2) {
        }
        console.log(json);
        //return json response boolean whether passed coords matches anything found in the database
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <WheresWaldoBackground handleClick={handleClick} />
        <Popover
          isOpen={
            typeof imageCoords.pageX === "undefined" &&
            typeof imageCoords.pageY === "undefined"
              ? false
              : true
          }
          placement="bottom"
        >
          <PopoverTrigger>
            <Box
              display={isPopUp ? "inherit" : "none"}
              className={
                typeof imageCoords.pageX === "undefined" &&
                typeof imageCoords.pageY === "undefined"
                  ? ""
                  : "circle"
              }
              style={{
                left: popupCoords.pageX,
                top: popupCoords.pageY,
              }}
            />
          </PopoverTrigger>
          <PopoverContent
            display={isPopUp ? "inherit" : "none"}
            maxW={"150px"}
            borderColor={"gray"}
          >
            <PopoverArrow ml={3} />
            <PopoverBody>
              <VStack>
                <button type="submit">
                  <WaldoImage
                    setCurrentCharacter={setCurrentCharacter}
                    allCharacters={allCharacters}
                  />
                </button>
                <button type="submit">
                  <SonicImage
                    setCurrentCharacter={setCurrentCharacter}
                    allCharacters={allCharacters}
                  />
                </button>{" "}
                <button type="submit">
                  <DeathImage
                    setCurrentCharacter={setCurrentCharacter}
                    allCharacters={allCharacters}
                  />
                </button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </form>
    </>
  );
};

export default PopOverMenu;
