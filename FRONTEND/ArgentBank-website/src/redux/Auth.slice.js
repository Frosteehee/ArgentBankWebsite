import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

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
  },
});

export const { setToken, setUser, editUsername } = authSlice.actions;

// Action asynchrone pour l'inscription de l'utilisateur
export const signUpUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/signup', userData);
    dispatch(setToken(response.data.token)); // Stocker le token dans le state Redux
    dispatch(setUser(response.data.user)); // Stocker les informations de l'utilisateur dans le state Redux
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    // Traiter l'erreur si nécessaire
  }
};

export default authSlice.reducer;
