import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

interface BarGraphProps {
  data: any;
  options?: any;
}

function BarGraph({ data, options }: BarGraphProps) {
  return <Bar data={data} options={options} />;
}

export default BarGraph;
