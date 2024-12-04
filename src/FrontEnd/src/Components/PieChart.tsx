import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Colors } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

//declare the props that will be passed into the PieGraph function
interface PieGraphProps {
  data: any;
  options?: any;
  className?: string;
}

//render a pie graph with data and optional options
function PieGraph({ data, options }: PieGraphProps) {
  return (
    <div className={"pie-chart"}>
      <Pie data={data} options={options} />;
    </div>
  );
}

export default PieGraph;
