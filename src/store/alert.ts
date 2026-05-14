import type { AlertInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AlertInterface = {
  show: false,
  variant: "success", // matches shadcn ui variant: "success" | "error" | "warning" | "default"
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.variant = action.payload.variant || "success";
      state.message = action.payload.message || "";
    },
    hideAlert: (state) => {
      state.show = false;
      state.variant = "success";
      state.message = "";
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice;
