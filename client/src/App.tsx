import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PopOverMenu from "./components/PopOverMenu";
import NavBar from "./components/NavBar";
import "./styles.css";

const App = () => {
  const [currentcharacter, setCurrentCharacter] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
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
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
