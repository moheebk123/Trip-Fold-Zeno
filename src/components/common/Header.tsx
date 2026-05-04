import logo from "/favicon.svg";

function Header() {
  return (
    <div className="mb-2 text-center">
      <div className="flex gap-2 items-center justify-center">
        <img src={logo} alt="Logo" className="w-10" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Trip Fold Zeno
        </h1>
      </div>
      <p className="text-slate-400 mt-2 text-lg">
        Manage group expenses smartly
      </p>
    </div>
  );
}

export default Header;
