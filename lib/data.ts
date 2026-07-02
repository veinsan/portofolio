/**
 * Single source of truth for all site content.
 * Swap the placeholder projects/experience below with your real work —
 * nothing else in the codebase needs to change.
 */

export const site = {
  name: "Riantama Putra",
  shortName: "riantama",
  role: "Software & AI Engineer",
  roleInline: "software & AI engineer", // mid-sentence form — keeps "AI" capitalized
  tagline: "I design and build intelligent systems that ship — from LLM pipelines to the products around them.",
  email: "riantamaputra751@gmail.com",
  location: "Jakarta, Indonesia (UTC+7)",
  availability: "Open to select projects",
  socials: [
    { label: "GitHub", href: "https://github.com/veinsan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/riantama-putra" },
    { label: "X / Twitter", href: "https://x.com/riantama" },
  ],
  url: "https://riantama.dev",
};

export type Project = {
  index: string;
  title: string;
  description: string;
  metric: string;
  stack: string[];
  href: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Nimbus RAG",
    description:
      "Production retrieval-augmented generation platform for enterprise document search. Hybrid retrieval, semantic caching and evaluation loops baked in from day one.",
    metric: "40k+ documents indexed · p95 latency 320ms",
    stack: ["Python", "FastAPI", "pgvector", "Next.js"],
    href: "#",
    featured: true,
  },
  {
    index: "02",
    title: "Sentinel Vision",
    description:
      "Real-time defect detection running on edge devices for a manufacturing line. Custom-trained detection models, quantized and deployed without a cloud round-trip.",
    metric: "45 FPS on Jetson Orin · 99.2% recall",
    stack: ["PyTorch", "TensorRT", "ONNX", "Go"],
    href: "#",
    featured: true,
  },
  {
    index: "03",
    title: "Ledgerline",
    description:
      "Event-driven core banking backend handling reconciliation and settlement. Exactly-once processing across services, with full replayability for audits.",
    metric: "12k TPS sustained · zero-loss replay",
    stack: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
    href: "#",
  },
  {
    index: "04",
    title: "EvalKit",
    description:
      "Open-source toolkit for evaluating LLM applications: golden datasets, regression gates in CI, and drift dashboards your whole team can read.",
    metric: "1.2k GitHub stars · used in 30+ teams",
    stack: ["TypeScript", "Python", "LLM-as-judge"],
    href: "#",
  },
];

export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    period: "2024 — Present",
    role: "Senior Software Engineer, AI Platform",
    company: "Aurora Labs",
    summary:
      "Leading the team that turns model research into reliable product features.",
    highlights: [
      "Built the LLM gateway serving 3M+ requests/day with cost and quality routing",
      "Cut inference spend 38% via semantic caching and model tiering",
    ],
  },
  {
    period: "2022 — 2024",
    role: "Machine Learning Engineer",
    company: "Kanaya Tech",
    summary:
      "Owned computer-vision systems end to end — data pipelines to edge deployment.",
    highlights: [
      "Shipped defect-detection models to 12 factory sites across Southeast Asia",
      "Reduced false-positive rate 4× with active-learning retraining loops",
    ],
  },
  {
    period: "2020 — 2022",
    role: "Full-stack Engineer",
    company: "Studio Delta",
    summary:
      "Built and scaled web products for early-stage startups as engineer #3.",
    highlights: [
      "Took two products from prototype to 100k monthly active users",
      "Introduced typed API contracts that halved integration bugs",
    ],
  },
  {
    period: "2016 — 2020",
    role: "B.Sc. Computer Science",
    company: "Universitas Indonesia",
    summary:
      "Focus on machine learning and distributed systems. Graduated cum laude.",
    highlights: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "Go", "SQL", "Rust"],
  },
  {
    group: "AI / ML",
    items: ["PyTorch", "LLM fine-tuning", "RAG systems", "vLLM", "LangGraph", "Evaluation & observability"],
  },
  {
    group: "Web & APIs",
    items: ["React / Next.js", "Node.js", "FastAPI", "gRPC", "Tailwind CSS"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS / GCP", "PostgreSQL", "Kafka", "Terraform"],
  },
];

export const about = {
  intro:
    "I'm a software engineer who went deep on machine learning — not the other way around. That order matters: I care as much about the deploy pipeline, the p95 latency and the on-call story as I do about model quality.",
  body:
    "For the last five years I've been building AI-powered products across fintech, manufacturing and developer tools — usually owning the path from ambiguous idea to something running in production. I like small teams, sharp problems, and systems that are boring to operate.",
  principles: [
    { title: "Ship the whole system", text: "A model is 10% of the work. The product, data loops and guardrails around it are the job." },
    { title: "Measure before magic", text: "Evals, tracing and honest baselines before reaching for a bigger model." },
    { title: "Fast is a feature", text: "Latency budgets are product decisions. I design for them from the first commit." },
  ],
};
