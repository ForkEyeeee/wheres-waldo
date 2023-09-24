import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { MouseEvent } from "react";

interface Props {
  handleClick: (event: MouseEvent) => void;
  handleAddScore: any;
  onClose: any;
  gameState: any;
}

const GameEndModal = ({
  handleClick,
  handleAddScore,
  onClose,
  gameState,
  highScore,
  setGameState,
}: Props) => {
  return (
    <Box data-testid="game-end-modal">
      <WheresWaldoBackground handleClick={handleClick} />
      <Modal onClose={onClose} isOpen={gameState.win} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {highScore ? "Congratulations!" : "Better luck next time."}
          </ModalHeader>
          <ModalBody>
            {highScore ? (
              <Text>You got a high score of {highScore}!</Text>
            ) : (
              <Text>No high score this time.</Text>
            )}
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={() =>
                setGameState({ start: gameState.start, win: false })
              }
            >
              {highScore ? "Play again" : "Try again"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameEndModal;
