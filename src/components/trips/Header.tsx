function Header() {
  return (
    <div className="text-center">
      <div className="flex gap-2 items-center justify-center">
        {/* <img src={logo} alt="Logo" className="w-8" /> */}
        <h1 className="text-2xl font-bold tracking-tight">
          Trip Fold Zeno
        </h1>
      </div>
      <p className="text-slate-400 text-lg">
        Manage group expenses smartly
      </p>
    </div>
  );
}

export default Header;
