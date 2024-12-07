import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    session: null,
    isInitialized: false
  },
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.session = action.payload.session || null;
      state.isInitialized = true;
    },
    clearSession: (state) => {
      state.user = null;
      state.role = null;
      state.session = null;
      state.isInitialized = true;
    }
  }
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;