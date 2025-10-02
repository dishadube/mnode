import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

function SignupForm() {
  // Initialize useNavigate hook
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    
    if (formData.password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return; 
    }

    setIsLoading(true);

    // --- Simulated Backend Request ---
    setTimeout(() => {
     
      const isSuccess = !formData.email.includes("fail.com");

      if (isSuccess) {
        setMessage("Signup successful! Redirecting to Student Registration...");
        setMessageType("success");
        
      
        setTimeout(() => {
          navigate("/studentform"); 
        }, 1000); 

      } else {
        setMessage("Signup failed. The email address is already in use.");
        setMessageType("error");
      }

      setIsLoading(false);
    }, 1500); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm sm:max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

       
        {message && (
          <div
            className={`p-3 rounded-lg text-sm mb-4 ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... Name Input ... */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text" name="name" id="name" placeholder="Enter Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.name} onChange={handleChange} required
            />
          </div>

          {/* ... Email Input ... */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" name="email" id="email" placeholder="Enter Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.email} onChange={handleChange} required
            />
          </div>

          {/* ... Password Input ... */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" name="password" id="password" placeholder="Enter Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.password} onChange={handleChange} required
            />
          </div>

          {/* ... Confirm Password Input ... */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Existing Link to Student Form */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline cursor-pointer"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;