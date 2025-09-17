import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        // Register API
        const res = await axios.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (res.data) {
          alert("Signup successful! Please login.");
          setIsSignup(false);
        }
      } else {
        // Login API
        const res = await axios.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
          alert("Login successful!");
          navigate("/dashboard"); // redirect to dashboard
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* Demo user note */}
        {!isSignup && (
          <div className="mb-4 text-sm text-center text-gray-600">
            Demo User: <strong>admin@example.com</strong> / <strong>admin1234</strong>
          </div>
        )}

        {error && (
          <div className="mb-3 text-sm text-red-600 text-center">{error}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={isSignup}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white p-2 rounded-lg"
            style={{
              backgroundColor: "rgb(63 97 172)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgb(50, 78, 138)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgb(63 97 172)";
            }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="hover:underline"
            onClick={() => setIsSignup(!isSignup)}
            style={{
              color: "rgb(63 97 172)",
            }}
          >
            {isSignup ? "Login here" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
