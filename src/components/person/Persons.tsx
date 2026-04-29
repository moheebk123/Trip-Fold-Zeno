import { useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

function Persons() {
  const { persons, changePerson } = useContext(ExpenseContext);

  const handleRemovePerson = (personId: number) => {
    changePerson("remove", undefined, personId);
  };

  const handleEditPerson = (personId: number) => {
    const newName = prompt("Enter new name");
    if (!newName) return;

    changePerson("edit", newName, personId);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Members ({persons.length})</h2>

      {persons.length === 0 ? (
        <p className="text-sm text-slate-400">No persons added yet</p>
      ) : (
        <div className="space-y-3">
          {persons.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between bg-slate-900/60 hover:bg-slate-800/60 transition px-4 py-3 rounded-xl border border-white/5"
            >
              <span className="text-base">
                {person.name[0].toUpperCase() + person.name.slice(1)}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Edit */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-slate-700"
                  onClick={() => handleEditPerson(person.id)}
                >
                  <Pencil size={16} />
                </Button>

                {/* Delete */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-red-500/20 text-red-400"
                  onClick={() => handleRemovePerson(person.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Persons;
