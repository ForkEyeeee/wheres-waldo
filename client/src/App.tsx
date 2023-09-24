import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PopOverMenu from "./components/PopOverMenu";
import NavBar from "./components/NavBar";
import "./styles.css";
import { start } from "repl";

const App = (props: any) => {
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

  console.log(startTime);
  return (
    <>
      <NavBar
        gameState={gameState}
        startTime={startTime}
        setStartTime={setStartTime}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PopOverMenu
              currentcharacter={currentcharacter}
              setCurrentCharacter={setCurrentCharacter}
              chosenCharacters={chosenCharacters}
              setChosenCharacters={setChosenCharacters}
              gameState={gameState}
              setGameState={setGameState}
              name={name}
              setName={setName}
              startTime={startTime}
              setStartTime={setStartTime}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
