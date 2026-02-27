# SkillMerge

An AI-powered Smart Study Group Formation tool that uses K-Means Clustering to automatically create balanced student groups based on skill vectors in Maths, Programming, and Communication.

## Features

- **K-Means Clustering**: Automatically groups students using unsupervised machine learning
- **Balanced Grouping**: Every group gets a mix of skill levels
- **Advanced Grouping Mode**: Enhanced clustering with skill categorization (Low / Medium / High)
- **Visual Analytics**: Radar charts for each group's average skill distribution
- **Responsive UI**: Works seamlessly on desktop and mobile

## Getting Started

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:8080` in your browser.

### Routes

| Route | Description |
|---|---|
| `/` | Original K-Means study group formation |
| `/advanced` | Advanced grouping with visual indicators and skill level badges |

## Tech Stack

- **React** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Recharts** (radar charts)
- **Framer Motion** (animations)
- **shadcn/ui** (component library)
