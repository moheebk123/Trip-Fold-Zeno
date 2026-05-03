import { createContext } from "react";

interface Person {
  id: number;
  name: string;
}

interface Expense {
  id: number;
  title: string;
  amount: number;
  participants: number[];
  day: number;
}

interface ExpenseContextType {
  perPersonExpense: number;
  persons: Person[];
  expenses: Expense[];
  days: number[];

  changePerPersonExpense: (newPerPersonExpense: number) => void;
  changePerson: (
    action: "add" | "remove" | "edit",
    personName?: string,
    personId?: number,
  ) => void;
  changeExpense: (
    action: "add" | "remove" | "edit",
    expenseId?: number,
    data?: Expense,
  ) => void;
  changeDay: (
    action: "add" | "remove" | "edit",
    dayId?: number,
    data?: number,
  ) => void;
  deleteData: () => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  perPersonExpense: 0,
  persons: [],
  expenses: [],
  days: [],
  //   expenses: [
  //     {
  //       id: 1,
  //       title: "Lunch",
  //       amount: 0,
  //       participants: [1]
  //       day: 1
  //     }
  //   ]
  changePerPersonExpense: () => {},
  changePerson: () => {},
  changeExpense: () => {},
  changeDay: () => {},
  deleteData: () => {},
});
