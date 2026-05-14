import { configureStore } from "@reduxjs/toolkit";
import alertSlice, { alertActions } from "./alert";
import loadSlice, { loadActions } from "./load";
import tripSlice, { tripActions } from "./trip";
import expenseSlice, { expenseActions } from "./expense";

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    load: loadSlice.reducer,
    trips: tripSlice.reducer,
    expenses: expenseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { alertActions, loadActions, tripActions, expenseActions };
