import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (isSignup && formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address.";
    }
    if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password = "Password must be 6–20 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const endpoint = isSignup
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (isSignup) {
        alert(response.data.message || "Signup successful! Please login.");
        setFormData({ name: "", email: "", password: "" });
        setIsSignup(false); // Navigate to login form
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/"); // Navigate to home page after login
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 items-center">
      <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            <p className="text-xs text-gray-400 mt-1">Password must be 6–20 characters.</p>
          </div>

          {!isSignup && (
            <div className="text-right">
              <a href="#" className="text-blue-400 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold text-white transition-all ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button onClick={toggleMode} className="text-blue-400 hover:underline">
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button onClick={toggleMode} className="text-blue-400 hover:underline">
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
