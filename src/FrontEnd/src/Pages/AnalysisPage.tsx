import LineChart from "../Components/LineChart";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import { useState } from "react";
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
  //initialized state variables to be used throughout the file
  const navigate = useNavigate();
  const location = useLocation();
  const [chart, setChart] = useState("");
  const analysisPageData = location.state
    ?.analysisPageData as analysisPageDataItem[];
  console.log("Chart Data:", analysisPageData);
  const year = location.state?.year || "";
  //null check
  if (!analysisPageData) {
    return <>No data available</>;
  }
  //chart data variable that holds the data recieved from backend
  const chartData = {
    labels: analysisPageData.map((DataItem) => DataItem.vehicle),
    datasets: [
      {
        label: "Danger Score",
        data: analysisPageData.map((DataItem) => Number(DataItem.dangerScore)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(0, 128, 0, 0.6)",
          "rgba(0, 0, 128, 0.6)",
          "rgba(255, 20, 147, 0.6)",
          "rgba(128, 0, 128, 0.6)",
        ],
      },
    ],
  };
  // Render for the charts through nav bar
  function renderChart() {
    switch (chart) {
      // Line chart rendering
      case "LineChart":
        return (
          <div className="chart-container">
            <h2 className="chart-header">Line Chart: Danger Score Trends</h2>
            <LineChart data={chartData} />
          </div>
        );
      // Bar chart rendering
      case "BarChart":
        return (
          <div className="chart-container">
            <h2 className="chart-header">Bar Chart: Danger Score Comparison</h2>
            <BarChart data={chartData} />
          </div>
        );
      // Pie chart rendering (Default chart)
      default:
        return (
          <div className="pie-chart-container">
            <h2 className="chart-header">
              Pie Chart: Danger Score Distribution
            </h2>
            <PieChart data={chartData} />
          </div>
        );
    }
  }
  // Output on Analysis page structure
  return (
    <div className="analysis-page">
      <button className="back-button" onClick={() => navigate("/")}>
        &lt; Back to Input Page
      </button>
      <div className="analysis-header">
        <Header
          header="Car Crash Data"
          subHeader={`${year} Car Crash Data Analysis Complete! `}
        />
      </div>

      <div className="chart-controls">
        <Button buttonName="Pie Chart" onClick={() => setChart("PieChart")} />
        <Button buttonName="Line Chart" onClick={() => setChart("LineChart")} />
        <Button buttonName="Bar Chart" onClick={() => setChart("BarChart")} />
      </div>
      <div className="chart-container">{renderChart()}</div>
    </div>
  );
}

export default AnalysisPage;
