import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as api from "./api";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setError, setAuth } = counterSlice.actions;

export const login = (authData) => async (dispatch) => {
  try {
    const login = await api.login(authData);
    if (login.status === 200) {
      localStorage.setItem("auth.token", login.data.token);
      dispatch(setUser(login.data.user));
      dispatch(setAuth(true));
    } else {
      dispatch(setError(login.data.message));
    }
    return login;
  } catch (error) {
    throw new Error(error);
  }
};
export const signup = (authData) => async (dispatch) => {
  try {
    const auth = await api.signup(authData);
    if (login.status !== 200) {
      dispatch(setError(auth.data.message));
    }
    return auth;
  } catch (error) {
    throw new Error(error);
  }
};

function init(token) {
  axios.defaults.baseURL = "http://localhost:3000/api/v1";
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

function hasTokenExpired(token) {
  if (Date.now() >= token.exp * 1000) {
    return true;
  }
  return false;
}

export const initAuth = () => (dispatch) => {
  const token = localStorage.getItem("auth.token");
  try {
    init(token);
    const decoded = jwtDecode(token);
    dispatch(setUser(decoded));
    dispatch(setAuth(true));
    if (hasTokenExpired(decoded)) {
      dispatch(setUser(null));
      dispatch(setAuth(false));
    }
  } catch (error) {
    dispatch(setUser(null));
    dispatch(setAuth(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("auth.token");
  dispatch(setUser(null));
  dispatch(setAuth(false));
};

export const selectAuth = (state) => state.auth;

export default counterSlice.reducer;
