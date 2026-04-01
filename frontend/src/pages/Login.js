import API from "../services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data);
    // localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">💸 Smart Expense Tracker</h2>
        <input className="border p-2 rounded w-full mb-3" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border p-2 rounded w-full mb-4" name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button onClick={login} className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;