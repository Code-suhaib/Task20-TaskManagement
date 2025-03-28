import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Fetch employees from backend
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Employee Management System</h1>

            {/* Employee Form */}
            <EmployeeForm 
                selectedEmployee={selectedEmployee} 
                setSelectedEmployee={setSelectedEmployee} 
                fetchEmployees={fetchEmployees} 
            />

            {/* Employee Table */}
            <EmployeeTable 
                employees={employees} 
                setSelectedEmployee={setSelectedEmployee} 
                fetchEmployees={fetchEmployees} 
            />
        </div>
    );
};

export default App;
