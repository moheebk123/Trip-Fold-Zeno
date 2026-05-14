import { Globe, CodeXml } from "lucide-react";

function Links() {
  return (
    <div className="p-3 grid grid-cols-2 gap-3 w-full max-w-sm">
      <a
        className="border flex gap-2 items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5"
        href="https://trip-fold-zeno-official.vercel.app"
        target="_blank"
      >
        <Globe size={16} />
        <p className="sm:text-sm">Website</p>
      </a>
      <a
        className="border flex gap-2 items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5"
        href="https://github.com/moheebk123/Trip-Expense-Calculator"
        target="_blank"
      >
        <CodeXml size={16} />
        <p className="sm:text-sm">Code</p>
      </a>
    </div>
  );
}

export default Links;
