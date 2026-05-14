import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  alertActions,
  expenseActions,
  tripActions,
  type RootState,
} from "@/store";

import { Input } from "../ui/input";

import { Pencil, Check, Trash2, X, Plus } from "lucide-react";

import type { ExpenseInterface, PersonInterface } from "@/types";

interface TripMemberInterface extends PersonInterface {
  index: number
}

function Member({
  member,
  totalExpense,
  perPersonBudget,
  onClick,
}: {
  onClick: (
    action: "add" | "edit" | "delete",
    memberId?: number,
    newName?: string,
  ) => void;
  member: TripMemberInterface;
  totalExpense: number;
  perPersonBudget: number;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleEditMember = () => {
    if (!nameRef.current?.value) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter valid member name!",
        }),
      );
    }
    onClick("edit", member.id, nameRef.current?.value || "Unnamed");

    setIsEditing(false);
    if (nameRef.current) nameRef.current.value = "";
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (nameRef.current) nameRef.current.value = member.name;
  };

  return (
    <div className="flex items-center justify-between gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg">
      {isEditing ? (
        <Input
          className="h-12 text-base"
          placeholder="Enter trip member name..."
          defaultValue={member.name}
          type="text"
          ref={nameRef}
        />
      ) : (
        <div>
          <h3 className="font-semibold">
            {member.index + 1}. {member.name}
          </h3>

          <p className="text-sm text-slate-400">
            Expense: (₹{totalExpense}) • Balance: (₹
            {perPersonBudget - totalExpense})
          </p>
        </div>
      )}
      <span className="flex gap-2 items-center">
        {isEditing ? (
          <Check
            size={18}
            className="text-emerald-400 cursor-pointer"
            onClick={handleEditMember}
          />
        ) : (
          <Pencil
            className="text-blue-400 cursor-pointer"
            size={18}
            onClick={handleEdit}
          />
        )}
        {isEditing ? (
          <X
            className="text-red-400 cursor-pointer"
            size={18}
            onClick={() => setIsEditing(false)}
          />
        ) : (
          <Trash2
            size={18}
            className="text-red-400 cursor-pointer"
            onClick={() => onClick("delete", member.id)}
          />
        )}
      </span>
    </div>
  );
}

function AddMember({
  onClick,
  onClose,
}: {
  onClick: (
    action: "add" | "edit" | "delete",
    memberId?: number,
    newName?: string,
  ) => void;
  onClose: () => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleAddMember = () => {
    if (!nameRef.current?.value) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter valid member name!",
        }),
      );
    }
    onClick("add", undefined, nameRef.current?.value || "Unnamed");

    if (nameRef.current) nameRef.current.value = "";
  };

  return (
    <div className="flex items-center justify-between gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-lg">
      <Input
        className="h-12 text-base"
        placeholder="Enter trip member name..."
        type="text"
        ref={nameRef}
      />
      <span className="flex gap-2 items-center">
        <Check
          size={18}
          className="text-emerald-400 cursor-pointer"
          onClick={handleAddMember}
        />
        <X
          className="text-red-400 cursor-pointer"
          size={18}
          onClick={onClose}
        />
      </span>
    </div>
  );
}

function TripMembers({
  tripId,
  members,
  tripExpenses,
  perPersonBudget,
}: {
  tripId: number;
  members: PersonInterface[];
  tripExpenses: ExpenseInterface[];
  perPersonBudget: number;
}) {
  const dispatch = useDispatch();

  const expenses = useSelector((store: RootState) => store.expenses);

  const [isAddingMember, setIsAddingMember] = useState<boolean>(false);

  const calculatePersonExpense = (personId: number): number => {
    let totalExpense: number = 0;
    for (const expense of tripExpenses) {
      if (
        expense.participants.length > 0 &&
        expense.participants.find((p) => p.id === personId)
      )
        totalExpense += expense.amount / expense.participants.length;
    }
    return Number(totalExpense.toFixed(2));
  };

  const handleClick = (
    action: "add" | "edit" | "delete",
    memberId?: number,
    newName?: string,
  ) => {
    if (action === "add" && newName) {
      const isNameExists = members.find((member) => member.name === newName);
      if (isNameExists) {
        dispatch(
          alertActions.showAlert({
            variant: "warning",
            message: "Member with this name already exists!",
          }),
        );
        return;
      }

      dispatch(tripActions.addTripMember({ id: tripId, name: newName }));
      dispatch(
        alertActions.showAlert({
          variant: "success",
          message: "Trip member added successfully!",
        }),
      );
      setIsAddingMember(false);
    } else if (action === "delete" && memberId) {
      const isNameExists = members.find((member) => member.id === memberId);
      if (!isNameExists) {
        dispatch(
          alertActions.showAlert({
            variant: "warning",
            message: "Member does not exists!",
          }),
        );
        return;
      }

      const updatedExpenses = expenses.map((expense) => {
        return {
          ...expense,
          participants: expense.participants.filter((p) => p.id !== memberId),
        };
      });
      dispatch(expenseActions.setExpenses(updatedExpenses));

      dispatch(tripActions.deleteTripMember({ id: tripId, memberId }));

      dispatch(
        alertActions.showAlert({
          variant: "success",
          message: "Trip member removed successfully!",
        }),
      );
    } else if (action === "edit" && memberId && newName) {
      const isNameExists = members.find(
        (member) => member.name === newName && member.id !== memberId,
      );
      if (isNameExists) {
        dispatch(
          alertActions.showAlert({
            variant: "warning",
            message: "Member with this name already exists!",
          }),
        );
        return;
      }

      dispatch(
        tripActions.editTripMember({ id: tripId, memberId, name: newName }),
      );
      dispatch(
        alertActions.showAlert({
          variant: "success",
          message: "Trip member name edit successfully!",
        }),
      );
    } else {
      dispatch(
        alertActions.showAlert({
          variant: "error",
          message: "Invalid trip member remove action!",
        }),
      );
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-lg space-y-3">
      <h2 className="text-lg font-semibold flex items-center justify-between gap-2">
        Members ({members.length})
        <span
          className="flex items-center gap-2 text-emerald-400 cursor-pointer"
          onClick={() => setIsAddingMember(true)}
        >
          <Plus size={18} className="" /> Add
        </span>
      </h2>
      {isAddingMember ? (
        <AddMember
          onClick={handleClick}
          onClose={() => setIsAddingMember(false)}
        />
      ) : (
        <></>
      )}
      {members.length === 0 ? (
        <p className="text-sm text-slate-400">No trip added yet</p>
      ) : (
        members.map((member, index) => (
          <Member
            key={member.id}
            member={{ ...member, index }}
            onClick={handleClick}
            totalExpense={calculatePersonExpense(member.id)}
            perPersonBudget={perPersonBudget}
          />
        ))
      )}
    </div>
  );
}

export default TripMembers;
