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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import SonicImage from "./SonicImage";
import WaldoImage from "./WaldoImage";
import DeathImage from "./DeathImage";
import { MouseEvent } from "react";

interface Props {
  currentcharacter: string;
  setCurrentCharacter: React.Dispatch<React.SetStateAction<string>>;
  allCharacters: Array<string>;
  setAllCharacters: React.Dispatch<React.SetStateAction<string[]>>;
  gameState: any;
  setGameState: any;
}

const PopOverMenu = ({
  currentcharacter,
  setCurrentCharacter,
  allCharacters,
  setAllCharacters,
  gameState,
  setGameState,
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

  const [isPopUp, setIsPopUp] = useState(false);

  const [markerCoords, setMarkerCoords] = useState<
    {
      pageX: null | number | undefined | string;
      pageY: null | number | undefined | string;
    }[]
  >([
    {
      pageX: null,
      pageY: null,
    },
  ]);

  useEffect(() => {
    if (allCharacters.length > 2) {
      setGameState({
        start: true,
        win: true,
      });
      setAllCharacters([]);
      setCurrentCharacter("");
      // setImageCoords({ pageX: null, pageY: null });
      setPopUpCoords({
        pageX: "",
        pageY: "",
      });
      setIsPopUp(false);
      setMarkerCoords([
        {
          pageX: null,
          pageY: null,
        },
      ]);
    }
  }, [allCharacters]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elapsedTime, setElapsedtime] = useState(0);
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
        console.log(json);

        if (json.success) {
          markerCoords.length <= 0
            ? setMarkerCoords([
                ...markerCoords,
                { pageX: popupCoords.pageX, pageY: popupCoords.pageY },
              ])
            : setMarkerCoords([
                { pageX: popupCoords.pageX, pageY: popupCoords.pageY },
              ]);

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
          if (!gameState.start)
            toast({
              title: `No ones here!`,
              description: "Keep trying",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecordInitialTime = async (event: any) => {
    event.preventDefault();
    console.log("recoridng intial time");
    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: Math.floor(Date.now() / 1000),
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
        if (json.success) {
          setElapsedtime(json.elapsedTime);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddScore = async (e: any) => {
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
      console.log(response);

      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
        if (json.success) {
          setGameState({ start: false, win: false });
          console.log(json);
        } else {
        }

        //return json response boolean whether passed coords matches anything found in the database
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetGame = () => {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!gameState.start && (
          <Box>
            <WheresWaldoBackground handleClick={handleClick} />
            <Modal onClose={onClose} isOpen={!gameState.start} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Are you ready to play Where's Waldo?</ModalHeader>
                <ModalFooter justifyContent={"center"}>
                  <Button
                    onClick={() => {
                      handleRecordInitialTime(event);
                      onClose;
                      setGameState({
                        start: true,
                        win: gameState.win,
                      });
                    }}
                  >
                    Play
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        )}
        {gameState.win && (
          <Box>
            <WheresWaldoBackground handleClick={handleClick} />
            <Modal onClose={onClose} isOpen={gameState.win} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>You Win!</ModalHeader>
                <Text>{elapsedTime > 0 && elapsedTime}</Text>
                <ModalBody></ModalBody>

                <ModalFooter justifyContent={"center"}>
                  <form onSubmit={handleAddScore}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <Button type="submit">Submit & Play again</Button>
                  </form>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        )}
        <WheresWaldoBackground handleClick={handleClick} />
        {}
        {markerCoords[markerCoords.length - 1].pageX !== null &&
          markerCoords[markerCoords.length - 1].pageY !== null &&
          markerCoords.map((coord, index) => (
            <Box
              key={index}
              className="circle"
              style={{
                left: coord.pageX,
                top: coord.pageY,
              }}
            />
          ))}
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
                imageCoords.pageX === null && imageCoords.pageY === null
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
