import { useState } from "react";

import "./App.css";

function App() {
  const [year, setYear] = useState<string>("");
  const [message, setMessage] = "";

  const handleAnalyze = () => {
    if (year.length !== 4 || isNaN(year)) {
      setMessage("Please enter a valid year");
    } else {
      setMessage("Analyzing crash data for year ${year}...");
    }
  };

  return (
    <>
      <h1>Car Crash Analyzation Tool</h1>
      <p>Enter a year to analyze:</p>
      <input type="text" placeholder="e.g. 1999" />
      <button>Analyze</button>
      <button>Exit</button>
    </>
  );
}

export default App;
