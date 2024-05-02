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
    signUpUser: (state, { payload }) => {
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.userName = payload.userName;
      state.id = payload.id;
      state.isConnected = true;
    },
    //remettre Logout et re creer composant pour navbar
logout: (state) => {
      state.token = null;
      state.isConnected = false;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
    }
  },
});

export const { setToken, setUser, editUsername, signUpUser, logout } = authSlice.actions;

export default authSlice.reducer;
