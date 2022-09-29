import {
  // Reselect - A library for creating memoized "selector" functions
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const PostsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = PostsAdapter.getInitialState({});

// Inject endpoints into the original API. Code-splitting friendly.
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          // Add a date if the post doesn't have one. Increment date to make each post a min apart.
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        // Normalize the data
        return PostsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
  }),
});

export const { useGetPostsQuery } = extendedApiSlice;

// Return the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Create memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  // Normalized state object with ids and entities
  (postsResult) => postsResult.data
);

// Rename selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = PostsAdapter.getSelectors((state) => state.posts);
