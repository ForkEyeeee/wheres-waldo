import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface Props {
  onClose: () => void;
  handleClick: (event: MouseEvent) => void;
  gameState: {
    start: null | boolean;
    win: null | boolean;
  };
  highScore: string;
  setGameState: React.Dispatch<
    React.SetStateAction<{
      start: null | boolean;
      win: null | boolean;
    }>
  >;
  name: string;
}

const GameEndModal = ({
  onClose,
  handleClick,
  gameState,
  highScore,
  setGameState,
  name,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Box data-testid="game-end-modal">
      <WheresWaldoBackground handleClick={handleClick} />
      <Modal onClose={onClose} isOpen={gameState.win as boolean} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {highScore
              ? `Congratulations! ${name}`
              : `You didn't get a highscore...`}
          </ModalHeader>
          <ModalBody>
            {highScore ? (
              <Text>You got a high score of {highScore}!</Text>
            ) : (
              <Text>Better luck next time, {name}</Text>
            )}
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <HStack>
              <Button
                colorScheme="green"
                variant={"ghost"}
                onClick={() => navigate("/leaderboard")}
              >
                View Leaderboard
              </Button>
              <Button
                colorScheme="red"
                onClick={() =>
                  setGameState({ start: gameState.start, win: false })
                }
              >
                {highScore ? "Play again" : "Try again"}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameEndModal;
