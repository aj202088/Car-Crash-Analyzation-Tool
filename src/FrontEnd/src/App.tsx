import { useState } from "react";
import Button from "./Components/Button";
import Header from "./Components/Header";
import InputBox from "./Components/InputBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleAnalyze = () => {
    const yearNumber = Number(year);
    if (yearNumber < 1996 || yearNumber > 2022 || isNaN(yearNumber)) {
      setMessage("Please enter a year between 1996 and 2022");
    } else {
      setMessage(`Analyzing data for the year ${year}...`);
      setTimeout(
        () => setMessage(`Finished Analyzing Data for year ${year}`),
        3000
      );
    }
  };

  return (
    <>
      <Header />
      <InputBox value={year} onChange={(e) => setYear(e.target.value)} />
      <Button
        buttonName="Analyze"
        onClick={handleAnalyze}
        buttonType="success"
      />
      <p>{message}</p>
    </>
  );
}

export default App;
