import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function TripsChart() {
  const data = {
    labels: ["Suresh", "KL", "RR", "VL", "RL"],
    datasets: [
      {
        label: "Total Trips",
        data: [2000, 7000, 3000, 4300, 9500],
        borderColor: "#17C0EB",
        backgroundColor: "rgba(23, 192, 235, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#17C0EB",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
