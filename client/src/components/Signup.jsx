import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Simple frontend validation

    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.info("Simulating registration...");
    try {
      // NOTE: Replaced actual fetch with a mock for single-file environment
      setTimeout(() => {
        // Simulate success after 1.5 seconds
        toast.success("Registration successful!"); // Clear form data upon successful mock registration
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }); // Redirect after a short delay to let the toast show

        setTimeout(() => navigate("/studentform"), 500);
      }, 1500);
    } catch (err) {
      // This catch block would normally handle network errors from a real fetch
      console.error("❌ Frontend error:", err);
      toast.error("Failed to connect to server. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
    
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
       
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Sign Up 
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
         
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
         
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
           Register 
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
           Already have an account?
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
