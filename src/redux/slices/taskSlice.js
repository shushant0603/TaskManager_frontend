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

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks cases
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add task cases
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  }
});

export default taskSlice.reducer; 