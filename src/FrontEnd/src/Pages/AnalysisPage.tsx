// import React from "react";
import LineChart from "../Components/LineChart";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import Header from "../Components/Header";
import Button from "../Components/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AnalysisPage.css";

interface analysisPageDataItem {
  vehicle: string;
  dangerScore: number;
}

function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const analysisPageData = location.state
    ?.analysisPageData as analysisPageDataItem[];
  console.log("Chart Data:", analysisPageData);
  const year = location.state?.year || "";
  // Add a null check
  if (!analysisPageData) {
    return <>No data available</>;
  }
  const chartData = {
    labels: analysisPageData.map((DataItem) => DataItem.vehicle),
    datasets: [
      {
        label: "Danger Score",
        data: analysisPageData.map((DataItem) => Number(DataItem.dangerScore)),
      },
    ],
  };

  return (
    <div className="analysis-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        &lt; Back to Input Page
      </button>
      <div className="analysis-header">
        <Header
          header="Car Crash Data"
          subHeader={`${year} Car Crash Data Analysis Complete! `}
        />
      </div>

      <div className="chart-container">
        <h2 className="chart-header">Pie Chart: Danger Score Distribution</h2>
        <PieChart data={chartData} />
      </div>
      <div className="chart-container">
        <h2 className="chart-header">Line Chart: Danger Score Trends</h2>
        <LineChart data={chartData} />
      </div>
      <div className="chart-container">
        <h2 className="chart-header">Bar Chart: Danger Score Comparison</h2>
        <BarChart data={chartData} />
      </div>
    </div>
  );
}

export default AnalysisPage;
