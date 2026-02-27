import { AdvancedCluster } from "@/lib/advanced-kmeans";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const ADVANCED_CLUSTER_COLORS = [
    "hsl(262, 83%, 58%)", // Violet
    "hsl(316, 73%, 52%)", // Pink
    "hsl(199, 89%, 48%)", // Sky Blue
    "hsl(142, 71%, 45%)", // Green
    "hsl(43, 96%, 56%)",  // Yellow
    "hsl(11, 80%, 53%)",  // Orange
];

const ADVANCED_CLUSTER_BG = [
    "bg-gradient-to-br from-violet-500/90 to-fuchsia-500/90",
    "bg-gradient-to-br from-pink-500/90 to-rose-500/90",
    "bg-gradient-to-br from-cyan-500/90 to-blue-500/90",
    "bg-gradient-to-br from-emerald-500/90 to-teal-500/90",
    "bg-gradient-to-br from-amber-500/90 to-yellow-500/90",
    "bg-gradient-to-br from-orange-500/90 to-red-500/90",
];

interface Props {
    cluster: AdvancedCluster;
    index: number;
}

const AdvancedGroupCard = ({ cluster, index }: Props) => {
    const color = ADVANCED_CLUSTER_COLORS[index % ADVANCED_CLUSTER_COLORS.length];
    const bgClass = ADVANCED_CLUSTER_BG[index % ADVANCED_CLUSTER_BG.length];

    const radarData = [
        { skill: "Maths", avg: Math.round(cluster.centroid[0]) },
        { skill: "Prog.", avg: Math.round(cluster.centroid[1]) },
        { skill: "Comm.", avg: Math.round(cluster.centroid[2]) },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }}
            className="bg-card/40 backdrop-blur-md rounded-2xl shadow-xl shadow-black/5 border border-white/10 dark:border-white/5 overflow-hidden group hover:shadow-2xl transition-all duration-300"
        >
            <div className={`${bgClass} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {index + 1}
                    </div>
                    <h3 className="font-bold text-white tracking-wide">Group {index + 1}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-medium text-white/90 backdrop-blur-sm shadow-sm ring-1 ring-white/20">
                    {cluster.students.length} Members
                </span>
            </div>

            <div className="p-6">
                <div className="h-48 mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/5 rounded-xl pointer-events-none" />
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                            <PolarGrid stroke="currentColor" className="text-muted-foreground/20" />
                            <PolarAngleAxis
                                dataKey="skill"
                                tick={{ fontSize: 13, fill: "currentColor", fontWeight: 500 }}
                                className="text-muted-foreground"
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderRadius: '12px',
                                    border: '1px solid hsl(var(--border))',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                            />
                            <Radar
                                name="Group Average"
                                dataKey="avg"
                                stroke={color}
                                fill={color}
                                fillOpacity={0.3}
                                strokeWidth={3}
                                animationDuration={1500}
                                animationEasing="ease-out"
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-2.5">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 rounded-full bg-primary/40" />
                        Group Members
                    </h4>
                    <div className="max-h-60 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                        {cluster.students.map((s, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.05) }}
                                key={s.id}
                                className="flex items-center justify-between text-sm py-2 px-3.5 rounded-xl bg-muted/40 hover:bg-muted/70 border border-transparent hover:border-border/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs font-mono text-muted-foreground shadow-sm">
                                        {s.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-foreground/90">{s.name}</span>
                                </div>
                                <div className="flex gap-2 font-mono text-xs text-muted-foreground/80">
                                    <span className="bg-background px-1.5 py-0.5 rounded shadow-sm">M:{s.maths}</span>
                                    <span className="bg-background px-1.5 py-0.5 rounded shadow-sm">P:{s.programming}</span>
                                    <span className="bg-background px-1.5 py-0.5 rounded shadow-sm">C:{s.communication}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdvancedGroupCard;
