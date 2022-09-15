// createStore alternative
import { configureStore } from "@reduxjs/toolkit";
// Import slice as reducer
import counterReducer from "../features/counter/counterSlice";

// Our redux store which holds the state(s). Store is going to use counterReducer to handle all updates in the counter state
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
