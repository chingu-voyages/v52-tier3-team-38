import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Supabase user data
  session: null, // Supabase session data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { user, session } = action.payload; // Destructure the user and session from the payload
      state.user = user;
      state.session = session;
    },
    clearSession: (state) => {
      state.user = null;
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;