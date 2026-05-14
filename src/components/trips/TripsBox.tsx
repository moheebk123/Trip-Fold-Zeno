import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Eye, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import { alertActions, expenseActions, tripActions, type RootState } from "@/store";

function TripsBox() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const trips = useSelector((store: RootState) => store.trips);
  const expenses = useSelector((store: RootState) => store.expenses);

  const handleDeleteTrip = (tripId: number) => {
    const updatedExpenses = expenses.filter(expense => expense.trip !== tripId)
    dispatch(expenseActions.setExpenses(updatedExpenses))
    dispatch(tripActions.deleteTrip(tripId));
    setOpen(false);
    dispatch(
      alertActions.showAlert({
        variant: "success",
        message: "Trip data deleted successfully",
      }),
    );
  };

  return (
    <div className="space-y-2 w-full max-w-lg mx-auto mb-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg">
      <h2 className="text-lg font-semibold">Trips ({trips.length})</h2>
      {trips.length === 0 ? (
        <p className="text-sm text-slate-400">No trip added yet</p>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between gap-1 px-3 py-2 font-semibold space-y-2 w-full max-w-lg mx-auto mb-5 transition bg-slate-800/50 hover:bg-slate-800 backdrop-blur-md border border-slate-700 rounded-md p-3 shadow-lg"
            >
              <span>
                {trip.title} (₹{trip.perPersonBudget * trip.members.length})
                <br />
                Members: {trip.members.length}
              </span>
              <span className="flex gap-2 items-center">
                <Link to={`/trips/${trip.id}`} className="py-1.25 px-2 rounded-md bg-blue-400/10">
                  <Eye size={18} className="text-blue-400 cursor-pointer" />
                </Link>
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={16} />
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
                        Are you sure you want to delete all trips data? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer text-black hover:bg-gray-300">
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TripsBox;
