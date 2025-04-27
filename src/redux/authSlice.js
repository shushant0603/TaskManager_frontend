import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      // Clear token from both storages
      localStorage.removeItem('auth_token');
      const tokenKey = sessionStorage.getItem('auth_token_key');
      if (tokenKey) {
        sessionStorage.removeItem(tokenKey);
        sessionStorage.removeItem('auth_token_key');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;