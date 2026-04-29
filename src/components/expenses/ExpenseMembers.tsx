import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import { Badge } from "../ui/badge";

import { X } from "lucide-react";

interface Expense {
  id: number;
  title: string;
  amount: number;
  participants: number[];
}

function ExpenseMembers({ expense }: { expense: Expense }) {
  const { persons, changeExpense } = useContext(ExpenseContext);

  const handleRemoveParticipant = (participantId: number) => {
    changeExpense("edit", expense.id, {
      ...expense,
      participants:
        expense.participants.length > 1
          ? expense.participants.filter(
              (participant) => participant !== participantId,
            )
          : expense.participants,
    });
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {expense.participants.map((personId) => {
        const person = persons.find((p) => p.id === personId);
        if (!person) return null;

        return (
          <Badge
            key={person.id}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1 rounded-full"
          >
            {person.name}

            {/* Remove from meal */}
            <button
              className="ml-1 hover:text-red-400"
              onClick={() => handleRemoveParticipant(person.id)}
            >
              <X size={12} />
            </button>
          </Badge>
        );
      })}
    </div>
  );
}

export default ExpenseMembers;
