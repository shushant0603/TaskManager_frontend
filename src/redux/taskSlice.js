import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    set: (state, action) => {
      console.log('settask called with payload:', action.payload);
      state.tasks = action.payload;
      state.isLoading = false; // Assume tasks were fetched successfully
    },
    addTask: (state, action) => {
      console.log('addTask called with payload:', action.payload);
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      console.log('updateTask called with payload:', action.payload);
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      console.log('deleteTask called with payload:', action.payload);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { set, addTask, updateTask, deleteTask, setLoading, setError } = taskSlice.actions;
export default taskSlice.reducer;
