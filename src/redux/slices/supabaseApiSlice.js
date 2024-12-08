import { createApi } from "@reduxjs/toolkit/query/react";
import { createClient } from "../../../utils/supabase/client";

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const supabase = createClient();

  // Use the provided URL and method, or default to GET
  const { url, method = 'GET', body } = args;

  try {
    let result;

    if (method === 'GET') {
      result = await supabase
        .from(url)
        .select('*')
        .conditionalFilter(body); // This will apply any filters passed in the body
    }
    // Add other methods as needed

    if (result.error) throw result.error;

    return { data: result.data };
  } catch (error) {
    return {
      error: {
        status: error.code || 500,
        data: error.message || 'Something went wrong'
      }
    };
  }
};

export const supabaseApiSlice = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({})
});