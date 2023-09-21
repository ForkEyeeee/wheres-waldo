import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PopOverMenu from "./components/PopOverMenu";
import NavBar from "./components/NavBar";
import "./styles.css";

const App = () => {
  const [character, setCharacter] = useState("");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<PopOverMenu setCharacter={setCharacter} />} />
      </Routes>
    </>
  );
};

export default App;
