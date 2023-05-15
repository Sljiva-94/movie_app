import React from "react";
import "./App.css";
import Filter from "./components/Filter/Filter";

function App() {
  const handleOptionChange = (selectedOption: string) => {
    console.log("Selected Option:", selectedOption);
  };
  return (
    <>
      <Filter onOptionChange={handleOptionChange} />
    </>
  );
}

export default App;
