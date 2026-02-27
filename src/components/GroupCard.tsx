import { Cluster } from "@/lib/kmeans";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const CLUSTER_COLORS = [
  "hsl(220, 70%, 45%)",
  "hsl(172, 66%, 40%)",
  "hsl(340, 65%, 55%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 60%, 55%)",
];

const CLUSTER_BG = [
  "bg-cluster-0",
  "bg-cluster-1",
  "bg-cluster-2",
  "bg-cluster-3",
  "bg-cluster-4",
];

interface Props {
  cluster: Cluster;
  index: number;
}

const GroupCard = ({ cluster, index }: Props) => {
  const color = CLUSTER_COLORS[index % CLUSTER_COLORS.length];
  const bgClass = CLUSTER_BG[index % CLUSTER_BG.length];

  const radarData = [
    { skill: "Maths", avg: Math.round(cluster.centroid[0]) },
    { skill: "Prog", avg: Math.round(cluster.centroid[1]) },
    { skill: "Comm", avg: Math.round(cluster.centroid[2]) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card rounded-xl shadow-card border overflow-hidden"
    >
      <div className={`${bgClass} px-5 py-3 flex items-center justify-between`}>
        <h3 className="font-bold text-primary-foreground">Group {index + 1}</h3>
        <span className="text-xs font-mono text-primary-foreground/80">{cluster.students.length} members</span>
      </div>
      <div className="p-5">
        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="hsl(220, 13%, 88%)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
              <Radar dataKey="avg" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {cluster.students.map(s => (
            <div key={s.id} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg bg-muted/50">
              <span className="font-medium">{s.name}</span>
              <div className="flex gap-3 font-mono text-xs text-muted-foreground">
                <span>M:{s.maths}</span>
                <span>P:{s.programming}</span>
                <span>C:{s.communication}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GroupCard;
