import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
const Image = () => {
  // const [isPopUp, setIsPopUp] = useState(false);

  // const handlePopUp = (): void => {
  //   setIsPopUp(!isPopUp);
  // };

  // return (
  //   <>
  //     <Popover placement="top-start" arrowSize={0}>
  //       <PopoverTrigger>
  //         <Box onClick={handlePopUp}>TEST</Box>
  //       </PopoverTrigger>
  //       <PopoverContent>
  //         <PopoverArrow />
  //         <PopoverCloseButton />
  //         <PopoverHeader>Confirmation!</PopoverHeader>
  //         <PopoverBody>
  //           Are you sure you want to have that milkshake?
  //         </PopoverBody>
  //       </PopoverContent>
  //     </Popover>
  //   </>
  // );
  const [popUp, setPopup] = useState<{
    pageX: string | number | undefined;
    pageY: string | number | undefined;
  }>({
    pageX: undefined,
    pageY: undefined,
  });

  type Coordinates = {
    pageX: number;
    pageY: number;
  };

  const handleClick = ({ pageX, pageY }: Coordinates): void => {
    setPopup({ pageX, pageY });
  };

  return (
    <Box className="app" onClick={handleClick}>
      <Box
        className={
          popUp.pageX === undefined && popUp.pageY === undefined ? "" : "box"
        }
        style={{ left: popUp.pageX, top: popUp.pageY }}
      ></Box>
    </Box>
  );
};

export default Image;
