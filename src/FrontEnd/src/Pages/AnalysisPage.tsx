// import React from "react";
import LineChart from "../Components/LineChart";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import Header from "../Components/Header";
// import Button from "../Components/Button";
import { useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";

interface analysisPageDataItem {
  vehicle: string;
  dangerScore: number;
}

function AnalysisPage() {
  const location = useLocation();
  const analysisPageData = location.state
    ?.analysisPageData as analysisPageDataItem[];
  console.log("Chart Data:", analysisPageData);
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
    <>
      <Header header="Car Crash Data" subHeader="" />
      <PieChart data={chartData} />
      <LineChart data={chartData} />
      <BarChart data={chartData} />
    </>
  );
}

export default AnalysisPage;
