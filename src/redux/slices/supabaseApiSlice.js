import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL });


export const supabaseApiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({})
});