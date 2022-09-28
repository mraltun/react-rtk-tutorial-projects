import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs and other async sources, including the configuration of how to fetch and transform that data. It generates an "API slice" structure that contains Redux logic (and optionally React hooks) that encapsulate the data fetching and caching process for you
export const apiSlice = createApi({
  // Path for this slice
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getTodos: builder.query({ query: () => "/todos" }),
  }),
});

// It uses "use" and "Query", middle is what we say in the endpoint
export const { useGetTodosQuery } = apiSlice;
