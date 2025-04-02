import axios from "axios";

const TaskList = ({ tasks, fetchTasks }) => {
  const updateTask = async (id, status) => {
    await axios.put(`http://localhost:5002/api/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5002/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="mt-6 space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
          <div className="mt-2 space-x-2">
            <button onClick={() => updateTask(task._id, "In Progress")}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
              Mark In Progress
            </button>
            <button onClick={() => updateTask(task._id, "Completed")}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Mark Completed
            </button>
            <button onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
