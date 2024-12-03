// Example for LineChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineGraphProps {
  data: any;
  options?: any;
}

function LineGraph({ data, options }: LineGraphProps) {
  return <Line data={data} options={options} />;
}

export default LineGraph;
