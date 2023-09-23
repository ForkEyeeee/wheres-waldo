import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { MouseEvent } from "react";

interface Props {
  handleClick: (event: MouseEvent) => void;
  handleRecordInitialTime: any;
  onClose: any;
  setGameState: any;
  gameState: any;
}

const GameStartModal = ({
  handleClick,
  handleRecordInitialTime,
  onClose,
  setGameState,
  gameState,
}: Props) => {
  return (
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
  );
};

export default GameStartModal;
