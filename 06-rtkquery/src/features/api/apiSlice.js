import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs and other async sources, including the configuration of how to fetch and transform that data. It generates an "API slice" structure that contains Redux logic (and optionally React hooks) that encapsulate the data fetching and caching process for you
export const apiSlice = createApi({
  // Optional - Path for this slice
  reducerPath: "api",
  // Base query for every endpoint inside. fetchBaseQuery is a wrapper that simplifies the requests.
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  // Array of tag type names that we will re-fetch.
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      // Change the data returned by a query or mutation.
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      // Which tag of the cached data should returned by the query
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      // Which data should be re-fetched or removed from the cache. For mutation endpoints.
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// Custom auto created hooks based on the names of the endpoints.
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
