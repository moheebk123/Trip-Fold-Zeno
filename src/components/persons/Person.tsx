import { useState, useContext } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil, Trash2, Check } from "lucide-react";

interface Person {
  id: number;
  name: string;
}
function Person({ person }: { person: Person }) {
  const { changePerson } = useContext(ExpenseContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(person.name);

  const handleRemovePerson = () => {
    changePerson("remove", undefined, person.id);
  };

  const handleEditPerson = () => {
    if (!newName) return;

    changePerson("edit", newName, person.id);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-slate-900/60 hover:bg-slate-800/60 transition px-4 py-3 rounded-xl border border-white/5">
      {isEditing ? (
        <Input
          className="h-12 text-base"
          placeholder="Enter person name..."
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      ) : (
        <span className="text-base">
          {person.name[0].toUpperCase() + person.name.slice(1)}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 ml-2">
        {/* Edit */}
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-slate-700"
          onClick={isEditing ? () => handleEditPerson() : () => setIsEditing(() => true)}
        >
          {isEditing ? <Check size={16} /> :
          <Pencil size={16} />}
        </Button>

        {/* Delete */}
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-red-500/20 text-red-400"
          onClick={handleRemovePerson}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}

export default Person;
