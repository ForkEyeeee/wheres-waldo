import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import GameScreen from "./components/GameScreen";
import LeaderBoard from "./components/LeaderBoard";
import NavBar from "./components/NavBar";
import "./styles.css";

const App = () => {
  const [currentcharacter, setCurrentCharacter] = useState<string>("");
  const [chosenCharacters, setChosenCharacters] = useState<string[]>([]);
  const [gameState, setGameState] = useState<{
    start: null | boolean;
    win: null | boolean;
  }>({
    start: false,
    win: false,
  });
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [timeElapsed, setTimeElapsed] = useState<{
    seconds: null | number;
    minutes: null | number;
  }>({
    seconds: 0,
    minutes: 0,
  });

  return (
    <Box backgroundColor={"gray.100"}>
      <NavBar
        gameState={gameState}
        startTime={startTime}
        timeElapsed={timeElapsed}
        setTimeElapsed={setTimeElapsed}
      />
      <Routes>
        <Route
          path="/"
          element={
            <GameScreen
              currentcharacter={currentcharacter}
              setCurrentCharacter={setCurrentCharacter}
              chosenCharacters={chosenCharacters}
              setChosenCharacters={setChosenCharacters}
              gameState={gameState}
              setGameState={setGameState}
              name={name}
              setName={setName}
              setStartTime={setStartTime}
            />
          }
        />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </Box>
  );
};

export default App;
