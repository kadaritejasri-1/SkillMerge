import { useState } from "react";
import { AdvancedStudent, ADVANCED_SAMPLE_STUDENTS, balancedGrouping, AdvancedCluster, advancedKMeans } from "@/lib/advanced-kmeans";
import HeroSection from "@/components/HeroSection";
import AdvancedStudentTable from "@/components/advanced/AdvancedStudentTable";
import AdvancedAddStudentForm from "@/components/advanced/AdvancedAddStudentForm";
import AdvancedGroupCard from "@/components/advanced/AdvancedGroupCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shuffle, Upload, Sparkles, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const AdvancedGrouping = () => {
    const [students, setStudents] = useState<AdvancedStudent[]>(ADVANCED_SAMPLE_STUDENTS);
    const [k, setK] = useState("4");
    const [clusters, setClusters] = useState<AdvancedCluster[]>([]);
    const [hasRun, setHasRun] = useState(false);
    const [isClustering, setIsClustering] = useState(false);
    const [useBalanced, setUseBalanced] = useState(true);

    const handleAdd = (s: AdvancedStudent) => {
        setStudents(prev => [...prev, s]);
        toast.success(`${s.name} added successfully!`);
    };

    const handleRemove = (id: string) => {
        setStudents(prev => prev.filter(s => s.id !== id));
        toast.info("Student removed.");
    };

    const runClustering = async () => {
        setIsClustering(true);
        setHasRun(false);

        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const kNum = parseInt(k);
        if (isNaN(kNum) || kNum < 2 || kNum > students.length) {
            toast.error("Invalid number of groups. Must be between 2 and " + students.length);
            setIsClustering(false);
            return;
        }

        const result = useBalanced
            ? balancedGrouping(students, kNum)
            : advancedKMeans(students, kNum);

        setClusters(result);
        setHasRun(true);
        setIsClustering(false);
        toast.success("Groups formed successfully!");
    };

    const handleReset = () => {
        setClusters([]);
        setHasRun(false);
        toast.message("Groups reset.");
    }

    const loadSample = () => {
        setStudents(ADVANCED_SAMPLE_STUDENTS);
        setClusters([]);
        setHasRun(false);
        toast.success("Sample data loaded");
    };

    return (
        <div className="min-h-screen bg-background">
            <HeroSection />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
                <div className="text-center space-y-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Advanced Grouping Mode</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        AI-Powered <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Student Clustering</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experience superior group formation with enhanced K-Means categorization and intuitive skill assessment visualizations.
                    </p>
                </div>

                <AdvancedAddStudentForm onAdd={handleAdd} />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-card/50 p-6 rounded-2xl border backdrop-blur-sm">
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Student Database</h2>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">{students.length} Total Candidates</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button variant="outline" size="sm" onClick={loadSample} className="gap-2 hover:bg-primary/5 border-primary/20">
                            <Upload className="w-4 h-4" /> Load Sample
                        </Button>

                        <div className="flex items-center gap-3 bg-background p-1.5 rounded-lg border shadow-inner">
                            <div className="flex items-center border-r pr-3">
                                <Select value={useBalanced ? "balanced" : "kmeans"} onValueChange={(v) => setUseBalanced(v === "balanced")}>
                                    <SelectTrigger className="w-[140px] border-none shadow-none focus:ring-0">
                                        <SelectValue placeholder="Algorithm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="balanced">Balanced Split</SelectItem>
                                        <SelectItem value="kmeans">Strict K-Means</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2 pl-1 pr-2">
                                <span className="text-sm font-medium text-muted-foreground">K =</span>
                                <Input
                                    type="number"
                                    value={k}
                                    onChange={e => setK(e.target.value)}
                                    min={2}
                                    max={students.length}
                                    className="w-16 h-8 text-center border-none shadow-none bg-muted/50 focus-visible:ring-1"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={runClustering}
                            disabled={students.length < 2 || isClustering}
                            className="gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 px-6"
                        >
                            {isClustering ? (
                                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                            ) : (
                                <Sparkles className="w-4 h-4" />
                            )}
                            {isClustering ? "Clustering..." : "Form Groups"}
                        </Button>
                    </div>
                </div>

                <AdvancedStudentTable students={students} onRemove={handleRemove} />

                <AnimatePresence mode="wait">
                    {hasRun && clusters.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="pt-8"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-muted/30 p-4 rounded-xl border">
                                <div>
                                    <h2 className="text-2xl font-bold">Generated Clusters</h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Visualizing {clusters.length} distinct groups optimized for collaborative balance
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="secondary" size="sm" onClick={handleReset} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <RotateCcw className="w-4 h-4" /> Reset
                                    </Button>
                                    <Button variant="default" size="sm" onClick={runClustering} disabled={isClustering} className="gap-2 shadow-md">
                                        <Shuffle className="w-4 h-4" /> Re-cluster
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {clusters.map((cluster, i) => (
                                    <AdvancedGroupCard key={i} cluster={cluster} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="border-t py-12 mt-20 text-center text-sm text-muted-foreground bg-muted/10 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <p className="font-medium tracking-wide">Smart Study Group Formation Agent — Advanced Module</p>
                <p className="font-mono text-xs mt-2 text-muted-foreground/70">Powered by K-Means Clustering & Data Analytics</p>
            </footer>
        </div>
    );
};

export default AdvancedGrouping;
