export interface Student {
  id: string;
  name: string;
  maths: number;
  programming: number;
  communication: number;
}

export interface Cluster {
  centroid: number[];
  students: Student[];
}

function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

function getFeatures(s: Student): number[] {
  return [s.maths, s.programming, s.communication];
}

function computeCentroid(students: Student[]): number[] {
  if (students.length === 0) return [0, 0, 0];
  const sum = [0, 0, 0];
  students.forEach(s => {
    const f = getFeatures(s);
    sum[0] += f[0]; sum[1] += f[1]; sum[2] += f[2];
  });
  return sum.map(v => v / students.length);
}

export function kMeans(students: Student[], k: number, maxIter = 50): Cluster[] {
  if (students.length === 0 || k <= 0) return [];
  k = Math.min(k, students.length);

  // Initialize centroids using k-means++ style
  const centroids: number[][] = [];
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  for (let i = 0; i < k; i++) {
    centroids.push(getFeatures(shuffled[i]));
  }

  let assignments = new Array(students.length).fill(0);

  for (let iter = 0; iter < maxIter; iter++) {
    // Assign each student to nearest centroid
    const newAssignments = students.map(s => {
      const features = getFeatures(s);
      let minDist = Infinity;
      let closest = 0;
      centroids.forEach((c, i) => {
        const d = euclideanDistance(features, c);
        if (d < minDist) { minDist = d; closest = i; }
      });
      return closest;
    });

    // Check convergence
    const converged = newAssignments.every((a, i) => a === assignments[i]);
    assignments = newAssignments;

    // Recompute centroids
    for (let i = 0; i < k; i++) {
      const members = students.filter((_, idx) => assignments[idx] === i);
      if (members.length > 0) {
        centroids[i] = computeCentroid(members);
      }
    }

    if (converged) break;
  }

  // Build clusters
  const clusters: Cluster[] = centroids.map((centroid, i) => ({
    centroid,
    students: students.filter((_, idx) => assignments[idx] === i),
  }));

  return clusters.filter(c => c.students.length > 0);
}

// Balance groups so they have similar skill distributions
export function balancedGrouping(students: Student[], k: number): Cluster[] {
  // First run K-Means to identify skill clusters
  const skillClusters = kMeans(students, Math.min(k, students.length));
  
  // Now distribute students from each skill cluster evenly across groups
  const groups: Student[][] = Array.from({ length: k }, () => []);
  
  // Sort students by total skill score within each cluster
  const allSorted: Student[] = [];
  skillClusters.forEach(cluster => {
    const sorted = [...cluster.students].sort((a, b) => {
      const totalA = a.maths + a.programming + a.communication;
      const totalB = b.maths + b.programming + b.communication;
      return totalB - totalA;
    });
    allSorted.push(...sorted);
  });

  // Round-robin assignment for balance
  allSorted.forEach((student, i) => {
    groups[i % k].push(student);
  });

  return groups.map(students => ({
    centroid: computeCentroid(students),
    students,
  }));
}

export const SAMPLE_STUDENTS: Student[] = [
  { id: '1', name: 'Aarav Sharma', maths: 92, programming: 45, communication: 78 },
  { id: '2', name: 'Priya Patel', maths: 55, programming: 88, communication: 62 },
  { id: '3', name: 'Rohan Singh', maths: 78, programming: 72, communication: 90 },
  { id: '4', name: 'Ananya Gupta', maths: 40, programming: 95, communication: 55 },
  { id: '5', name: 'Vikram Reddy', maths: 85, programming: 60, communication: 48 },
  { id: '6', name: 'Sneha Iyer', maths: 68, programming: 50, communication: 92 },
  { id: '7', name: 'Arjun Nair', maths: 95, programming: 80, communication: 70 },
  { id: '8', name: 'Kavya Menon', maths: 50, programming: 42, communication: 85 },
  { id: '9', name: 'Rahul Das', maths: 72, programming: 90, communication: 58 },
  { id: '10', name: 'Meera Joshi', maths: 60, programming: 65, communication: 95 },
  { id: '11', name: 'Aditya Kumar', maths: 88, programming: 55, communication: 42 },
  { id: '12', name: 'Ishita Bose', maths: 45, programming: 78, communication: 88 },
  { id: '13', name: 'Karan Mehta', maths: 70, programming: 85, communication: 60 },
  { id: '14', name: 'Divya Rao', maths: 58, programming: 48, communication: 80 },
  { id: '15', name: 'Nikhil Verma', maths: 82, programming: 92, communication: 55 },
  { id: '16', name: 'Pooja Thakur', maths: 48, programming: 58, communication: 90 },
  { id: '17', name: 'Siddharth Pillai', maths: 90, programming: 70, communication: 65 },
  { id: '18', name: 'Riya Chopra', maths: 55, programming: 82, communication: 75 },
  { id: '19', name: 'Amit Saxena', maths: 75, programming: 45, communication: 88 },
  { id: '20', name: 'Nisha Agarwal', maths: 65, programming: 75, communication: 72 },
];
