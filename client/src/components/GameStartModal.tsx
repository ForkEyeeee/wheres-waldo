import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
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
          <ModalFooter justifyContent={"center"}>
            <FormControl>
              <FormLabel>Enter your name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={e => setName(e.target.value)}
              />
            </FormControl>
            <Button
              onClick={async event => {
                setGameState({
                  start: true,
                  win: gameState.win,
                });
                const serverStartTime = await setJWT(event);
                setStartTime(serverStartTime);
                onClose();
              }}
            >
              Start
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameStartModal;
