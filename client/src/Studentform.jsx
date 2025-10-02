import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const StudentForm = () => {
    // Initialize state with all form fields
    const [formData, setFormData] = useState({
        medium: 'English',
        studentName: '',
        rollNo: '',
        course: '',
        motherName: '',
        gender: '',
        cast: 'General',
    });

    // New state for handling submission messages
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [isLoading, setIsLoading] = useState(false);

    // Handler for all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear message on new input
        setSubmissionMessage('');
    };

    // Submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmissionMessage('');
        setMessageType('');
        setIsLoading(true);

        // --- Simulated Submission Process ---
        // Simulate a network delay
        setTimeout(() => {
            // Check if the form is fully filled out (basic validation)
            const isFormComplete = Object.values(formData).every(value => value !== '');

            if (isFormComplete) {
                // Success case
                console.log('Form Data Submitted:', formData);
                setSubmissionMessage(`Success! Enrollment details saved for ${formData.studentName}.`);
                setMessageType('success');
                // You might also want to clear the form here: setFormData({...initialState});
            } else {
                // Error case (e.g., incomplete form)
                setSubmissionMessage('Submission failed. Please fill out all required fields.');
                setMessageType('error');
            }
            
            setIsLoading(false);
        }, 1000); // 1 second delay
    };

    // Helper function for a consistent text input field structure
    const TextInput = ({ id, label, type = 'text', value }) => (
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

    // --- Authentication Logic (Kept but modified for testing) ---
    // NOTE: This value should come from a real authentication context (e.g., useContext).
    const isLoggedIn = true; 
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    // -----------------------------------------------------------

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600 border-b pb-2">
                Student Enrollment 📝
            </h2>

            {/* MESSAGE DISPLAY AREA */}
            {submissionMessage && (
                <div
                    className={`p-3 rounded-md text-sm mb-4 font-medium ${
                        messageType === 'success' 
                            ? 'bg-green-100 text-green-700 border border-green-300' 
                            : 'bg-red-100 text-red-700 border border-red-300'
                    }`}
                >
                    {submissionMessage}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                
                {/* Medium Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medium:</label>
                    <div className="flex space-x-4">
                        {['English', 'Hindi', 'Marathi'].map(m => (
                            <label key={m} className="inline-flex items-center text-sm">
                                <input
                                    type="radio" name="medium" value={m}
                                    checked={formData.medium === m} onChange={handleChange}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-600">{m}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Text Inputs */}
                <TextInput id="studentName" label="Student Name" value={formData.studentName} />
                <TextInput id="rollNo" label="Roll No" value={formData.rollNo} />
                <TextInput id="course" label="Course" value={formData.course} />
                <TextInput id="motherName" label="Mother's Name" value={formData.motherName} />

                {/* Gender Select */}
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender:
                    </label>
                    <select
                        id="gender" name="gender" value={formData.gender} onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Cast Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cast Category:</label>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {['General', 'EWS', 'OBC', 'SC', 'ST'].map(caste => (
                            <label key={caste} className="inline-flex items-center text-sm">
                                <input
                                    type="radio" name="cast" value={caste}
                                    checked={formData.cast === caste} onChange={handleChange}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-600">{caste}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Register Student'}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;