import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  Input,
  FormControl,
  FormLabel,
  ModalBody,
  Center,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { MouseEvent } from "react";
import setJWT from "./utils/setJWT";
import { InfoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface Props {
  handleClick: (event: MouseEvent) => void;
  onClose: () => void;
  setGameState: React.Dispatch<
    React.SetStateAction<{
      start: null | boolean;
      win: null | boolean;
    }>
  >;
  gameState: {
    start: null | boolean;
    win: null | boolean;
  };
  setName: React.Dispatch<React.SetStateAction<string>>;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
}

const GameStartModal = ({
  handleClick,
  onClose,
  setGameState,
  gameState,
  setName,
  setStartTime,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Box data-testid="game-start-modal">
      <WheresWaldoBackground handleClick={handleClick} />
      <Modal onClose={onClose} isOpen={!gameState.win} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Popover placement={"top"}>
            <Box>
              <ModalHeader
                flexGrow={"1"}
                fontSize={{ base: 15, md: "inherit" }}
                textAlign={"center"}
              >
                Hey there, are you ready to play?
                <span className="info-button">
                  <PopoverTrigger>
                    <InfoIcon color={"blue.400"} ml={"10px"} />
                  </PopoverTrigger>
                </span>
              </ModalHeader>{" "}
            </Box>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader textAlign="center" fontWeight={"bold"}>
                Quick Guide
              </PopoverHeader>
              <PopoverBody textAlign={"center"}>
                Find the 3 characters that are hidden in the background image.
                Feedback will be given on correct or incorrect choices. Try to
                get a high score. <br /> Press <em>"View Leaderboard"</em> to
                see the scoreboard.
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <ModalBody>
            <form
              onSubmit={async event => {
                event.preventDefault();
                setGameState({
                  start: true,
                  win: gameState.win,
                });
                const serverStartTime = await setJWT(event);
                setStartTime(serverStartTime);
                onClose();
              }}
            >
              <FormControl isRequired={true}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={e => setName(e.target.value)}
                  maxLength={30}
                  required
                />
              </FormControl>
              <Center p={3}>
                <HStack spacing={8}>
                  <Button
                    variant={"ghost"}
                    colorScheme="linkedin"
                    onClick={() => navigate("/leaderboard")}
                  >
                    View Leaderboard
                  </Button>
                  <Button type="submit" variant={"solid"} colorScheme="green">
                    Start
                  </Button>
                </HStack>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameStartModal;
