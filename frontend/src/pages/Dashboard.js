import React, { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseChart from "../components/ExpenseChart"; 
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const [search, setSearch] = useState("");


  // const fetchExpenses = async () => {
  //   const res = await API.get();
  //   setExpenses(res.data);
  // };

  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");  // redirect to login if not logged in
  //     return;
  //   }
  //   fetchExpenses();
  // }, []);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchExpenses();
  }, [navigate, token]);

  

  const fetchExpenses = async () => {
    // if (!user) return;
    // const res = await API.get(`/expenses/user/${user.id}`);
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
  const expenseData = {
  title: form.title,
  amount: form.amount,
  category: form.category,
  date: form.date
  };
  await API.post("/expenses", expenseData);
    fetchExpenses();
    setForm({ title: "", amount: "", category: "", date: "" });
  };

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const deleteAll = async () => {
  // await API.delete(`/expenses/user/${user.id}`);
  await API.delete("/expenses/all");
  fetchExpenses();
  };



  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(blob, "expenses.xlsx");
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = expenses.filter(e =>
  e.title.toLowerCase().includes(search.toLowerCase())
);


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
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center">
        <h2 className="text-xl font-bold">
          Total Spending: ₹{total}
        </h2>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl p-4">
            <div className="flex justify-end mb-3 gap-2">
        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📥 Download Excel
        </button>
        <button
          onClick={deleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🗑️ Delete All
        </button>
      </div>
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
            {filteredExpenses.map((e) => (
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