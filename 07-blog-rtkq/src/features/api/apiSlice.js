import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi allows you to define a set of "endpoints" that describe how to retrieve data from backend APIs and other async sources, including the configuration of how to fetch and transform that data. It generates an "API slice" structure that contains Redux logic (and optionally React hooks) that encapsulate the data fetching and caching process for you
export const apiSlice = createApi({
  // Optional - path for this slice
  reducerPath: "api",
  // Base query for every endpoint inside. fetchBaseQuery is a wrapper that simplifies the requests.
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  // Array of tag type names that we will re-fetch.
  tagTypes: ["Post"],
  endpoints: (builder) => ({}),
});
