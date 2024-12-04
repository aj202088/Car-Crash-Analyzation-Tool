import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Colors } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

interface PieGraphProps {
  data: any;
  options?: any;
}

function PieGraph({ data, options }: PieGraphProps) {
  return <Pie data={data} options={options} />;
}

export default PieGraph;
