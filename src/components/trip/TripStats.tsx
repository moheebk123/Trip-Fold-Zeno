import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { Input } from "../ui/input";

import { Pencil, Check, X } from "lucide-react";

import {
  Wallet,
  WalletMinimal,
  Receipt,
  BadgeIndianRupee,
  type LucideIcon,
} from "lucide-react";

import { alertActions, tripActions } from "@/store";

interface TripStatsPropsInterface {
  tripId: number;
  totalExpense: number;
  totalAmount: number;
  totalBalance: number;
  perPersonBudget: number;
}

interface StatsInterface {
  title: string;
  amount: string;
  icon: LucideIcon;
}

function TripStats({
  tripId,
  totalExpense,
  totalAmount,
  totalBalance,
  perPersonBudget,
}: TripStatsPropsInterface) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const amountRef = useRef(null);

  const dispatch = useDispatch();

  const stats: StatsInterface[] = [
    {
      title: "Total Budget",
      amount: totalAmount.toLocaleString(),
      icon: Wallet,
    },
    {
      title: "Per Head",
      amount: perPersonBudget.toLocaleString(),
      icon: WalletMinimal,
    },
    {
      title: "Total Expense",
      amount: totalExpense.toLocaleString(),
      icon: Receipt,
    },
    {
      title: totalBalance >= 0 ? "Remaining Balance" : "Over Budget",
      amount: Math.abs(totalBalance).toLocaleString(),
      icon: BadgeIndianRupee,
    },
  ];

  const handleEditAmount = () => {
    const amount = amountRef.current?.value;
    if (!amount || amount < 1) {
      dispatch(alertActions.showAlert({ variant: "warning", message: "Please enter a valid per person budget!" }))
      return;
    }

    dispatch(tripActions.editTripField({id: tripId, field: "perPersonBudget", value: amount}))
    dispatch(alertActions.showAlert({ variant: "success", message: "Trip per person budget updated successfully!" }))
    setIsEditing(false);
    if (amountRef.current) amountRef.current.value = 0;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`bg-white/5 border border-white/10 rounded-2xl p-3 shadow-lg`}
          >
            <p
              className={`text-sm text-slate-400 mb-2 flex gap-2 items-center`}
            >
              <Icon
                size={20}
                className={
                  stat.title === "Total Budget"
                    ? "text-blue-400"
                    : stat.title === "Per Head"
                      ? "text-white"
                      : stat.title === "Total Expense"
                        ? "text-orange-400"
                        : totalBalance >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                }
              />
              {stat.title}
            </p>
            {isEditing && stat.title === "Per Head" ? (
              <div className="flex gap-2">
                <Input
                  className="h-12 text-base"
                  placeholder="Enter trip member name..."
                  type="number"
                  defaultValue={perPersonBudget}
                  ref={amountRef}
                />
                <span className="flex gap-2 items-center">
                  <Check
                    size={18}
                    className="text-emerald-400 cursor-pointer"
                    onClick={handleEditAmount}
                  />
                  <X
                    className="text-red-400 cursor-pointer"
                    size={18}
                    onClick={() => setIsEditing(false)}
                  />
                </span>
              </div>
            ) : (
              <h2
                className={`text-2xl font-bold ${
                  stat.title === "Total Budget"
                    ? "text-blue-400"
                    : stat.title === "Per Head"
                      ? "text-white flex justify-between"
                      : stat.title === "Total Expense"
                        ? "text-orange-400"
                        : totalBalance >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                }`}
              >
                ₹{stat.amount}{" "}
                {stat.title === "Per Head" ? (
                  <Pencil
                    size={16}
                    className="cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  />
                ) : (
                  <></>
                )}
              </h2>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TripStats;
