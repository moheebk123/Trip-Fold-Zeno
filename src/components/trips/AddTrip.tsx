import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
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

import { Plus, X } from "lucide-react";

import { alertActions, tripActions, type RootState } from "@/store";

import type { PersonInterface } from "@/types";
import { Badge } from "../ui/badge";

function AddTrip() {
  const dispatch = useDispatch();

  const trips = useSelector((store: RootState) => store.trips);

  const [open, setOpen] = useState<boolean>(false)
  const [members, setMembers] = useState<PersonInterface[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const perPersonBudgetRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleAddMember = () => {
    if (!nameRef.current?.value.trim()) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter valid member name!",
        }),
      );
      return;
    }

    const isMemberExists = members.find(
      (member) => member.name === nameRef.current?.value.trim(),
    );

    if (isMemberExists) {
      dispatch(
        alertActions.showAlert({
          variant: "error",
          message: "Member with this name already exists!",
        }),
      );
      nameRef.current.value = "";
      return;
    }

    setMembers((prev) => [
      ...prev,
      { id: Date.now(), name: nameRef.current?.value.trim() || "Unnamed" },
    ]);
    nameRef.current.value = "";
  };

  const handleRemoveMember: (memberId: number) => void = (memberId) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const handleAddTrip = () => {
    const title = titleRef.current?.value.trim();
    if (!title) {
      dispatch(
        alertActions.showAlert({
          message: "Please enter valid trip name",
          variant: "warning",
        }),
      );
      return;
    }
    const isTripExists = trips.find((trip) => trip.title === title);
    if (isTripExists) {
      dispatch(
        alertActions.showAlert({
          message: "Trip with same title already exists!",
          variant: "error",
        }),
      );
      return;
    }

    const perPersonBudget = Number(perPersonBudgetRef.current?.value.trim());
    if (!perPersonBudget || perPersonBudget < 1) {
      dispatch(
        alertActions.showAlert({
          message: "Please enter valid per person budget",
          variant: "warning",
        }),
      );
      return;
    }
    if (members.length < 1) {
      dispatch(
        alertActions.showAlert({
          message: "Please enter at least one member",
          variant: "warning",
        }),
      );
      return;
    }

    dispatch(
      tripActions.addTrip({
        title,
        members,
        perPersonBudget,
      }),
    );
    dispatch(
      alertActions.showAlert({
        message: "Trip added successfully",
        variant: "success",
      }),
    );

    if (titleRef.current) titleRef.current.value = "";
    if (perPersonBudgetRef.current) perPersonBudgetRef.current.value = "";
    setMembers([]);
    setOpen(false)
  };

  return (
    <Drawer open={open} >
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="w-full py-5 text-lg" onClick={() => setOpen(true)}>
          <Plus size={16} />
          Add Trip
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-slate-950 text-white border-white/10 max-h-[90vh]">
        {/* Header */}
        <DrawerHeader className="border-b border-white/10 pb-5">
          <DrawerTitle className="text-lg font-bold text-white">
            Trip Fold Zeno
          </DrawerTitle>

          <DrawerDescription className="text-slate-400">
            Smart expense tracking for trips, budgets, and group balances.
          </DrawerDescription>
        </DrawerHeader>

        {/* Trip Details */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-4 w-full max-w-lg mx-auto p-3">
            <div className="space-y-2 w-full max-w-lg mx-auto mb-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg">
              <Label className="pl-2 font-bold text-lg">Trip Title</Label>
              <Input
                className="h-12 text-base"
                placeholder="Enter trip title..."
                type="text"
                ref={titleRef}
              />
            </div>
            <div className="space-y-2 w-full max-w-lg mx-auto mb-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg">
              <Label className="pl-2 font-bold text-lg">
                Per Person Budget
              </Label>
              <Input
                className="h-12 text-base"
                placeholder="Enter per person trip budget..."
                type="number"
                ref={perPersonBudgetRef}
              />
            </div>
            <div className="space-y-2 w-full max-w-lg mx-auto mb-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg">
              <h2 className="text-lg font-semibold">Add Members</h2>

              <div className="flex gap-3 items-center">
                <Input
                  className="h-12 text-base"
                  placeholder="Enter member name..."
                  type="text"
                  ref={nameRef}
                />

                <Button
                  className="h-12 px-6 text-base rounded-xl flex items-center gap-2"
                  variant="secondary"
                  onClick={handleAddMember}
                >
                  <Plus size={18} />
                  Add
                </Button>
              </div>

              <h2 className="text-lg font-semibold my-4">
                Members ({members.length})
              </h2>
              {members.length === 0 ? (
                <p className="text-sm text-slate-400">No persons added yet</p>
              ) : (
                <div className="space-y-3 flex gap-2 flex-wrap">
                  {members.map((member) => (
                    <Badge
                      key={member.id}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-base"
                    >
                      {member.name}

                      <button
                        className="ml-1 hover:text-red-400"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X size={16} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="w-full max-w-lg mx-auto flex gap-2 flex-row">
          <DrawerClose asChild>
            <Button variant="destructive" className="w-1/2" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerClose>
          <Button variant="secondary" className="w-1/2" onClick={handleAddTrip}>
            Add Trip
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddTrip;
