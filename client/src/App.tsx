import { Routes, Route } from "react-router-dom";
import Image from "./components/Image";
import "./styles.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Image />} />
      </Routes>
    </>
  );
};

export default App;
