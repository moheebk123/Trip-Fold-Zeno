import { useState } from "react";
import { useDispatch } from "react-redux";

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

import { Trash2, X } from "lucide-react";
import { alertActions, tripActions, expenseActions } from "@/store";

function Remove() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    dispatch(tripActions.deleteTrips());
    dispatch(expenseActions.deleteExpenses());
    setOpen(false);
    dispatch(
      alertActions.showAlert({
        variant: "success",
        message: "All trips data deleted successfully",
      }),
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg flex items-center justify-between gap-3 w-full">
      <p className="text-sm md:text-base text-slate-300">
        Want to remove all trips data?
      </p>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 size={16} />
            Delete
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
              Are you sure you want to delete all trips data? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer text-black hover:bg-gray-300">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Remove;
