import { configureStore } from "@reduxjs/toolkit";
import { supabaseApiSlice } from "./slices/supabaseApiSlice";
import authReducer from "./slices/authSlice";
import { authMiddleware } from "./middleware/authMiddleware";

const store = configureStore({
  reducer: {
    [supabaseApiSlice.reducerPath]: supabaseApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseApiSlice.middleware, authMiddleware),
  devTools: true,
});

export default store;