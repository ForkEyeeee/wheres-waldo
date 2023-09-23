import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PopOverMenu from "./components/PopOverMenu";
import NavBar from "./components/NavBar";
import "./styles.css";

const App = (props: any) => {
  const [currentcharacter, setCurrentCharacter] = useState<string>("");
  const [allCharacters, setAllCharacters] = useState<string[]>([]);
  const [gameState, setGameState] = useState<{
    start: null | boolean;
    win: null | boolean;
  }>({
    start: false,
    win: false,
  });
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PopOverMenu
              currentcharacter={currentcharacter}
              setCurrentCharacter={setCurrentCharacter}
              allCharacters={allCharacters}
              setAllCharacters={setAllCharacters}
              gameState={gameState}
              setGameState={setGameState}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
