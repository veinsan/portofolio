/**
 * Single source of truth for all site content.
 * Everything here is sourced from cv.md; keep it truthful when editing.
 */

export const site = {
  name: "Riantama Putra",
  role: "Data Science & AI Engineer",
  roleInline:
    "a data science & AI engineer studying Information Systems & Technology at ITB",
  tagline:
    "I build AI systems end to end, from competition-grade computer vision models to a full-stack learning platform running in production.",
  email: "riantamaputra751@gmail.com",
  location: "Bandung, Indonesia (UTC+7)",
  availability: "Open to internships & collaborations",
  stats: [
    { value: "8", label: "projects across AI, web & systems" },
    { value: "Finalist", label: "DAC FindIT! 2026, face anti-spoofing" },
    { value: "ITB '28", label: "B.Sc. Information Systems & Tech" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/veinsan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/riantamaputra/" },
  ],
  url: "https://riantamaputra.tech",
};

export type Project = {
  index: string;
  title: string;
  /** Optional: your part in a team project */
  role?: string;
  description: string;
  metric: string;
  stack: string[];
  /** Preview image under /public */
  image: string;
  github: string;
  /** Optional live demo URL */
  demo?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Face Anti-Spoofing System",
    description:
      "Telling a real face from a photo, screen replay or mask. A multi-class anti-spoofing system built for a limited-data competition setting: a hybrid dual-stream architecture pairing DINOv2 (ViT-S/14) with ConvNeXtV2-Tiny, sharpened by Laplacian high-frequency enhancement and asymmetric gated fusion.",
    metric: "0.982 private leaderboard · Finalist, DAC FindIT! 2026",
    stack: ["Python", "PyTorch", "DINOv2", "ConvNeXtV2"],
    image: "/projects/face-anti-spoofing.svg",
    github: "https://github.com/veinsan/dac-findit-2026",
  },
  {
    index: "02",
    title: "OceanEarn",
    description:
      "Maritime waste reward platform: role-based auth for fishers, collection points and admins, Google SSO, AI-powered waste estimation with YOLO, perceptual hashing to catch duplicate submissions, and Haversine-based nearest-TPS lookup.",
    metric: "19 REST endpoints · 3 auth roles · I/O Festival 2026",
    stack: ["React", "Django", "PostgreSQL", "YOLO"],
    image: "/projects/oceanearn.svg",
    github: "https://github.com/veinsan/oceanearn",
  },
  {
    index: "03",
    title: "BelajarDuluDek",
    description:
      "Full-stack learning platform for Indonesian high-school students: AI chat powered by the Gemini and Claude APIs, flashcard generation, a quiz and tryout system, and JWT-based authentication.",
    metric: "Live in production · Gemini + Claude APIs",
    stack: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL"],
    image: "/projects/belajarduludek.svg",
    github: "https://github.com/veinsan/belajarduludek",
  },
  {
    index: "04",
    title: "Nimonscooked",
    description:
      "Cooperative cooking simulation game with multi-threaded concurrency for cooking and cutting stations, a state machine for ingredient processing, and a deliberately pattern-driven core.",
    metric: "Multi-threaded stations · Singleton, Factory, Observer, MVC",
    stack: ["Java", "LibGDX"],
    image: "/projects/nimonscooked.svg",
    github: "https://github.com/veinsan/nimonscooked",
  },
  {
    index: "05",
    title: "Ganyang Lapar di Gelap Nyawang",
    role: "Landing & directory pages",
    description:
      "Directory platform helping people discover local food and small businesses (UMKM) around the Gelap Nyawang area. Built the landing and directory pages end to end.",
    metric: "Live search · category filtering · dark mode",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/projects/gelap-nyawang.svg",
    github: "https://github.com/veinsan/GelapNyawang",
  },
  {
    index: "06",
    title: "DearDiary",
    role: "Login & auth module",
    description:
      "Desktop application for managing internal innovation projects: idea tracking, experiment logs and prototype version history. Owned the login and authentication module.",
    metric: "Role-based access control · team project",
    stack: ["Java", "JavaFX", "PostgreSQL", "Maven"],
    image: "/projects/deardiary.svg",
    github: "https://github.com/veinsan/IF2050-2026-K01-G12-DearDiary",
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
    period: "Feb–Apr 2025",
    role: "Backend Developer",
    company: "Wisuda April ITB 2025",
    summary:
      "ITB's graduation ceremony event, supported by a dedicated IT team building its digital services.",
    highlights: [
      "Developed the backend for the anonymous message (Menfess) feature using Next.js, TypeScript and Prisma ORM on the T3 stack",
      "Built it as a standalone module designed for clean integration into the main user profile",
    ],
  },
  {
    period: "2024–Present",
    role: "Student Leadership",
    company: "Institut Teknologi Bandung",
    summary:
      "Leading divisions across major ITB student events alongside full-time study.",
    highlights: [
      "Head of Sponsorship Division, Arkavidia 11.0",
      "Head of Creative Division, Aksi Angkatan SPARTA HMIF ITB 2025",
      "Mentor & Field Committee, OSKM ITB 2025",
      "Head of Public Relations Division, Formatur Ketua Angkatan STEI-K 2024",
    ],
  },
  {
    period: "2024–2028 (expected)",
    role: "B.Sc. Information Systems & Technology",
    company: "Institut Teknologi Bandung",
    summary:
      "Undergraduate degree in Information Systems and Technology. CGPA 3.37/4.00.",
    highlights: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI / ML",
    items: ["PyTorch", "Transformers", "LightGBM", "XGBoost", "CatBoost", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C", "Java", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    group: "Backend & Cloud",
    items: ["Django", "FastAPI", "Node.js", "PostgreSQL", "Prisma ORM", "JWT", "Supabase", "Docker", "Vercel"],
  },
  {
    group: "Tooling",
    items: ["Git", "Linux", "REST APIs", "CI/CD"],
  },
];

export const about = {
  intro:
    "I'm an Information Systems & Technology undergraduate at Institut Teknologi Bandung working in machine learning and data science, from a competition-placing face anti-spoofing model to an AI-powered learning platform running in production.",
  body:
    "The models come first: PyTorch architectures for computer vision, gradient-boosting stacks like LightGBM and XGBoost, and the evaluation discipline that competitions demand. The engineering range behind them is deliberate. I've written a terminal-based hospital system in C, desktop software in JavaFX, a multi-threaded game in LibGDX, and web platforms on Next.js and Django, because strong fundamentals are what turn a model into a product. Outside the codebase, I lead divisions for some of ITB's biggest student events, which keeps me sharp on deadlines, teams and communication.",
  principles: [
    {
      title: "Ship the whole system",
      text: "A model is a fraction of the work. Auth, APIs, data flows and deployment are the job too.",
    },
    {
      title: "Fundamentals first",
      text: "C, Java, algorithms and design patterns before frameworks, so abstractions never feel like magic.",
    },
    {
      title: "Learn by building",
      text: "Every new tool earns its place through a real project, not a tutorial.",
    },
  ],
};
