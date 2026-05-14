import type { ExpenseInterface } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ExpenseInterface[] = [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    setExpenses: (state, action) =>
      action.payload && action.payload.length > 0 ? action.payload : [],
    deleteExpenses: () => [],
    addExpense: (state, action) => {
      const {
        id,
        title,
        amount,
        trip,
        date,
        paidBy,
        paidAmount,
        participants,
      } = action.payload;
      const currentDate = new Date();
      const todayDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
      state.push({
        id: id ? id : Date.now(),
        title: title ? title : "",
        amount: amount ? amount : 0,
        trip: trip ? trip : 0,
        date: date ? date : todayDate,
        paidBy: paidBy ? paidBy : undefined,
        paidAmount: paidAmount ? paidAmount : 0,
        participants:
          participants && participants.length > 0 ? participants : [],
      });
    },
    deleteExpense: (state, action) =>
      state.filter((expense) => expense.id !== action.payload),
    editExpenseField: (state, action) =>
      state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, [action.payload.field]: action.payload.value }
          : expense,
      ),
    addExpenseParticipant: (state, action) =>
      state.map((expense) =>
        expense.id === action.payload.id
          ? {
              ...expense,
              participants: [
                ...expense.participants,
                {
                  id: Date.now(),
                  name: action.payload.name,
                },
              ],
            }
          : expense,
      ),
    editExpenseParticipant: (state, action) =>
      state.map((expense) =>
        expense.id === action.payload.id
          ? {
              ...expense,
              participants: expense.participants.map((p) =>
                p.id === action.payload.participantId
                  ? { ...p, name: action.payload.name }
                  : p,
              ),
            }
          : expense,
      ),
    deleteExpenseParticipant: (state, action) =>
      state.map((expense) =>
        expense.id === action.payload.id
          ? {
              ...expense,
              participants: expense.participants.filter(
                (p) => p.id !== action.payload.participantId,
              ),
            }
          : expense,
      ),
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
