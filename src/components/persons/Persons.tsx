import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import Person from "./Person";

function Persons() {
  const { persons } = useContext(ExpenseContext);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Members ({persons.length})</h2>

      {persons.length === 0 ? (
        <p className="text-sm text-slate-400">No persons added yet</p>
      ) : (
        <div className="space-y-3">
          {persons.map((person) => (
            <Person key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Persons;
