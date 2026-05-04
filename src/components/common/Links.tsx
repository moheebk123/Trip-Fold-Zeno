import { ArrowDownToLine, CodeXml, Globe } from "lucide-react";

function Links() {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-6 shadow-lg grid grid-cols-2 gap-3 my-2 w-full max-w-sm">
      {window.document ? (
        <a
          className="border flex gap-2 items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5"
          href="https://trip-fold-zeno.vercel.app"
          target="_blank"
        >
          <Globe size={16} />
          <p className="sm:text-sm">Website</p>
        </a>
      ) : (
        <a
          className="border flex gap-2 items-center justify-center p-2 rounded-full cursor-pointer hover:bg-white/5"
          href="/trip-fold-zeno.apk"
          target="_blank"
          download
        >
          <ArrowDownToLine size={16} />
          <p className="sm:text-sm">Android</p>
        </a>
      )}

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
