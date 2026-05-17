import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

import {
  Pencil,
  Trash2,
  X,
  IndianRupee,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import { alertActions, expenseActions, type RootState } from "@/store";

import type { ExpenseInterface, PersonInterface } from "@/types";

const expenseOptions = [
  "Travel",
  "Breakfast",
  "Lunch",
  "Snacks",
  "Dinner",
  "Custom",
];

function EditExpense({
  expense,
  members,
  open,
  onClose,
}: {
  expense: ExpenseInterface;
  members: PersonInterface[];
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();

  const amountRef = useRef<HTMLInputElement>(null);
  const paidAmountRef = useRef<HTMLInputElement>(null);
  const customTitleRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(expense.title);
  const [participants, setParticipants] = useState<PersonInterface[]>(
    expense.participants,
  );
  const [paidBy, setPaidBy] = useState<PersonInterface | undefined>(
    expense.paidBy,
  );
  const [date, setDate] = useState<Date>(expense.date);

  const toggleParticipant = (member: PersonInterface) => {
    const exists = participants.find((m) => m.id === member.id);

    if (exists) {
      setParticipants((prev) => prev.filter((m) => m.id !== member.id));
    } else {
      setParticipants((prev) => [...prev, member]);
    }
  };

  const handleUpdateExpense = () => {
    const finalTitle =
      title === "Custom" ? customTitleRef.current?.value.trim() : title.trim();

    if (!finalTitle) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter valid expense title!",
        }),
      );
      return;
    }

    const amount = Number(amountRef.current?.value);

    if (!amount || amount < 1) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter valid amount!",
        }),
      );
      return;
    }

    if (participants.length < 1) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Select at least one participant!",
        }),
      );
      return;
    }

    const paidAmount = Number(paidAmountRef.current?.value);

    if (paidBy && (!paidAmount || paidAmount < 1)) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter a valid amount paid by member!",
        }),
      );
      return;
    }

    if (!date) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please select date!",
        }),
      );
      return;
    }

    if (expense.title !== finalTitle) dispatch(
      expenseActions.editExpenseField({
        id: expense.id,
        field: "title",
        value: finalTitle,
      }),
    );

    if (expense.amount !== amount) dispatch(
      expenseActions.editExpenseField({
        id: expense.id,
        field: "amount",
        value: amount,
      }),
    );

    if (expense.paidBy !== paidBy) dispatch(
      expenseActions.editExpenseField({
        id: expense.id,
        field: "paidBy",
        value: paidBy,
      }),
    );

    if (expense.paidAmount !== paidAmount) dispatch(
      expenseActions.editExpenseField({
        id: expense.id,
        field: "paidAmount",
        value: paidAmount,
      }),
    );

    if (expense.date !== date) dispatch(
      expenseActions.editExpenseField({
        id: expense.id,
        field: "date",
        value: date,
      }),
    );

    if (expense.participants.length !== participants.length) dispatch(
      expenseActions.editExpenseField({
        id: expense.id,
        field: "participants",
        value: participants,
      }),
    );

    dispatch(
      alertActions.showAlert({
        variant: "success",
        message: "Expense updated successfully!",
      }),
    );

    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="bg-slate-950 text-white border-white/10 h-[95vh] sm:h-fit max-h-[95vh] flex flex-col">
        <DrawerHeader className="border-b border-white/10 pb-5 shrink-0">
          <DrawerTitle className="text-lg font-bold text-white">
            Edit Expense
          </DrawerTitle>
          <DrawerDescription>Update expense details</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-4 w-full max-w-lg mx-auto p-3">
            {/* Title */}
            <div className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              <Label>Expense Type</Label>

              <Select value={title} onValueChange={setTitle}>
                <SelectTrigger className="w-full h-12 bg-slate-900 border-white/10">
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>

                <SelectContent className="bg-slate-950 border-white/10 text-white">
                  {expenseOptions.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="cursor-pointer"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {title === "Custom" && (
                <Input
                  ref={customTitleRef}
                  placeholder="Enter custom expense title..."
                />
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              <Label>Amount</Label>
              <Input
                ref={amountRef}
                type="number"
                defaultValue={expense.amount}
                placeholder="Enter expense amount..."
              />
            </div>

            {/* Participants */}
            <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-4">
              <Label>Select Participants</Label>

              <div className="flex gap-2 items-center">
                {members.map((member) => (
                  <span key={member.id} className="flex items-center gap-3">
                    <Checkbox
                      checked={participants.some((m) => m.id === member.id)}
                      onCheckedChange={() => toggleParticipant(member)}
                    />
                    <span>{member.name}</span>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                {participants.map((member) => (
                  <Badge key={member.id} variant="secondary">
                    {member.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Paid By */}
            <div className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              <Label>Paid By</Label>

              <Select
                value={paidBy ? String(paidBy.id) : ""}
                onValueChange={(value) =>
                  setPaidBy(
                    members.find((member) => member.id === Number(value)),
                  )
                }
              >
                <SelectTrigger className="w-full h-12 bg-slate-900 border-white/10">
                  <SelectValue placeholder="Select payer" />
                </SelectTrigger>

                <SelectContent className="bg-slate-950 border-white/10 text-white">
                  {members.map((member) => (
                    <SelectItem
                      key={member.id}
                      value={String(member.id)}
                      className="cursor-pointer"
                    >
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!paidBy ? (
                <></>
              ) : (
                <>
                  <Label>Paid Amount</Label>
                  <Input
                    ref={paidAmountRef}
                    type="number"
                    defaultValue={expense.paidAmount}
                    placeholder="Enter amount paid by member..."
                  />
                </>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    data-empty={!date}
                    className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DrawerFooter className="w-full max-w-lg mx-auto flex flex-row gap-2 shrink-0">
          <DrawerClose asChild>
            <Button variant="destructive" className="w-1/2">
              Cancel
            </Button>
          </DrawerClose>

          <Button
            variant="secondary"
            className="w-1/2"
            onClick={handleUpdateExpense}
          >
            Edit Expense
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Expense({
  expense,
  members,
}: {
  expense: ExpenseInterface;
  members: PersonInterface[];
}) {
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteExpense = () => {
    dispatch(expenseActions.deleteExpense(expense.id));
    setOpen(false);
    dispatch(
      alertActions.showAlert({
        variant: "success",
        message: "Expense deleted successfully!",
      }),
    );
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem
          value={`expense-${expense.id}`}
          className="bg-white/5 border border-white/10 rounded-xl px-3"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center justify-between w-full mr-3">
              <div className="text-left">
                <h3 className="font-semibold">
                  {expense.title} (₹{expense.amount})
                </h3>

                {!expense.paidBy && !expense.paidAmount ? <></> : <p className="text-sm text-slate-400">
                  Paid By: {expense.paidBy?.name} (₹{expense.paidAmount})
                </p>}
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-4 space-y-4">
            {/* Details */}
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <span className="font-medium text-white">Date:</span>{" "}
                {new Date(expense.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p>
                <span className="font-medium text-white">
                  Participants ({expense.participants.length}):
                </span>
              </p>

              <div className="flex flex-wrap gap-2">
                {expense.participants.map((participant) => (
                  <span
                    key={participant.id}
                    className="px-3 py-1 rounded-full text-xs bg-slate-800 border border-white/10"
                  >
                    {participant.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-white/10">
              <button
                className="flex items-center gap-2 font-semibold text-blue-500 text-sm bg-blue-400/20 rounded-md px-2"
                onClick={() => setOpenEdit(true)}
              >
                <Pencil size={16} />
                Edit
              </button>

              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-slate-950 border border-white/10 text-white">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <AlertDialogTitle className="text-lg font-semibold">
                      Confirm Delete
                    </AlertDialogTitle>

                    <button
                      onClick={() => setOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <AlertDialogHeader>
                    <AlertDialogDescription className="text-slate-400">
                      Are you sure you want to delete expense data? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer text-black hover:bg-gray-300">
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDeleteExpense}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <EditExpense
        expense={expense}
        members={members}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </>
  );
}

function TripExpenses({
  tripId,
  members,
}: {
  tripId: number;
  members: PersonInterface[];
}) {
  const expenses = useSelector((state: RootState) => state.expenses);

  const tripExpenses = expenses.filter((expense) => expense.trip === tripId);

  const groupedExpenses = useMemo(() => {
    return tripExpenses.reduce(
      (acc: Record<string, ExpenseInterface[]>, expense) => {
        const formattedDate = new Date(expense.date)
          .toISOString()
          .split("T")[0];

        if (!acc[formattedDate]) acc[formattedDate] = [];

        acc[formattedDate].push(expense);

        return acc;
      },
      {},
    );
  }, [tripExpenses]);

  return (
    <div className="space-y-4">
      {Object.keys(groupedExpenses).length === 0 ? (
        <div className="text-center text-slate-400 py-10">
          No expenses added yet
        </div>
      ) : (
        Object.entries(groupedExpenses).map(([date, expenses]) => {
          const dayTotal = expenses.reduce((sum, item) => sum + item.amount, 0);

          return (
            <div
              key={date}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarDays size={18} />
                  {format(date, "PPP")}
                </div>

                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <IndianRupee size={16} />
                  {dayTotal}
                </div>
              </div>

              {expenses.map((expense) => (
                <Expense key={expense.id} expense={expense} members={members} />
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}

export default TripExpenses;
