import { createSlice } from "@reduxjs/toolkit";

// Initial state object
const initialState = {
  count: 0,
};

// Automatically generates action creators and action types that correspond to the reducers and state.
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The ones that responds to dispatch.
  reducers: {
    increment: (state) => {
      // RTK allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// Action creators (The ones we dispatch "type, payload" object) are created for each case reducer function by createSlice above
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// Export reducer(s). We import this as counterReducer
export default counterSlice.reducer;
