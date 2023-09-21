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
import { MouseEvent } from "react";

const PopOverMenu = () => {
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

  const handleClick = (event: MouseEvent): void => {
    const { clientX, clientY } = event;

    const rect = event.currentTarget.getBoundingClientRect();

    const xRelativeToElement = clientX - rect.left;
    const yRelativeToElement = clientY - rect.top;

    const xPercentage = (xRelativeToElement / rect.width) * 100;
    const yPercentage = (yRelativeToElement / rect.height) * 100;

    setImageCoords({ pageX: xPercentage, pageY: yPercentage });
    setPopUpCoords({
      pageX: xRelativeToElement - 35,
      pageY: yRelativeToElement + 15,
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
          pageX: imageCoords.pageX, //pass the coordinates
          pageY: imageCoords.pageY,
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
