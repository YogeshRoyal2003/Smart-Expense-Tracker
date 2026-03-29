import React, { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseChart from "../components/ExpenseChart"; 

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await API.get();
    setExpenses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
    await API.post("", form);
    fetchExpenses();
    setForm({ title: "", amount: "", category: "", date: "" });
  };

  const deleteExpense = async (id) => {
    await API.delete(`/${id}`);
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        💸 Smart Expense Tracker
      </h1>

      {/* FORM CARD */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-wrap gap-3 justify-center">
        <input className="border p-2 rounded" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="border p-2 rounded" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input className="border p-2 rounded" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input className="border p-2 rounded" type="date" name="date" value={form.date} onChange={handleChange} />

        <button
          onClick={addExpense}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </div>

      <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center">
        <h2 className="text-xl font-bold">
          Total Spending: ₹{total}
        </h2>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-b">
                <td>{e.title}</td>
                <td>₹{e.amount}</td>
                <td>{e.category}</td>
                <td>{e.date}</td>
                <td>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;