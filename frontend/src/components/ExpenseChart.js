import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (num) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    // This generates distinct colors based on the number of categories
    colors.push(`hsl(${(i * 360) / num}, 70%, 60%)`);
  }
  return colors;
};


function ExpenseChart({ expenses }) {

    if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mt-6 text-center">
        <p className="text-gray-500">No data available to display chart.</p>
      </div>
    );
  }

  const categoryTotals = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const categories = Object.keys(categoryTotals);

  const data = {
    labels: categories,
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: generateColors(categories.length),
        borderWidth: 1,
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