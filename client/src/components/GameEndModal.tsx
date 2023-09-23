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
} from "@chakra-ui/react";
import WheresWaldoBackground from "./WheresWaldoBackground";
import { MouseEvent } from "react";

interface Props {
  handleClick: (event: MouseEvent) => void;
  handleAddScore: any;
  onClose: any;
  gameState: any;
  elapsedTime: any;
}

const GameEndModal = ({
  handleClick,
  handleAddScore,
  onClose,
  gameState,
  elapsedTime,
}: Props) => {
  return (
    <Box>
      <WheresWaldoBackground handleClick={handleClick} />
      <Modal onClose={onClose} isOpen={gameState.win} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You Win!</ModalHeader>
          <ModalBody>{elapsedTime > 0 && elapsedTime}</ModalBody>

          <ModalFooter justifyContent={"center"}>
            <form onSubmit={handleAddScore}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" placeholder="Enter your name" />
              </FormControl>
              <Button type="submit">Submit & Play again</Button>
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameEndModal;
