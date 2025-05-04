import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskAPI } from '../../services/api';

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async () => {
    const response = await taskAPI.getTasks();
    return response;
  }
);

// Async thunk to add a new task
export const addTask = createAsyncThunk(
  'task/addTask',
  async ({ title, description }) => {
    const response = await taskAPI.createTask(title, description);
    return response;
  }
);

// Async thunk to update a task
export const updateTask = createAsyncThunk(
  'task/updateTask',
  async ({ id, title, description, status }) => {
    const response = await taskAPI.updateTask(id, title, description, status);
    return response;
  }
);

// Async thunk to toggle task status
export const toggleTaskStatus = createAsyncThunk(
  'task/toggleStatus',
  async ({ id, status }) => {
    const response = await taskAPI.updateTask(id, null, null, status);
    return response;
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id) => {
    await taskAPI.deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
    todayProgress: 0
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks cases
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        // Calculate today's progress
        const todayTasks = action.payload.filter(task => {
          const taskDate = new Date(task.createdAt);
          const today = new Date();
          return taskDate.toDateString() === today.toDateString();
        });
        const completedTasks = todayTasks.filter(task => task.status === 'completed').length;
        state.todayProgress = todayTasks.length > 0 ? (completedTasks / todayTasks.length) * 100 : 0;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add task cases
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = [...state.tasks, action.payload];
        state.success = 'Task created successfully!';
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update task cases
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.map(task => 
          task._id === action.payload._id ? action.payload : task
        );
        state.success = 'Task updated successfully!';
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Toggle status cases
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(task => 
          task._id === action.payload._id ? action.payload : task
        );
        // Recalculate today's progress
        const todayTasks = state.tasks.filter(task => {
          const taskDate = new Date(task.createdAt);
          const today = new Date();
          return taskDate.toDateString() === today.toDateString();
        });
        const completedTasks = todayTasks.filter(task => task.status === 'completed').length;
        state.todayProgress = todayTasks.length > 0 ? (completedTasks / todayTasks.length) * 100 : 0;
      })
      // Delete task cases
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
        state.success = 'Task deleted successfully!';
      });
  }
});

export const { clearSuccess } = taskSlice.actions;
export default taskSlice.reducer;
