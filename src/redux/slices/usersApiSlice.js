import { supabaseApiSlice } from "./supabaseApiSlice";
import { createClient } from "../../../utils/supabase/client";

export const usersApiSlice = supabaseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        const supabase = createClient();
        try {
          const { data, error } = await supabase
            .from("user_details")
            .select("*");

          if (error) {
            return {
              error: {
                status: 500,
                data: error.message
              }
            };
          }

          return { data };
        } catch (error) {
          console.error("Error fetching users:", error);
          return {
            error: {
              status: 500,
              data: "Failed to fetch users"
            }
          };
        }
      },
      providesTags: ["User"]
    }),
    getUserById: builder.query({
      queryFn: async (id) => {
        if (!id) {
          return {
            error: {
              status: 400,
              data: "Invalid or missing user ID"
            }
          };
        }

        const supabase = createClient();
        try {
          const { data, error } = await supabase
            .from("user_details")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            return {
              error: {
                status: error.code === 'PGRST116' ? 404 : 500,
                data: error.message
              }
            };
          }

          return { data };
        } catch (error) {
          console.error(`Error fetching user with id ${id}:`, error);
          return {
            error: {
              status: 500,
              data: "Failed to fetch user details"
            }
          };
        }
      },
      providesTags: (result, error, id) => [{ type: "User", id }]
    })
  })
});

export const { useGetUserByIdQuery } = usersApiSlice;