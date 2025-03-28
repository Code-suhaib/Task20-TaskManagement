import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeForm = ({ selectedEmployee, setSelectedEmployee, fetchEmployees }) => {
    const [formData, setFormData] = useState({ name: "", email: "", position: "", salary: "" });

    // Load selected employee data into form
    useEffect(() => {
        if (selectedEmployee) {
            setFormData(selectedEmployee);
        } else {
            setFormData({ name: "", email: "", position: "", salary: "" });
        }
    }, [selectedEmployee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEmployee) {
                // Update existing employee
                await axios.put(`http://localhost:5000/employees/${selectedEmployee._id}`, formData);
            } else {
                // Add new employee
                await axios.post("http://localhost:5000/employees", formData);
            }
            fetchEmployees(); // Refresh employee list
            setFormData({ name: "", email: "", position: "", salary: "" });
            setSelectedEmployee(null); // Reset selection after update
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{selectedEmployee ? "Edit Employee" : "Add Employee"}</h2>
            <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name" 
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required 
            />
            <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required 
            />
            <input 
                type="text" 
                name="position" 
                value={formData.position} 
                onChange={handleChange} 
                placeholder="Position" 
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required 
            />
            <input 
                type="number" 
                name="salary" 
                value={formData.salary} 
                onChange={handleChange} 
                placeholder="Salary" 
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required 
            />
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                {selectedEmployee ? "Update" : "Add"} Employee
            </button>
        </form>
    );
};

export default EmployeeForm;
