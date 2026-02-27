import { useState } from "react";
import { Student, SAMPLE_STUDENTS, balancedGrouping, Cluster } from "@/lib/kmeans";
import HeroSection from "@/components/HeroSection";
import StudentTable from "@/components/StudentTable";
import AddStudentForm from "@/components/AddStudentForm";
import GroupCard from "@/components/GroupCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shuffle, Upload, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [k, setK] = useState("4");
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const handleAdd = (s: Student) => setStudents(prev => [...prev, s]);
  const handleRemove = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));

  const runClustering = () => {
    const result = balancedGrouping(students, parseInt(k));
    setClusters(result);
    setHasRun(true);
  };

  const loadSample = () => {
    setStudents(SAMPLE_STUDENTS);
    setClusters([]);
    setHasRun(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        <AddStudentForm onAdd={handleAdd} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Student Data</h2>
            <p className="text-sm text-muted-foreground">{students.length} students loaded</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={loadSample} className="gap-2">
              <Upload className="w-4 h-4" /> Load Sample
            </Button>
            <Select value={k} onValueChange={setK}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Groups" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5].map(n => (
                  <SelectItem key={n} value={String(n)}>
                    {n} Groups
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={runClustering} disabled={students.length < parseInt(k)} className="gap-2">
              <Sparkles className="w-4 h-4" /> Form Groups
            </Button>
          </div>
        </div>

        <StudentTable students={students} onRemove={handleRemove} />

        <AnimatePresence>
          {hasRun && clusters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Formed Study Groups</h2>
                  <p className="text-sm text-muted-foreground">Balanced using K-Means clustering algorithm</p>
                </div>
                <Button variant="outline" size="sm" onClick={runClustering} className="gap-2">
                  <Shuffle className="w-4 h-4" /> Re-cluster
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clusters.map((cluster, i) => (
                  <GroupCard key={i} cluster={cluster} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>Smart Study Group Formation Agent — B.Tech Data Science Project</p>
        <p className="font-mono text-xs mt-1">Unsupervised Learning • K-Means Clustering</p>
      </footer>
    </div>
  );
};

export default Index;
