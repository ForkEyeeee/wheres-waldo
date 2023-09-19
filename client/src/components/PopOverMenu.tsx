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
import { useLocation } from "react-router-dom";

const PopOverMenu = () => {
  const [coords, setCoords] = useState<{
    pageX: string | number | undefined;
    pageY: string | number | undefined;
  }>({
    pageX: undefined,
    pageY: undefined,
  });

  console.log(useLocation().pathname);

  const [isPopUp, setIsPopUp] = useState(false);

  type Coordinates = {
    pageX: number;
    pageY: number;
  };

  const handleClick = ({ pageX, pageY }: Coordinates): void => {
    setCoords({ pageX, pageY });
    setIsPopUp(!isPopUp);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        location,
        //fetch api GET route for wheres Waldo location
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageX: coords.pageX, //pass the coordinates
            pageY: coords.pageY,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
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
        <Popover
          isOpen={
            typeof coords.pageX === "undefined" &&
            typeof coords.pageY === "undefined"
              ? false
              : true
          }
        >
          <PopoverTrigger>
            <Box
              display={isPopUp ? "inherit" : "none"}
              className={
                typeof coords.pageX === "undefined" &&
                typeof coords.pageY === "undefined"
                  ? ""
                  : "dot"
              }
              style={{ left: coords.pageX, top: coords.pageY }}
            />
          </PopoverTrigger>
          <PopoverContent display={isPopUp ? "inherit" : "none"}>
            <PopoverArrow />
            <PopoverHeader>Choose your character</PopoverHeader>
            <PopoverBody>
              <UnorderedList>
                <Button type="submit">Character 1</Button>
              </UnorderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </form>
    </>
  );
};

export default PopOverMenu;
