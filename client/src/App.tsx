import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PopOverMenu from "./components/PopOverMenu";
import NavBar from "./components/NavBar";
import "./styles.css";

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
  const [counter, setCounter] = useState<{
    seconds: null | number;
    minutes: null | number;
  }>({
    seconds: 0,
    minutes: 0,
  });
  // const [minutes, setminutes] = useState(0);

  const [name, setName] = useState("");
  return (
    <>
      <NavBar gameState={gameState} counter={counter} setCounter={setCounter} />
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
              counter={counter}
              setCounter={setCounter}
              name={name}
              setName={setName}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
