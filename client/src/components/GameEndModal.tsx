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
  HStack,
  Text,
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { MouseEvent } from "react";
import { useState } from "react";
interface Props {
  handleClick: (event: MouseEvent) => void;
  handleAddScore: any;
  onClose: any;
  gameState: any;
  elapsedTime: any;
}

const GameEndModal = ({
  handleAddScore,
  onClose,
  gameState,
  counter,
  highScore,
  handleRecordInitialTime,
  setGameState,
  name,
  setName,
  setCounter,
  setHighScore,
}: Props) => {
  return (
    <Box data-testid="game-end-modal">
      <Modal onClose={onClose} isOpen={!gameState.start} isCentered>
        <ModalOverlay />
        {
          <ModalContent>
            {highScore ? (
              <ModalHeader>
                Enter your name and Press "Start" to play
              </ModalHeader>
            ) : (
              <ModalHeader>
                Enter your name and Press "Start" to play
              </ModalHeader>
            )}
            <ModalBody>
              <HStack>
                <Box>
                  <Box>{counter.minutes > 0 && counter.minutes + " mins"}</Box>
                  <Box>
                    <Box>{counter.seconds > 0 && counter.seconds + "s"}</Box>
                  </Box>
                  <Box>
                    <Box>{highScore && <Text>High score!</Text>}</Box>
                  </Box>
                </Box>
              </HStack>
            </ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
            <ModalFooter justifyContent={"center"}>
              <Button
                onClick={event => {
                  handleRecordInitialTime(event);
                  // onClose;
                  setGameState({
                    start: true,
                    win: gameState.win,
                  });
                  setHighScore(false);
                  // setCounter(0);
                  // setCounter({ minutes: 0 });
                  // setCounter({ seconds: 0 });
                }}
              >
                Start
              </Button>
            </ModalFooter>
            <ModalFooter justifyContent={"center"}></ModalFooter>
          </ModalContent>
        }
      </Modal>
    </Box>
  );
};

export default GameEndModal;
