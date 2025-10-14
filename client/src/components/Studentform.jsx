import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const StudentForm = () => {
  
  const [formData, setFormData] = useState({
    medium: "English",
    studentName: "",
    rollNo: "",
    course: "",
    motherName: "",
    gender: "",
    cast: "General",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

  
    const isFormComplete = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormComplete) {
      alert("Please fill all required fields before submitting.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/student/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit student data");
      }

      alert(
        `Enrollment successful! Details saved for ${formData.studentName}.`
      );
      console.log("Student submitted:", data);

      setFormData({
        medium: "English",
        studentName: "",
        rollNo: "",
        course: "",
        motherName: "",
        gender: "",
        cast: "General",
      });
    } catch (error) {
      console.error("Error submitting student:", error);
      alert(` Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

 
  const TextInput = ({ id, label, type = "text", value }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>
  );

 
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-black-600  pb-2 text-xl-center">
        Student Enrollment
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medium:
          </label>
          <div className="flex space-x-4">
            {["English", "Hindi", "Marathi"].map((m) => (
              <label key={m} className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  name="medium"
                  value={m}
                  checked={formData.medium === m}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">{m}</span>
              </label>
            ))}
          </div>
        </div>

        <TextInput
          id="studentName"
          label="Student Name"
          value={formData.studentName}
        />
        <TextInput id="rollNo" label="Roll No" value={formData.rollNo} />
        <TextInput id="course" label="Course" value={formData.course} />
        <TextInput
          id="motherName"
          label="Mother's Name"
          value={formData.motherName}
        />

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Cast Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cast Category:
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["General", "EWS", "OBC", "SC", "ST"].map((caste) => (
              <label key={caste} className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  name="cast"
                  value={caste}
                  checked={formData.cast === caste}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">{caste}</span>
              </label>
            ))}
          </div>
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-indigo-400"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Register Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
