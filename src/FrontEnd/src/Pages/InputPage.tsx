import { useState } from "react";
import Button from "../Components/Button";
import Header from "../Components/Header";
import InputBox from "../Components/InputBox";
import { useNavigate } from "react-router-dom";
import "./InputPage.css";

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
      return;
    } 
      setMessage(`Analyzing data for the year ${year}...`);

      // Make a POST request to backend
      try {
        const response = await fetch(`http://localhost:5000/run-cpp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ year: year }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to analyze data. Please try again."
          );
        }

        const processedData = data.top10Vehicles.map((vehicle: any) => ({
          vehicle: vehicle.vehicle,
          dangerScore: vehicle.score,
        }));
        setTimeout(() => {
          setMessage(`Finished Analyzing Data for year ${year}`);
          navigate("/AnalysisPage", {
            state: { analysisPageData: processedData },
          });
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while analyzing data.");
      }
    
  };

  return (
    <div className="input-page">
      <Header
        header="Car Crash Analysis Tool"
        subHeader="Please enter a year to analyze between 1996 and 2022"
      />
      <InputBox value={year} onChange={(e) => setYear(e.target.value)} />
      <Button
        buttonName="Analyze"
        onClick={handleAnalyze}
        buttonType="success"
      />
      <p>{message}</p>
      <footer className="footer">
        Powered By: <span className="brand">AJA Carsss™</span>
      </footer>
      <p></p>
    </div>
  );
}

export default InputPage;
