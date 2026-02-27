import { useState } from "react";
import { AdvancedStudent } from "@/lib/advanced-kmeans";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

interface Props {
    onAdd: (student: AdvancedStudent) => void;
}

const AdvancedAddStudentForm = ({ onAdd }: Props) => {
    const [name, setName] = useState("");
    const [maths, setMaths] = useState("");
    const [programming, setProgramming] = useState("");
    const [communication, setCommunication] = useState("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateScore = (scoreStr: string, fieldName: string) => {
        if (scoreStr === "") return `${fieldName} is required.`;
        const score = Number(scoreStr);
        if (isNaN(score) || score < 0 || score > 100) return `${fieldName} must be 0-100.`;
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = "Name is required.";
        const mathsErr = validateScore(maths, "Maths");
        if (mathsErr) newErrors.maths = mathsErr;
        const progErr = validateScore(programming, "Programming");
        if (progErr) newErrors.programming = progErr;
        const commErr = validateScore(communication, "Communication");
        if (commErr) newErrors.communication = commErr;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
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
        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card border p-6 transition-all duration-300">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Add Student</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="sm:col-span-2 lg:col-span-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Student name" value={name} onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })) }} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                {[
                    { label: "Maths", fieldPath: "maths", value: maths, set: setMaths },
                    { label: "Programming", fieldPath: "programming", value: programming, set: setProgramming },
                    { label: "Communication", fieldPath: "communication", value: communication, set: setCommunication },
                ].map(({ label, fieldPath, value, set }) => (
                    <div key={label}>
                        <Label>{label} (0-100)</Label>
                        <Input type="number" min={0} max={100} placeholder="0-100" value={value} onChange={e => { set(e.target.value); setErrors(prev => ({ ...prev, [fieldPath]: '' })) }} />
                        {errors[fieldPath] && <p className="text-destructive text-xs mt-1">{errors[fieldPath]}</p>}
                    </div>
                ))}
                <div className="flex items-end">
                    <Button type="submit" className="w-full gap-2 transition-transform active:scale-95">
                        <UserPlus className="w-4 h-4" />
                        Add
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AdvancedAddStudentForm;
