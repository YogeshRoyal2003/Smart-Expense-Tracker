import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {

  const categoryTotals = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0"
        ]
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-3">
        📊 Expense by Category
      </h2>
      <div className="w-80 mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default ExpenseChart;