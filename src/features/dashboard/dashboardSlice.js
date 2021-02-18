import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    categories: [],
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setError } = dashboardSlice.actions;

export const searchCategories = (name) => async (dispatch) => {
  try {
    const data = await api.searchCategories(name);
    if (data.status === 200) {
      console.log(data.categories);
      dispatch(setCategories(data.categories));
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addOrder = (order) => async (dispatch) => {
  try {
    const data = await api.addOrder(order);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const selectDashboard = (state) => state.dashboard;

export default dashboardSlice.reducer;
