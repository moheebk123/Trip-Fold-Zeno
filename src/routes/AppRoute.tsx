import { Link, Outlet } from "react-router-dom";

import logo from "/trip-fold-zeno.png";

import { AlertBox, AppDrawer } from "@/components";

function AppRoute() {
  return (
    <div className="min-h-screen w-full max-w-lg mx-auto bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center">
      <header className="flex justify-between items-center w-full p-2 border-b border-b-blue-200 rounded-b-lg shadow-lg">
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="Trip Fold Zeno" className="w-16" />
          <span className="font-bold text-lg">Trip Fold Zeno</span>
        </Link>
        <AppDrawer />
      </header>
      {/* Main Content */}
      <main className="h-full w-full">
        <Outlet />
      </main>
      {/* Error & Success Messages */}
      <div className="fixed z-100 bottom-4 left-1/2 -translate-x-1/2 w-fit">
        <AlertBox />
      </div>
    </div>
  );
}

export default AppRoute;
