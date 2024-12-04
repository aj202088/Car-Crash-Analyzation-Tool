import { useState } from "react";
import Button from "../Components/Button";
import Header from "../Components/Header";
import InputBox from "../Components/InputBox";
import { useNavigate } from "react-router-dom";

function InputPage() {
  //declaring state variables for input and message
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Default 3000 port, if not would be production url (npm install --save-dev @types/node)
  // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  const handleAnalyze = async () => {
    const yearNumber = Number(year);
    if (yearNumber < 1996 || yearNumber > 2022 || isNaN(yearNumber)) {
      setMessage("Please enter a year between 1996 and 2022");
    } else {
      setMessage(`Analyzing data for the year ${year}...`);

      // Make a POST request to backend
      try {
        const response = await fetch(`http://localhost:3000/run-cpp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ year: year }),
        });

        if (!response.ok) {
          throw new Error("Failed to analyze data. Please try again.");
        }

        const data = await response.json();
        // setTopVehicles(data);
        setTimeout(() => {
          setMessage(`Finished Analyzing Data for year ${year}`);
          navigate("/AnalysisPage", {
            state: { analysisPageData: data.analysisData },
          });
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while analyzing data.");
      }
    }
  };

  return (
    <>
      <Header
        header="Car Crash Analysis Tool"
        subHeader="Please enter year to analyze"
      />
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

export default InputPage;
