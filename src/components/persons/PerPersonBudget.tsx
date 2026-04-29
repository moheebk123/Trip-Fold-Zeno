import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import { Input } from "@/components/ui/input";

function PerPersonBudget() {
  const { perPersonExpense, changePerPersonExpense } =
    useContext(ExpenseContext);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Per Person Budget</h2>

      <Input
        className="h-12 text-base"
        placeholder="Enter per person expense..."
        type="number"
        value={perPersonExpense}
        onChange={(e) => changePerPersonExpense(Number(e.target.value))}
      />
    </div>
  );
}

export default PerPersonBudget;
