import { useState, useContext, type SyntheticEvent } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

function AddExpense() {
  const { persons, changeExpense } = useContext(ExpenseContext);

  const [selectedExpense, setSelectedExpense] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [selectedPersons, setSelectedPersons] = useState<number[]>([]);

  const handleAddExpense = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!selectedPersons.length || !selectedExpense || !expenseAmount) return;

    changeExpense("add", undefined, {
      title: selectedExpense,
      amount: expenseAmount,
      participants: selectedPersons,
    });

    setSelectedExpense("");
    setExpenseAmount(0);
    setSelectedPersons([]);
  };

  const handleChangeSelectedPersons = (action: boolean, person: number) => {
    setSelectedPersons((prev) =>
      action && !prev.includes(person)
        ? [...prev, person]
        : prev.filter((member) => member !== person),
    );
  };

  return (
    <form
      onSubmit={(e) => handleAddExpense(e)}
      className="mt-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg space-y-5"
    >
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

      {/* Expense Name */}
      <Select
        value={selectedExpense}
        onValueChange={(e) => setSelectedExpense(e)}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select an expense" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Expense</SelectLabel>
            {["Travel", "Breakfast", "Lunch", "Snack", "Dinner"].map(
              (expense) => (
                <SelectItem key={expense} value={expense}>
                  {expense}
                </SelectItem>
              ),
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Meal Amount */}
      <Input
        className="h-12 text-base"
        placeholder="Enter expense amount..."
        type="number"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(Number(e.target.value))}
      />

      {/* Members in Meal */}
      <FieldSet>
        <FieldLegend variant="label">Select Expense Members:</FieldLegend>
        <FieldGroup className="gap-3">
          {persons.map((person) => (
            <Field orientation="horizontal" key={person.id}>
              <Checkbox
                id="finder-pref-9k2-external-disks-1yg-checkbox"
                name="finder-pref-9k2-external-disks-1yg-checkbox"
                checked={selectedPersons.includes(person.id)}
                onCheckedChange={(e: boolean) =>
                  handleChangeSelectedPersons(e, person.id)
                }
              />
              <FieldLabel
                htmlFor="finder-pref-9k2-external-disks-1yg-checkbox"
                className="font-normal"
              >
                {person.name[0].toUpperCase() + person.name.slice(1)}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>

      {/* Add Expense Button */}
      <Button
        className="mt-5 h-8 px-6 w-full text-base flex items-center gap-2 rounded-2xl  shadow-lg"
        variant="secondary"
        type="submit"
      >
        <Plus size={18} />
        Add Expense
      </Button>
    </form>
  );
}

export default AddExpense;
