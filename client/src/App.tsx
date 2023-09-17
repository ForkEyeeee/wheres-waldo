import { Routes, Route } from "react-router-dom";

const App = () => {
  console.log(import.meta.env.VITE_SOME_KEY); // 123

  return (
    <>
      <Routes></Routes>
    </>
  );
};

export default App;
