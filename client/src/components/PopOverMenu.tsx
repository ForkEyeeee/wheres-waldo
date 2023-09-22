import { useState, useEffect } from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  VStack,
  useToast,
  useDisclosure,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import SonicImage from "./SonicImage";
import WaldoImage from "./WaldoImage";
import DeathImage from "./DeathImage";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { MouseEvent } from "react";

// use state to keep track of the time, display it

interface Props {
  currentcharacter: string;
  setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>;
  allCharacters: Array<string>;
  setAllCharacters: React.Dispatch<React.SetStateAction<string[]>>;
}

const PopOverMenu = ({
  currentcharacter,
  setCurrentCharacter,
  allCharacters,
  setAllCharacters,
  gameStart,
  setGameStart,
  gameWin,
  setGameWin,
}: Props) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isPopUp, setIsPopUp] = useState(false);

  useEffect(() => {
    if (allCharacters.length > 2) {
      setGameWin(true);
    }
  }, [allCharacters]);

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
        if (json.success) {
          console.log(allCharacters.length);
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
        if (allCharacters.length > 2) {
        }
        console.log(json);
        //return json response boolean whether passed coords matches anything found in the database
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecordInitialTime = async (event: any) => {
    event.preventDefault();
    // const formData = new FormData(e.target);
    // const name = formData.get("name");
    console.log("recoridng intial time");
    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // name: name,
          time: Math.floor(Date.now() / 1000),
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
        if (json.success) {
        } else {
        }

        //return json response boolean whether passed coords matches anything found in the database
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddScore = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          time: Math.floor(Date.now() / 1000),
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
        if (json.success) {
          console.log(json);
        } else {
        }

        //return json response boolean whether passed coords matches anything found in the database
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!gameStart && (
        <Box>
          <WheresWaldoBackground handleClick={handleClick} />
          <Modal onClose={onClose} isOpen={true} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Are you ready to play Where's Waldo?</ModalHeader>
              <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
              <ModalFooter justifyContent={"center"}>
                <Button
                  onClick={() => {
                    handleRecordInitialTime(event);
                    onClose;
                    setGameStart(true);
                  }}
                >
                  Play
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
      {gameWin && (
        <Box>
          <WheresWaldoBackground handleClick={handleClick} />
          <Modal onClose={onClose} isOpen={true} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>You Win!</ModalHeader>
              <ModalBody>
                <form onSubmit={handleAddScore}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <Button type="submit" onClick={() => onClose}>
                    Submit
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter justifyContent={"center"}>
                {/* <Button
                  onClick={() => {
                    onClose;
                    setGameStart(true);
                  }}
                >
                  Play
                </Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
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
