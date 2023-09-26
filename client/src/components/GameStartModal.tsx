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
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { MouseEvent } from "react";
import setJWT from "./utils/setJWT";

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
  return (
    <Box data-testid="game-start-modal">
      <WheresWaldoBackground handleClick={handleClick} />
      <Modal onClose={onClose} isOpen={!gameState.win} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you ready to play Where's Waldo?</ModalHeader>
          <ModalBody>
            {" "}
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
                <Button type="submit" variant={"solid"} colorScheme="green">
                  Start
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameStartModal;
