import type { LucideIcon } from "lucide-react";

interface AlertInterface {
  show: boolean;
  variant: "error" | "success" | "warning";
  message: string;
}

interface LoadInterface {
  isLoading: boolean;
}

interface PersonInterface {
  id: number;
  name: string;
}

interface TripInterface {
  id: number;
  title: string;
  members: PersonInterface[];
  perPersonBudget: number;
}

interface ExpenseInterface {
  id: number;
  title: string;
  amount: number;
  participants: PersonInterface[];
  trip: number;
  date: Date;
  paidBy?: PersonInterface;
  paidAmount?: number;
}

interface ExpenseDataInterface {
  expenses: ExpenseInterface[];
  trips: TripInterface[];
}

interface DrawerMenuInterface {
  id: number;
  title: string;
  url: string;
  icon: LucideIcon;
}

interface DrawerItemInterface {
  id: number;
  menuHeading: string;
  menuItems: DrawerMenuInterface[];
}

interface LegalInterface {
  heading: string;
  paragraph: string;
}
