import { configureStore } from "@reduxjs/toolkit";
import { supabaseApiSlice } from "./slices/supabaseApiSlice";

const store = configureStore({
  reducer: {
    [supabaseApiSlice.reducerPath]: supabaseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(supabaseApiSlice.middleware), // Add the apiSlice middleware to the store
  devTools: true,
 });