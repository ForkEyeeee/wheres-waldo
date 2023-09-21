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
  UnorderedList,
} from "@chakra-ui/react";
import WheresWaldoImage from "./WheresWaldoImage";

const PopOverMenu = () => {
  const [coords, setCoords] = useState<{
    pageX?: null | number;
    pageY?: null | number;
  }>({
    pageX: null,
    pageY: null,
  });

  const [isPopUp, setIsPopUp] = useState(false);
  const [popupCoords, setPopUpCoords] = useState({});

  type Coordinates = {
    pageX: number;
    pageY: number;
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>): void => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();

    const xRelativeToElement = clientX - rect.left;
    const yRelativeToElement = clientY - rect.top;

    const xPercentage = (xRelativeToElement / rect.width) * 100;
    const yPercentage = (yRelativeToElement / rect.height) * 100;

    setCoords({ pageX: xPercentage, pageY: yPercentage });
    setPopUpCoords({
      pageX: Number(event.clientX - 40),
      pageY: Number(event.clientY - 40),
    });
    setIsPopUp(!isPopUp);
  };

  // const handleClick = ({ pageX, pageY }: Coordinates): void => {
  //   console.log(event.clientY);
  //   console.log(event.clientX);
  //   setCoords({ pageX, pageY });
  //   setIsPopUp(!isPopUp);
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageX: coords.pageX, //pass the coordinates
          pageY: coords.pageY,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const json = await response.json();
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
        <WheresWaldoImage handleClick={handleClick} />
        <Box>
          <Popover
            isOpen={
              typeof coords.pageX === "undefined" &&
              typeof coords.pageY === "undefined"
                ? false
                : true
            }
            placement="bottom"
          >
            <PopoverTrigger>
              <Box
                display={isPopUp ? "inherit" : "none"}
                className={
                  typeof coords.pageX === "undefined" &&
                  typeof coords.pageY === "undefined"
                    ? ""
                    : "circle"
                }
                style={{
                  left: popupCoords.pageX,
                  top: popupCoords.pageY,
                }}
              />
            </PopoverTrigger>
            <PopoverContent display={isPopUp ? "inherit" : "none"}>
              <PopoverArrow ml={3} />
              <PopoverHeader>Choose your character</PopoverHeader>
              <PopoverBody>
                <UnorderedList>
                  <Button type="submit">Character 1</Button>
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </form>
    </>
  );
};

export default PopOverMenu;
