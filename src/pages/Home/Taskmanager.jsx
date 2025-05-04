import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, fetchTasks, deleteTask, updateTask } from '../../redux/slices/taskSlice';
import { FaSpinner, FaEdit, FaTrash } from 'react-icons/fa';

const TaskManager = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = useSelector((state) => state.auth.user);
  const { tasks, status } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Auto-hide success message after 2 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      if (taskId) {
        // Update existing task
        await dispatch(updateTask({ id: taskId, title, description })).unwrap();
        setSuccess('Task updated successfully!');
      } else {
        // Create new task
        await dispatch(addTask({ title, description })).unwrap();
        setSuccess('Task created successfully!');
      }
      setTitle('');
      setDescription('');
      setTaskId(null);
    } catch (err) {
      setError(err.message || 'Failed to save task. Please try again.');
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await dispatch(deleteTask(taskId)).unwrap();
      setSuccess('Task deleted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to delete task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    setTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Task Manager</h2>
      <p className="text-gray-600 mb-6">Welcome, {user?.email}</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-fade">
          {success}
        </div>
      )}

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Task Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'loading'}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </span>
          ) : taskId ? (
            'Update Task'
          ) : (
            'Create Task'
          )}
        </button>
      </form>

      {/* Task List */}
      {status === 'loading' && tasks.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tasks yet.</p>
          <p className="text-gray-400 mt-2">Create your first task above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {task.status || 'pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManager;