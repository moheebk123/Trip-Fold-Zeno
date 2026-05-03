import { useEffect, useState, type ReactNode } from "react";
import { ExpenseContext } from "./ExpenseContext";
import Loader from "@/components/common/Loader";

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

interface ExpenseData {
  perPersonExpense: number;
  persons: Person[];
  expenses: Expense[];
  days: number[];
};

const getInitialData = (): ExpenseData => {
  const storedData = localStorage.getItem("expenseData");

  if (!storedData) {
    return {
      perPersonExpense: 0,
      persons: [],
      expenses: [],
      days: [],
    };
  }

  try {
    return JSON.parse(storedData) as ExpenseData;
  } catch (error) {
    console.error("Failed to parse expense data:", error);

    return {
      perPersonExpense: 0,
      persons: [],
      expenses: [],
      days: [],
    };
  }
};

function ExpenseContextProvider({ children }: { children: ReactNode }) {

  const initialData: ExpenseData = getInitialData();


  const [isLoading, setIsLoading] = useState(true);
  const [perPersonExpense, setPerPersonExpense] = useState<number>(
    initialData.perPersonExpense,
  );
  const [persons, setPersons] = useState<Person[]>(initialData.persons);
  const [expenses, setExpenses] = useState<Expense[]>(initialData.expenses);
  const [days, setDays] = useState<number[]>(initialData.days);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const expenseData: ExpenseData = {
    perPersonExpense,
    persons,
    expenses,
    days,
    };

    localStorage.setItem(
      "expenseData",
      JSON.stringify(expenseData),
    );
  }, [perPersonExpense, persons, expenses, days]);

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

  const changeDay = (
    action: "add" | "remove" | "edit",
    dayId?: number,
    data?: number,
  ) => {
    if (action === "add") {
      setDays((prev) => [...prev, data ? data : Date.now()]);
    } else if (action === "remove" && dayId) {
      setDays((prev) => prev.filter((day) => day !== dayId));
      setExpenses((prev) => prev.filter((expense) => expense.day !== dayId));
    } else {
      alert("Invalid day change action!");
    }
  };

  const deleteData = () => {
    setPerPersonExpense(0);
    setPersons([]);
    setExpenses([]);
    setDays([]);
    localStorage.removeItem("expenseData")
  }

  if (isLoading) return <Loader />;

  return (
    <ExpenseContext.Provider
      value={{
        persons,
        perPersonExpense,
        expenses,
        days,
        changePerPersonExpense,
        changePerson,
        changeExpense,
        changeDay,
        deleteData
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
