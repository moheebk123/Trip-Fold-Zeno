import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

function DaysTotal() {
  const { perPersonExpense, persons, expenses } = useContext(ExpenseContext);

  let totalExpense: number = 0;
  for (const expense of expenses) {
    totalExpense += expense.amount;
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
      <h2 className="text-lg font-semibold ">Stats Overview</h2>
      <div className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800/60 transition px-4 py-3 rounded-xl border border-white/5">
        <span>Total Amount: </span>
        <span>₹{perPersonExpense * persons.length}</span>
      </div>
      <div className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800/60 transition px-4 py-3 rounded-xl border border-white/5">
        <span>Total Expense: </span>
        <span>₹{totalExpense}</span>
      </div>
      <div className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800/60 transition px-4 py-3 rounded-xl border border-white/5">
        <span>Balance: </span>
        <span>₹{perPersonExpense * persons.length - totalExpense}</span>
      </div>
    </div>
  );
}

export default DaysTotal;
