import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    await API.post("api/auth/register", form);
    alert("Registered successfully! Please login.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Register</h2>
        <input className="border p-2 rounded w-full mb-3" name="name" placeholder="Name" onChange={handleChange} />
        <input className="border p-2 rounded w-full mb-3" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border p-2 rounded w-full mb-4" name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button onClick={register} className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Register
        </button>
        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <span onClick={() => navigate("/")} className="text-blue-500 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;