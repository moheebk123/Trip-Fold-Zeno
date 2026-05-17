import { Link } from "react-router-dom";
import { Links } from "@/components";

import logo from "/trip-fold-zeno.png";

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

import { Button } from "@/components/ui/button";

import { Menu, SquareArrowOutUpRight } from "lucide-react";

import { drawerItems } from "@/data/drawer";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

function AppDrawer() {
  const trips = useSelector((state: RootState) => state.trips);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-slate-950 text-white border-white/10">
        {/* Header */}
        <DrawerHeader className="border-b border-white/10 pb-5 shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Trip Fold Zeno"
              className="w-16 h-16 rounded-xl"
            />

            <div>
              <DrawerTitle className="text-lg font-bold text-white">
                Trip Fold Zeno
              </DrawerTitle>

              <DrawerDescription className="text-slate-400">
                Smart expense tracking for trips, budgets, and group balances.
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-6 px-4 py-5  w-full max-w-lg mx-auto p-3">
            {drawerItems.map((menu) => (
              <div key={menu.id} className="space-y-3">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {menu.menuHeading}
                </h3>

                <div className="space-y-2">
                  {menu.menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <DrawerTrigger asChild>
                        <Link
                          key={item.id}
                          to={item.url}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition"
                        >
                          <Icon size={18} />
                          <span>{item.title}</span>
                        </Link>
                      </DrawerTrigger>
                    );
                  })}
                  {menu.menuHeading === "Travel" && trips.length > 0 ? (
                    trips.map((trip) => (
                      <div key={trip.id} className="ml-5">
                        <DrawerTrigger asChild>
                          <Link
                            to={`/trips/${trip.id}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition"
                          >
                            <SquareArrowOutUpRight size={18} />
                            <span>{trip.title}</span>
                          </Link>
                        </DrawerTrigger>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t border-white/10 pt-4 shrink-0">
          <Links />

          <DrawerClose asChild>
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AppDrawer;
