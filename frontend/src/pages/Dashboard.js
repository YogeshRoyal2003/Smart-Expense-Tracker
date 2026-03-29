import React, { useEffect, useState } from "react";
import API from "../services/api";

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

    setForm({
      title: "",
      amount: "",
      category: "",
      date: ""
    });
  };

  const deleteExpense = async (id) => {
    await API.delete(`/${id}`);
    fetchExpenses();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💸 Smart Expense Tracker</h2>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <button onClick={addExpense}>Add</button>
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.amount}</td>
              <td>{e.category}</td>
              <td>{e.date}</td>
              <td>
                <button onClick={() => deleteExpense(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;