import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Look at react dev tools state
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios(USERS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Completely override the state
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;
// Take the state and user id, then return the user with same id from the state
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
