import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import PerPersonBudget from "./PerPersonBudget";
import AddPerson from "./AddPerson";
import Persons from "./Persons";

function PersonsBox() {
  const { perPersonExpense } = useContext(ExpenseContext);

  return (
    <div className="space-y-8 my-3 w-full max-w-sm">
      <PerPersonBudget />
      {!perPersonExpense ? <></> : <AddPerson />}
      <Persons />
    </div>
  );
}

export default PersonsBox;
