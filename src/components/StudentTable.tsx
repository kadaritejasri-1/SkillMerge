import { Student } from "@/lib/kmeans";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface StudentTableProps {
  students: Student[];
  onRemove: (id: string) => void;
}

function SkillBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-accent" : value >= 60 ? "bg-primary" : "bg-muted-foreground/40";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-mono text-muted-foreground w-7">{value}</span>
    </div>
  );
}

const StudentTable = ({ students, onRemove }: StudentTableProps) => (
  <div className="bg-card rounded-xl shadow-card border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="font-semibold">#</TableHead>
          <TableHead className="font-semibold">Student Name</TableHead>
          <TableHead className="font-semibold">Maths</TableHead>
          <TableHead className="font-semibold">Programming</TableHead>
          <TableHead className="font-semibold">Communication</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((s, i) => (
          <motion.tr
            key={s.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className="border-b border-border hover:bg-muted/30 transition-colors"
          >
            <TableCell className="font-mono text-muted-foreground text-sm">{i + 1}</TableCell>
            <TableCell className="font-medium">{s.name}</TableCell>
            <TableCell><SkillBar value={s.maths} /></TableCell>
            <TableCell><SkillBar value={s.programming} /></TableCell>
            <TableCell><SkillBar value={s.communication} /></TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onRemove(s.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default StudentTable;
