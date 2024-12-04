// import React from "react";
import LineChart from "../Components/LineChart";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import Header from "../Components/Header";
// gimport Button from "../Components/Button";
import { useLocation } from "react-router-dom";

interface analysisPageDataItem {
  category: string;
  fatalityCount: number;
}

function AnalysisPage() {
  const location = useLocation();
  const analysisPageData = location.state
    ?.analysisPageData as analysisPageDataItem[];
  console.log("Chart Data:", analysisPageData);
  // Add a null check
  if (!analysisPageData) {
    return <div>No data available</div>;
  }
  const chartData = {
    labels: analysisPageData.map((DataItem) => DataItem.category),
    datasets: [
      {
        label: "Fatality Count",
        data: analysisPageData.map((DataItem) => DataItem.fatalityCount),
      },
    ],
  };

  return (
    <>
      <Header header="Car Crash Data" subHeader="" />
      <LineChart data={chartData} />
      <BarChart data={chartData} />
      <PieChart data={chartData} />
    </>
  );
}

export default AnalysisPage;
