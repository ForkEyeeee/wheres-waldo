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
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import SonicImage from "./SonicImage";
import WaldoImage from "./WaldoImage";
import DeathImage from "./DeathImage";
import GameStartModal from "./GameStartModal";
import GameEndModal from "./GameEndModal";
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
      pageX: number | undefined | string;
      pageY: number | undefined | string;
    }[]
  >([
    {
      pageX: undefined,
      pageY: undefined,
    },
  ]);

  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (allCharacters.length > 2) {
      setGameState({
        start: true,
        win: true,
      });
      setAllCharacters([]);
      setCurrentCharacter("");
      setPopUpCoords({
        pageX: "",
        pageY: "",
      });
      setIsPopUp(false);
      setMarkerCoords([
        {
          pageX: undefined,
          pageY: undefined,
        },
      ]);
      setEndTime(Math.floor(Date.now() / 1000));
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
          time: endTime,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
        if (json.success) {
          setGameState({ start: false, win: false });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!gameState.start && (
          <>
            <GameStartModal
              handleClick={handleClick}
              handleRecordInitialTime={handleRecordInitialTime}
              onClose={onClose}
              setGameState={setGameState}
              gameState={gameState}
            />
          </>
        )}
        {gameState.win && (
          <GameEndModal
            handleClick={handleClick}
            handleAddScore={handleAddScore}
            onClose={onClose}
            gameState={gameState}
            elapsedTime={elapsedTime}
          />
        )}
        <WheresWaldoBackground handleClick={handleClick} />
        {markerCoords[markerCoords.length - 1].pageX !== undefined &&
          markerCoords[markerCoords.length - 1].pageY !== undefined &&
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
              <VStack data-testid="popover-buttons">
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
