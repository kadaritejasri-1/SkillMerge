import { useState } from "react";
import { Student } from "@/lib/kmeans";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

interface Props {
  onAdd: (student: Student) => void;
}

const AddStudentForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [maths, setMaths] = useState("");
  const [programming, setProgramming] = useState("");
  const [communication, setCommunication] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      maths: Math.min(100, Math.max(0, Number(maths) || 0)),
      programming: Math.min(100, Math.max(0, Number(programming) || 0)),
      communication: Math.min(100, Math.max(0, Number(communication) || 0)),
    });
    setName(""); setMaths(""); setProgramming(""); setCommunication("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card border p-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Add Student</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Student name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        {[
          { label: "Maths", value: maths, set: setMaths },
          { label: "Programming", value: programming, set: setProgramming },
          { label: "Communication", value: communication, set: setCommunication },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <Label>{label} (0-100)</Label>
            <Input type="number" min={0} max={100} placeholder="0-100" value={value} onChange={e => set(e.target.value)} />
          </div>
        ))}
        <div className="flex items-end">
          <Button type="submit" className="w-full gap-2">
            <UserPlus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddStudentForm;
