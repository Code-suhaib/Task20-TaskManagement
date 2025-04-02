import { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5002/api/tasks", task);
    fetchTasks();
    setTask({ title: "", description: "", status: "Pending", due_date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} 
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
      
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
      
      <input type="date" name="due_date" value={task.due_date} onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
      
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
