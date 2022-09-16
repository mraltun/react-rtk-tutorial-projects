import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      // Prepare Callback to customize payload of the action
      // https://redux-toolkit.js.org/api/createAction#using-prepare-callbacks-to-customize-action-contents
      prepare(title, content, userId) {
        return {
          payload: {
            // Generate a random ID string
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      // Get post id and the reaction that user select
      const { postId, reaction } = action.payload;
      // Select the correct post
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

// useSelector logic here to read data from the store. Bonus: We changed shape of the state and we only had to update this file.
export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
