import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import ExpenseTotal from "./ExpenseTotal";
import MembersTotal from "./MembersTotal";
import MembersBalance from "./MembersBalance";

function StatsBox() {
  const { perPersonExpense, persons, expenses } =
    useContext(ExpenseContext);

  if (!perPersonExpense || !persons.length || !expenses.length) return;

  return <div className="space-y-8 my-3 border-t pt-5 w-full max-w-sm">
    <ExpenseTotal />
    <MembersTotal />
    <MembersBalance />
  </div>;
}

export default StatsBox
