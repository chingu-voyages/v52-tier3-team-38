import { createClient } from "../../../utils/supabase/client";
import { supabaseApiSlice } from "./supabaseApiSlice";

export const usersApiSlice = supabaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        const supabase = await createClient();
        try {
          const { data, error } = await supabase
            .from("user_details")
            .select("*");

          if (error) throw error;
          return { data };
        } catch (error) {
          console.error("Error fetching users:", error.message);
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
            .from("user_details")
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;
          return { data };
        } catch (error) {
          console.error(`Error fetching user with id ${id}:`, error.message);
          return { error: { status: 404, data: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApiSlice;