import { createClient } from "../../../utils/supabase/client";
import { supabaseApiSlice } from "./supabaseApiSlice";

export const usersApiSlice = supabaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        const supabase = await createClient();
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*");

          if (error) throw error;
          return { data };
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
      providesTags: ["User"],
    }),
    
    getUserById: builder.query({
      queryFn: async (id) => {
        const supabase = await createClient();
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();
           
          if (error) throw error;
          return { data };
        } catch (error) {
          return { error: { status: 404, data: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApiSlice;
