import React from "react";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [chart, setChart] = useState("");
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
  function renderChart() {
    if (chart === "LineChart") {
      return <LineChart data={chartData} />;
    } else if (chart === "BarChart") {
      return <BarChart data={chartData} />;
    } else if (chart === "PieChart") {
      return <PieChart data={chartData} />;
    } else {
      return <BarChart data={chartData} />;
    }
  }

  return (
    <>
      <Header
        header="Car Crash Data"
        subHeader={`${year} Car Crash Data Analysis Complete! `}
      />
      <>
        <Button buttonName="Line Graph" onClick={() => setChart("LineChart")} />
        <Button buttonName="Pie Graph" onClick={() => setChart("PieChart")} />
        <Button buttonName="Bar Graph" onClick={() => setChart("BarChart")} />
      </>
      <>{renderChart()}</>

      <Button
        buttonName="Back to Input Page"
        onClick={() => navigate("/")}
        buttonType="danger"
      />
    </>
  );
}

export default AnalysisPage;
