import { useContext, useRef } from "react";

import { ExpenseContext } from "@/context/ExpenseContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

function AddPerson() {
  const { changePerson } = useContext(ExpenseContext);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleAddPerson = () => {
    if (!nameRef.current?.value.trim()) return;

    changePerson("add", nameRef.current.value, undefined);
    nameRef.current.value = "";
  };

  return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Members</h2>

        <div className="flex gap-3 items-center">
          <Input
            className="h-12 text-base"
            placeholder="Enter person name..."
            ref={nameRef}
          />

          <Button
            className="h-12 px-6 text-base rounded-xl flex items-center gap-2"
            variant="secondary"
            onClick={handleAddPerson}
          >
            <Plus size={18} />
            Add
          </Button>
        </div>
      </div>
  )
}

export default AddPerson
