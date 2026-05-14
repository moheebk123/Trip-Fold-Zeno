import type { LoadInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LoadInterface = { isLoading: true };

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const loadActions = loadSlice.actions;
export default loadSlice;
