import { supabaseApiSlice } from "./supabaseApiSlice";

export const usersApiSlice = supabaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    getUsers: builder.query({
      queryFn: async () => {
        try {
          const { data, error } = await supabase
            .from("users") // Replace "users" with your actual table name
            .select("*");

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
      providesTags: ["User"],
    }),

    // Fetch a user by ID
    getUserById: builder.query({
      queryFn: async (id) => {
        try {
          const { data, error } = await supabase
            .from("users") // Replace "users" with your actual table name
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