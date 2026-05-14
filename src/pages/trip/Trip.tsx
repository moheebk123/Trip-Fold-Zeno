import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";

import { ArrowLeft, Pencil, Check, X } from "lucide-react";

import {
  TripNotFound,
  TripStats,
  TripMembers,
  AddExpense,
  TripExpenses,
} from "@/components";

import { alertActions, tripActions } from "@/store";

import type { RootState } from "@/store";

import type { ExpenseInterface, TripInterface } from "@/types";

function Header({ tripId, tripTitle }: { tripId: number; tripTitle: string }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleEditTitle = () => {
    const title = titleRef.current?.value;
    if (!title) {
      dispatch(
        alertActions.showAlert({
          variant: "warning",
          message: "Please enter a valid trip title!",
        }),
      );
      return;
    }

    dispatch(
      tripActions.editTripField({
        id: tripId,
        field: "title",
        value: title,
      }),
    );
    dispatch(
      alertActions.showAlert({
        variant: "success",
        message: "Trip title updated successfully!",
      }),
    );
    setIsEditing(false);
    if (titleRef.current) titleRef.current.value = "";
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold truncate flex gap-3 items-center">
        <Link
          to="/trips"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              className="h-12 text-base"
              placeholder="Enter trip title..."
              type="text"
              defaultValue={tripTitle}
              ref={titleRef}
            />
            <span className="flex gap-2 items-center">
              <Check
                size={18}
                className="text-emerald-400 cursor-pointer"
                onClick={handleEditTitle}
              />
              <X
                className="text-red-400 cursor-pointer"
                size={18}
                onClick={() => setIsEditing(false)}
              />
            </span>
          </div>
        ) : (
          tripTitle
        )}
      </h1>
      {isEditing ? <></> : <Pencil
        className="text-blue-400 cursor-pointer"
        onClick={() => setIsEditing(true)}
      />}
    </header>
  );
}

function Trip() {
  const { tripId } = useParams();

  const trips: TripInterface[] = useSelector((state: RootState) => state.trips);
  const expenses = useSelector((state: RootState) => state.expenses);

  const trip: TripInterface | undefined = trips.find(
    (trip: { id: number | string }) => String(trip.id) === String(tripId),
  );

  if (!trip) {
    return <TripNotFound />;
  }

  const tripExpenses: ExpenseInterface[] = expenses.filter(
    (expense) => expense.trip === trip.id,
  );

  let totalExpense: number = 0;
  for (const expense of tripExpenses) {
    totalExpense += expense.amount;
  }

  const totalAmount: number = trip.members.length * trip.perPersonBudget;
  const totalBalance: number = totalAmount - totalExpense;

  return (
    <section className="min-h-screen px-3 py-5 space-y-8">
      {/* Header */}
      <Header tripId={trip.id} tripTitle={trip.title} />

      {/* Trip Stats */}
      <TripStats
        tripId={trip.id}
        totalAmount={totalAmount}
        totalExpense={totalExpense}
        totalBalance={totalBalance}
        perPersonBudget={trip.perPersonBudget}
      />

      {/* Trip Members */}
      <TripMembers
        tripId={trip.id}
        members={trip.members}
        tripExpenses={tripExpenses}
        perPersonBudget={trip.perPersonBudget}
      />

      {/* Add Expenses */}
      <AddExpense tripId={trip.id} members={trip.members} />

      {/* Expenses */}
      <TripExpenses tripId={trip.id} members={trip.members} />
    </section>
  );
}

export default Trip;
