import { Routes, Route } from "react-router-dom";
import PopOverMenu from "./components/PopOverMenu";
import NavBar from "./components/NavBar";
import "./styles.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<PopOverMenu />} />
      </Routes>
    </>
  );
};

export default App;
