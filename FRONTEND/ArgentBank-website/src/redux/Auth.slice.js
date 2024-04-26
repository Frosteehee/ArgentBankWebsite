import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    isConnected: null,
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.userName = payload.userName;
      state.id = payload.id;
      state.isConnected = true;
    },
    editUsername: (state, { payload }) => {
      state.userName = payload;
    },
    logout: (state) => {
      state.token = null;
      state.isConnected = false;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
      state.id = null;
    },
  },
});

export const { setToken, setUser, editUsername, logout } = authSlice.actions;
export default authSlice.reducer;