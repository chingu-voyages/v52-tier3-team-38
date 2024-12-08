import { configureStore } from "@reduxjs/toolkit";
import { supabaseApiSlice } from "./slices/supabaseApiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [supabaseApiSlice.reducerPath]: supabaseApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApiSlice.middleware),
  devTools: true,
});

export default store;