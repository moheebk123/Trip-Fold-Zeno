import { useState, type ReactNode } from "react";
import { ExpenseContext } from "./ExpenseContext";

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

function ExpenseContextProvider({ children }: { children: ReactNode }) {
  const [perPersonExpense, setPerPersonExpense] = useState<number>(0);
  const [persons, setPersons] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const changePerPersonExpense = (newPerPersonExpense: number) =>
    setPerPersonExpense(newPerPersonExpense);

  const changePerson = (
    action: "add" | "remove" | "edit",
    personName?: string,
    personId?: number,
  ) => {
    if (action === "add" && personName) {
      const isPersonAdded = persons.find(
        (person) =>
          person.name.toLowerCase() === personName.toLocaleLowerCase(),
      );
      if (isPersonAdded) {
        alert("Person already present, add person with different name.");
        return;
      }

      setPersons((prev) => [
        ...prev,
        { id: persons.length + 1, name: personName },
      ]);
    } else if (action === "remove" && personId) {
      setPersons((prev) => prev.filter((person) => person.id !== personId));
    } else if (action === "edit" && personId && personName) {
      setPersons((prev) =>
        prev.map((person) =>
          person.id === personId ? { ...person, name: personName } : person,
        ),
      );
    }
  };

  const changeExpense = (
    action: "add" | "remove" | "edit",
    expenseId?: number,
    data?: Expense,
  ) => {
    if (action === "add" && data?.title) {
      setExpenses((prev) => [...prev, { ...data, id: Date.now() }]);
    } else if (action === "edit" && data) {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === expenseId
            ? {
                ...expense,
                ...data,
              }
            : expense,
        ),
      );
    } else if (action === "remove" && expenseId) {
      setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
    } else {
      alert("Invalid expense change action!");
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        persons,
        perPersonExpense,
        expenses,
        changePerPersonExpense,
        changePerson,
        changeExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
