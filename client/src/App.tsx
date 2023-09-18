import { Routes, Route } from "react-router-dom";
import PopOverMenu from "./components/PopOverMenu";
import "./styles.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PopOverMenu />} />
      </Routes>
    </>
  );
};

export default App;
