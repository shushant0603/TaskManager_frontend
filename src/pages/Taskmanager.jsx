import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useSelector } from 'react-redux';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskAPI.getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      setIsLoading(true);
      if (taskId) {
        await taskAPI.updateTask(taskId, title, description);
        setSuccess('Task updated successfully!');
      } else {
        await taskAPI.createTask(title, description);
        setSuccess('Task created successfully!');
      }

      await fetchTasks();
      setTitle('');
      setDescription('');
      setTaskId(null);
    } catch (err) {
      console.error('Error saving task:', err);
      setError(err.response?.data?.message || 'Failed to save task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsLoading(true);
      await taskAPI.deleteTask(id);
      setSuccess('Task deleted successfully!');
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.response?.data?.message || 'Failed to delete task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (task) => {
    setTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>
        <p className="text-center text-gray-600 mb-6">Welcome, {user?.email}</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : taskId ? 'Update Task' : 'Create Task'}
          </button>
        </form>

        {/* Task List */}
        {isLoading && tasks.length === 0 ? (
          <p className="text-center text-gray-600">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks yet. Create one above!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManager;