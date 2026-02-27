import { useState, useMemo } from "react";
import { AdvancedStudent, getOverallSkillLevel } from "@/lib/advanced-kmeans";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvancedStudentTableProps {
    students: AdvancedStudent[];
    onRemove: (id: string) => void;
}

type SortField = 'name' | 'maths' | 'programming' | 'communication' | 'overall';
type SortOrder = 'asc' | 'desc';

function SkillBar({ value }: { value: number }) {
    // 0–40 → Red (Low)
    // 41–70 → Yellow/Orange (Medium)
    // 71–100 → Green (High)
    let color = "bg-red-500";
    if (value > 70) color = "bg-green-500";
    else if (value > 40) color = "bg-orange-400";

    return (
        <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-8">{value}%</span>
        </div>
    );
}

function OverallSkillBadge({ student }: { student: AdvancedStudent }) {
    const level = getOverallSkillLevel(student);
    let colorClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    if (level === 'High') colorClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    else if (level === 'Medium') colorClass = "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass} transition-colors`}>
            {level}
        </span>
    );
}

const AdvancedStudentTable = ({ students, onRemove }: AdvancedStudentTableProps) => {
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc'); // Default to desc for scores
        }
    };

    const sortedStudents = useMemo(() => {
        if (!sortField) return students;

        return [...students].sort((a, b) => {
            let aVal: any = a[sortField as keyof AdvancedStudent];
            let bVal: any = b[sortField as keyof AdvancedStudent];

            if (sortField === 'overall') {
                aVal = a.maths + a.programming + a.communication;
                bVal = b.maths + b.programming + b.communication;
            }

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [students, sortField, sortOrder]);


    const SortableHeader = ({ label, field, className }: { label: string, field: SortField, className?: string }) => (
        <TableHead className={`font-semibold cursor-pointer hover:bg-muted/80 transition-colors ${className}`} onClick={() => handleSort(field)}>
            <div className="flex items-center gap-1">
                {label}
                <ArrowUpDown className={`w-3 h-3 ${sortField === field ? 'text-primary' : 'text-muted-foreground/50'}`} />
            </div>
        </TableHead>
    );

    return (
        <div className="bg-card rounded-xl shadow-card border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold w-12 text-center">#</TableHead>
                        <SortableHeader label="Student Name" field="name" />
                        <SortableHeader label="Maths" field="maths" />
                        <SortableHeader label="Programming" field="programming" />
                        <SortableHeader label="Communication" field="communication" />
                        <SortableHeader label="Overall Skill" field="overall" />
                        <TableHead className="w-12 text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {sortedStudents.map((s, i) => (
                            <motion.tr
                                key={s.id}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="border-b border-border hover:bg-muted/30 transition-colors"
                            >
                                <TableCell className="font-mono text-muted-foreground text-sm text-center">{i + 1}</TableCell>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell><SkillBar value={s.maths} /></TableCell>
                                <TableCell><SkillBar value={s.programming} /></TableCell>
                                <TableCell><SkillBar value={s.communication} /></TableCell>
                                <TableCell>
                                    <OverallSkillBadge student={s} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button variant="ghost" size="icon" onClick={() => onRemove(s.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </motion.tr>
                        ))}
                        {students.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No students found. Add some students to begin.
                                </TableCell>
                            </TableRow>
                        )}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </div>
    );
};

export default AdvancedStudentTable;
