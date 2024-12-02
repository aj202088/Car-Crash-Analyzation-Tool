import { useState } from "react";
import Button from "./Components/Button";
import Header from "./Components/Header";
import InputBox from "./Components/InputBox";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

function App() {
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleAnalyze = async () => {
    const yearNumber = Number(year);
    if (yearNumber < 1996 || yearNumber > 2022 || isNaN(yearNumber)) {
      setMessage("Please enter a year between 1996 and 2022");
    } else {
      setMessage(`Analyzing data for the year ${year}...`);
      
      // Make a POST request to backend
      try {
        const response = await fetch("http://localhost:3000/run-cpp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({year : yearNumber}),
        });
        
        if (!response.ok) {
          throw new Error("Failed to analyze data. Please try again.");
        }

        const data = await response.json();

        setTimeout(
          () => setMessage(`Finished Analyzing Data for year ${year}`),
          3000
        );
      }
      catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while analyzing data.");
      }
      
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
