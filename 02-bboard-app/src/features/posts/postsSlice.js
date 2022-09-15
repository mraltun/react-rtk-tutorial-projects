import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
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
            userId,
          },
        };
      },
    },
  },
});

// useSelector logic here to read data from the store
export const selectAllPosts = (state) => state.posts;
export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
