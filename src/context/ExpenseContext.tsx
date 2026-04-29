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
}

interface ExpenseContextType {
  persons: Person[];
  perPersonExpense: number;
  expenses: Expense[];

  changePerPersonExpense: (newPerPersonExpense: number) => void;
  changePerson: (
    action: "add" | "remove" | "edit",
    personName?: string,
    personId?: number,
  ) => void;
  changeExpense: (
    action: "add" | "remove" | "edit",
    expenseId?: number,
    data?: any,
  ) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  persons: [],
  perPersonExpense: 0,
  expenses: [],
  //   expenses: [
  //     {
  //       id: 1,
  //       title: "Lunch",
  //       amount: 0,
  //       participants: [1]
  //     }
  //   ]
  changePerPersonExpense: () => {},
  changePerson: () => {},
  changeExpense: () => {},
});
