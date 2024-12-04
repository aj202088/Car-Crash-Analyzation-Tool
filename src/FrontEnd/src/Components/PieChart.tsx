import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieGraphProps {
  data: any;
  options?: any;
}

function PieGraph({ data, options }: PieGraphProps) {
  return <Pie data={data} options={options} />;
}

export default PieGraph;
