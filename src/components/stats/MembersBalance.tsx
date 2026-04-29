import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

function MembersBalance() {
  const { persons, expenses, perPersonExpense } = useContext(ExpenseContext);

  const calculatePersonExpense = (personId: number): number => {
    let totalExpense: number = 0;
    for (const expense of expenses) {
      if (
        expense.participants.length > 0 &&
        expense.participants.includes(personId)
      )
        totalExpense += expense.amount / expense.participants.length;
    }
    return Number(totalExpense.toFixed(2));
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg space-y-3">
      <h2 className="text-lg font-semibold mb-4">Each Person Balance</h2>

      {persons.map((person) => (
        <div
          key={person.id}
          className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800/60 transition px-4 py-3 rounded-xl border border-white/5"
        >
          <span>{person.name}: </span>
          <span>₹{perPersonExpense - calculatePersonExpense(person.id)}</span>
        </div>
      ))}
    </div>
  );
}

export default MembersBalance;
