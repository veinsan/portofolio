/** Portfolio copy sourced from cv.md. */
export const site = {
  name: "Riantama Putra",
  initials: "RP",
  role: "Data Science & AI Engineer",
  email: "riantamaputra751@gmail.com",
  phone: "+6289656054453",
  location: "Bandung, Indonesia",
  url: "https://riantamaputra.tech",
  github: "https://github.com/veinsan",
  linkedin: "https://www.linkedin.com/in/riantamaputra/",
  tagline:
    "Information Systems and Technology student at ITB building applied AI systems, forecasting pipelines, and full-stack products.",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Domain", href: "#domain" },
  { label: "Works", href: "#works" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "Evidence-first systems, built to ship.",
  intro:
    "I work across machine learning, data science, and full-stack engineering. The throughline is measurable evidence: honest validation, competition results, and software that turns a model into something people can use.",
};

export const principles = [
  {
    title: "Validate forward, not backward.",
    text: "Forward-chaining evaluation and leak-free splits keep forecasting and classification results honest.",
    media: {
      src: "/principles/validate-forward.webp",
      alt: "Forecast analysis dashboard showing model comparisons and seven-day demand projections.",
      fit: "contain",
      position: "center",
    },
  },
  {
    title: "Make models earn their place.",
    text: "Architecture choices are tied to leaderboard scores, error metrics, and clear attribution rather than novelty alone.",
    media: {
      src: "/principles/models-earn-their-place.webp",
      alt: "Blue-lit computer processor mounted on a circuit board.",
      fit: "contain",
      position: "center",
    },
  },
  {
    title: "Ship beyond the notebook.",
    text: "APIs, authentication, databases, and deployment turn experiments into products that can survive real use.",
    media: {
      src: "/principles/ship-beyond-notebook.webp",
      alt: "Infrastructure health dashboard beside server racks and a cloud diagram.",
      fit: "contain",
      position: "center",
    },
  },
  {
    title: "Lead the work around the work.",
    text: "Technical delivery sits alongside sponsorship, creative, public-relations, mentoring, and field leadership at ITB.",
    media: {
      src: "/principles/lead-the-work.webp",
      alt: "Presenter leading a technical workshop for participants using laptops.",
      fit: "cover",
      position: "46% center",
    },
  },
];

export const domains = [
  {
    title: "Applied AI and Forecasting",
    text: "Computer vision, graph attention, gradient boosting, and feature engineering for noisy real-world prediction problems.",
    proof: "Face Anti-Spoofing, Bengawan Solo, City Traffic",
  },
  {
    title: "Decision Systems",
    text: "Learning-to-rank, cross-encoder reranking, risk classification, and interpretable regression built around careful validation.",
    proof: "Wikipedia Next-Click, Phishing Detection, Soil Regression",
  },
  {
    title: "Fullstack Products",
    text: "Role-based applications, REST APIs, AI-assisted workflows, and production software across web, desktop, and CLI environments.",
    proof: "Autopilot, OceanEarn, BelajarDuluDek",
  },
];

export type Project = {
  id: string;
  title: string;
  role: string;
  description: string;
  techStack: string[];
  metrics?: string;
  badge?: string;
  repoUrl: string;
  media?: {
    src: string;
    alt: string;
    fit: "cover" | "contain";
    position: string;
  };
};

export const projects: Project[] = [
  {
    id: "autopilot",
    title: "HR Retention Command Center",
    role: "AI & Backend Engineer",
    description:
      "A multi-operator AI employee coordinating a 90-day onboarding journey, detecting attrition signals, and routing confidential escalations to HR, IT, and Payroll through Slack.",
    techStack: ["Slack API", "Supabase", "Typeform"],
    badge: "Finalist — Autopilot Asia Hackathon 2026",
    repoUrl: "https://github.com/veinsan/autopilot-round2",
    media: {
      src: "/projects/hr-retention-command-center/cover.webp",
      alt: "Autopilot Asia Hackathon page with Kuala Lumpur finals details.",
      fit: "contain",
      position: "center",
    },
  },
  {
    id: "bengawan-solo",
    title: "Bengawan Solo Forecasting",
    role: "Machine Learning Engineer",
    description:
      "Forecasted 242-day water levels across 30 river monitoring posts with a graph-attention hydro embedding encoder fused with LightGBM and strict forward-chaining validation.",
    techStack: ["Python", "PyTorch", "LightGBM", "GAT"],
    metrics: "1.41971 private RMSE",
    badge: "Finalist — SSDS 2026",
    repoUrl: "https://github.com/veinsan/bengawan-solo-river-water-level-forecasting",
    media: {
      src: "/projects/bengawan-solo-forecasting/cover.webp",
      alt: "SSDS competition cover for the Bengawan Solo forecasting project.",
      fit: "cover",
      position: "center",
    },
  },
  {
    id: "traffic-speed",
    title: "Traffic Speed Forecasting",
    role: "Data Scientist",
    description:
      "Forecasted three horizons across 1,260 road segments using residual LightGBM ensembles per regime over a segment-level mean-reversion anchor.",
    techStack: ["Python", "LightGBM", "Feature Engineering"],
    metrics: "38.831 private MSE",
    badge: "Semifinalist — Datathon 2026",
    repoUrl: "https://github.com/veinsan/city-traffic-speed-forecasting",
  },
  {
    id: "wikipedia-navigation",
    title: "Wikipedia Next-Click",
    role: "Machine Learning Engineer",
    description:
      "Reconstructed an internal link graph with OCR, then reranked candidate links using LightGBM learning-to-rank and cross-encoder semantic scoring.",
    techStack: ["Python", "LightGBM", "OCR", "Sentence-Transformers"],
    metrics: "0.448 private accuracy",
    badge: "Semifinalist — Datathon 2026",
    repoUrl: "https://github.com/veinsan/wikipedia-navigation-next-click-prediction",
  },
  {
    id: "face-anti-spoofing",
    title: "Face Anti-Spoofing",
    role: "Computer Vision Engineer",
    description:
      "A dual-stream DINOv2 and ConvNeXtV2 system with Laplacian high-frequency enhancement and asymmetric gated fusion for limited-data spoof classification.",
    techStack: ["Python", "PyTorch", "DINOv2", "ConvNeXtV2"],
    metrics: "0.982 private leaderboard score",
    badge: "Finalist — DAC FindIT! 2026",
    repoUrl: "https://github.com/veinsan/face-anti-spoofing-dinov2-convnext",
    media: {
      src: "/projects/face-anti-spoofing/cover.webp",
      alt: "Presentation cover for the Face Anti-Spoofing project at FindIT! 2026.",
      fit: "cover",
      position: "center",
    },
  },
  {
    id: "waste-classification",
    title: "Waste Material Classification",
    role: "Computer Vision Engineer",
    description:
      "Classified 26,527 waste images into recyclable, electronic, and organic categories with a frozen DINOv3 ViT-7B backbone and lightweight multi-branch head.",
    techStack: ["Python", "PyTorch", "DINOv3", "timm"],
    metrics: "99.8869 Macro F1",
    badge: "Rank 24 of 544 — BDC Satria Data 2026",
    repoUrl: "https://github.com/veinsan/waste-material-image-classification",
  },
  {
    id: "phishing-detection",
    title: "Phishing URL Detection",
    role: "Data Scientist",
    description:
      "A leak-free classifier built from intra-URL lexical features after identifying duplicate-driven leakage across 47.6% of the source rows.",
    techStack: ["LightGBM", "XGBoost", "CatBoost", "SHAP"],
    metrics: "0.899 F1 · 0.966 ROC AUC",
    badge: "FIT Competition 2026, Track III",
    repoUrl: "https://github.com/veinsan/phishing-url-detection-lightgbm",
  },
  {
    id: "soil-carbon",
    title: "Soil Organic Regression",
    role: "Data Scientist",
    description:
      "An OOF-validated regression pipeline combining target transforms, hierarchical target encoding, and a greedy forward-selected ensemble.",
    techStack: ["Python", "LightGBM", "XGBoost", "CatBoost"],
    metrics: "10.972 private RMSE",
    badge: "DSA COMPFEST 18",
    repoUrl: "https://github.com/veinsan/soil-organic-carbon-regression",
  },
  {
    id: "open-transcript",
    title: "Open Transcript",
    role: "ML Systems Engineer",
    description:
      "A fully offline transcription CLI with speaker diarization, CPU-oriented int8 inference, resumable batch processing, and TXT, JSON, SRT, and VTT exports.",
    techStack: ["Python", "faster-whisper", "pyannote.audio", "CTranslate2"],
    repoUrl: "https://github.com/veinsan/open-transcript",
  },
  {
    id: "oceanearn",
    title: "OceanEarn",
    role: "Fullstack Developer",
    description:
      "A maritime waste reward platform with three auth roles, Google SSO, YOLO waste estimation, duplicate detection, and nearest collection-point lookup.",
    techStack: ["React", "Django", "PostgreSQL", "YOLO"],
    metrics: "19 REST API endpoints",
    badge: "I/O Festival 2026",
    repoUrl: "https://github.com/veinsan/oceanearn",
  },
  {
    id: "belajarduludek",
    title: "BelajarDuluDek",
    role: "Fullstack Developer",
    description:
      "A production learning platform for Indonesian high-school students with AI chat, flashcard generation, quizzes, tryouts, and JWT authentication.",
    techStack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL"],
    metrics: "Deployed to production",
    repoUrl: "https://github.com/veinsan/belajarduludek",
    media: {
      src: "/projects/belajarduludek/cover.webp",
      alt: "BelajarDuluDek landing page with its study workspace and learning tools.",
      fit: "cover",
      position: "center",
    },
  },
  {
    id: "deardiary",
    title: "DearDiary",
    role: "Authentication Developer",
    description:
      "A desktop system for internal innovation projects, including idea tracking, experiment logs, prototype history, and role-based authentication.",
    techStack: ["Java", "JavaFX", "PostgreSQL", "Maven"],
    repoUrl: "https://github.com/veinsan/IF2050-2026-K01-G12-DearDiary",
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  dateRange: string;
  highlights: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "Backend Developer",
    company: "Wisuda April ITB 2025",
    dateRange: "Feb. 2025 – Apr. 2025",
    highlights: [
      "Developed the backend for an anonymous message-submission feature with Next.js, TypeScript, and Prisma ORM on the T3 stack.",
      "Built the Menfess service as a standalone module ready for integration into the main user profile.",
    ],
  },
  {
    role: "B.Sc. Information Systems & Technology",
    company: "Institut Teknologi Bandung",
    dateRange: "Aug. 2024 – Oct. 2028",
    highlights: [
      "Current cumulative grade point average: 3.64 out of 4.00.",
      "Coursework and projects span machine learning, software systems, data engineering, and full-stack development.",
    ],
  },
  {
    role: "Student Leadership",
    company: "Institut Teknologi Bandung",
    dateRange: "2024 – Present",
    highlights: [
      "Head of Sponsorship for Arkavidia 11.0 and Head of Creative for Aksi Angkatan SPARTA HMIF ITB 2025.",
      "Mentor and Field Committee for OSKM ITB 2025; led public relations for Formatur STEI-K 2024 and documentation for TPB Cup STEI 2024.",
    ],
  },
];

export const skills = [
  { name: "Python", logo: "/logos/skills/python.svg" },
  { name: "TypeScript", logo: "/logos/skills/typescript.svg" },
  { name: "JavaScript", logo: "/logos/skills/javascript.svg" },
  { name: "C", logo: "/logos/skills/c.svg" },
  { name: "Java", logo: "/logos/skills/java.svg" },
  { name: "SQL" },
  { name: "PyTorch", logo: "/logos/skills/pytorch.svg" },
  { name: "LightGBM", logo: "/logos/skills/lightgbm.svg" },
  { name: "XGBoost", logo: "/logos/skills/xgboost.svg" },
  { name: "CatBoost", logo: "/logos/skills/catboost.svg" },
  { name: "Transformers", logo: "/logos/skills/huggingface.svg" },
  { name: "timm", logo: "/logos/skills/huggingface.svg" },
  { name: "SHAP" },
  { name: "YOLO", logo: "/logos/skills/yolo.svg" },
  { name: "scikit-learn", logo: "/logos/skills/scikit-learn.svg" },
  { name: "Pandas", logo: "/logos/skills/pandas.svg" },
  { name: "NumPy", logo: "/logos/skills/numpy.svg" },
  { name: "React", logo: "/logos/skills/react.svg" },
  { name: "Next.js", logo: "/logos/skills/nextjs.svg" },
  { name: "Tailwind CSS", logo: "/logos/skills/tailwindcss.svg" },
  { name: "Framer Motion", logo: "/logos/skills/framer-motion.svg" },
  { name: "Django", logo: "/logos/skills/django.svg" },
  { name: "FastAPI", logo: "/logos/skills/fastapi.svg" },
  { name: "PostgreSQL", logo: "/logos/skills/postgresql.svg" },
  { name: "Prisma ORM", logo: "/logos/skills/prisma.svg" },
  { name: "Supabase", logo: "/logos/skills/supabase.svg" },
  { name: "Docker", logo: "/logos/skills/docker.svg" },
  { name: "Git", logo: "/logos/skills/git.svg" },
];
