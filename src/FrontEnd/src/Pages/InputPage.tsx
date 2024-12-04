import { useState } from "react";
import Button from "../Components/Button";
import Header from "../Components/Header";
import InputBox from "../Components/InputBox";
import { useNavigate } from "react-router-dom";
import "./InputPage.css";

function InputPage() {
  // Declaring state variables for input and message
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //handler for the analyze button
  const handleAnalyze = async () => {
    const yearNumber = Number(year);
    //validates the input
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

      //take the data and split it up into vehicle and dangerScore entries
      const processedData = data.top10Vehicles.map((vehicle: any) => ({
        vehicle: vehicle.vehicle,
        dangerScore: vehicle.score,
      }));
      //sets a delay for the process and redirects to analysis page. Sends data and year as state to be used in analysis page.
      setTimeout(() => {
        setMessage(`Finished Analyzing Data for year ${year}`);
        navigate("/AnalysisPage", {
          state: { analysisPageData: processedData, year: year },
        });
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while analyzing data.");
    }
  };

  //rendering for analysis page
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
        Powered By: <span className="brand">AJA Carssss™</span>
      </footer>
      <p></p>
    </div>
  );
}

export default InputPage;
