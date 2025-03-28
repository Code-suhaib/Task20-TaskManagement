import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const EmployeeTable = ({ employees, setSelectedEmployee, fetchEmployees }) => {
    // Handle employee deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    // Handle employee edit
    const handleEdit = (employee) => {
        setSelectedEmployee(employee); // Pass the selected employee to the form
    };

    return (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mt-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Employee List</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Position</th>
                        <th className="border p-2">Salary</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id} className="border hover:bg-gray-100 transition">
                            <td className="border p-2">{employee.name}</td>
                            <td className="border p-2">{employee.email}</td>
                            <td className="border p-2">{employee.position}</td>
                            <td className="border p-2">${employee.salary}</td>
                            <td className="border p-2 flex justify-center gap-2">
                                <button 
                                    onClick={() => handleEdit(employee)} 
                                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    onClick={() => handleDelete(employee._id)} 
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
