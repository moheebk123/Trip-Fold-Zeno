import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { Plus, X, ChevronDown } from "lucide-react";

import { alertActions, expenseActions } from "@/store";

import type { PersonInterface } from "@/types";

const expenseOptions: string[] = [
  "Travel",
  "Breakfast",
  "Lunch",
  "Snacks",
  "Dinner",
  "Custom",
];

function AddExpense({
  tripId,
  members,
}: {
  tripId: number;
  members: PersonInterface[];
}) {
  const dispatch = useDispatch();

  const amountRef = useRef<HTMLInputElement>(null);
  const paidAmountRef = useRef<HTMLInputElement>(null);
  const customTitleRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("Travel");
  const [selectedParticipants, setSelectedParticipants] = useState<
    PersonInterface[]
  >([]);
  const [paidBy, setPaidBy] = useState<PersonInterface | undefined>();
  const [date, setDate] = useState<Date>();

  const handleParticipantToggle = (member: PersonInterface) => {
    const exists = selectedParticipants.find((m) => m.id === member.id);

    if (exists) {
      setSelectedParticipants((prev) => prev.filter((m) => m.id !== member.id));
    } else {
      setSelectedParticipants((prev) => [...prev, member]);
    }
  };

  const handleRemoveParticipant = (memberId: number) => {
    setSelectedParticipants((prev) =>
      prev.filter((member) => member.id !== memberId),
    );
  };

  const handleAddExpense = () => {
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
          message: "Please enter valid expense amount!",
        }),
      );
      return;
    }

    if (selectedParticipants.length < 1) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please select at least one participant!",
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

    dispatch(
      expenseActions.addExpense({
        title: finalTitle,
        amount,
        participants: selectedParticipants,
        trip: tripId,
        date,
        paidBy,
        paidAmount,
      }),
    );

    dispatch(
      alertActions.showAlert({
        variant: "success",
        message: "Expense added successfully!",
      }),
    );

    setTitle("Travel");
    setSelectedParticipants([]);
    setPaidBy(undefined);
    setOpen(false)

    if (amountRef.current) amountRef.current.value = "";
    if (paidAmountRef.current) paidAmountRef.current.value = "";
    if (customTitleRef.current) customTitleRef.current.value = "";
  };

  return (
    <Drawer open={open}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="w-full py-5 text-lg"
          onClick={() => setOpen(true)}
        >
          <Plus size={18} />
          Add Expense
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-slate-950 text-white border-white/10 h-[95vh] sm:h-fit max-h-[95vh] flex flex-col">
        <DrawerHeader className="border-b border-white/10 pb-5 shrink-0">
          <DrawerTitle className="text-lg font-bold text-white">
            Trip Fold Zeno
          </DrawerTitle>
          <DrawerDescription>Add new expense for this trip</DrawerDescription>
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
                      checked={selectedParticipants.some(
                        (m) => m.id === member.id,
                      )}
                      onCheckedChange={() => handleParticipantToggle(member)}
                    />
                    <span>{member.name}</span>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                {selectedParticipants.map((member) => (
                  <Badge
                    key={member.id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {member.name}
                    <button onClick={() => handleRemoveParticipant(member.id)}>
                      <X size={14} />
                    </button>
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
                    defaultValue="0"
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
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DrawerFooter className="w-full max-w-lg mx-auto flex flex-row gap-2 shrink-0">
          <DrawerClose asChild>
            <Button
              variant="destructive"
              className="w-1/2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DrawerClose>

          <Button
            variant="secondary"
            className="w-1/2"
            onClick={handleAddExpense}
          >
            Add Expense
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddExpense;
