/**
 * All site copy, from "CV Riantama Putra.docx" (Oct 2026). Projects marked `archive` come from the
 * previous CV (git: f7a1ffc^:cv.md) and are not in the new one. Nothing here is invented.
 */
export const site = {
  name: "Riantama Putra",
  initials: "RP",
  role: "AI and Software Engineer, Data Analyst and Scientist",
  email: "riantamaputra751@gmail.com",
  location: "Bandung, Indonesia",
  url: "https://riantamaputra.tech",
  github: "https://github.com/veinsan",
  linkedin: "https://www.linkedin.com/in/riantamaputra/",
  description:
    "AI and software engineer, data analyst and scientist at ITB. Computer vision and tabular ML, 4× data science competition winner in 2026.",
  headline: "4× Data Science Competition Winner",
  /** Hero portrait (4:5). Replace the file to change the photo. */
  photo: { portrait: "/photo/riantama.jpg" },
  /** Put a PDF in public/ (e.g. "/cv.pdf") and the Download CV buttons appear. */
  cvUrl: "",
};

export const nav = [
  { label: "About", href: "#about", meta: "AI Lab, ITB" },
  { label: "Work", href: "#work", meta: "Four winners" },
  { label: "Achievements", href: "#achievements", meta: "Ten in 2026" },
  { label: "Projects", href: "#projects", meta: "Course and personal" },
  { label: "Experience", href: "#now", meta: "Roles and committees" },
  { label: "Contact", href: "#contact", meta: "Email or LinkedIn" },
];

export type Project = {
  slug: string;
  title: string;
  /** Placement, e.g. "1st Place". */
  place?: string;
  level?: "National" | "International";
  issuer?: string;
  month?: string;
  /** Extra ranking detail, e.g. "5th of 88 teams". */
  rank?: string;
  event?: string;
  summary: string;
  stack: string[];
  repoUrl?: string;
  metric?: { value: string; label: string };
  media?: { src: string; alt: string; width: number; height: number; caption: string };
  team?: string;
  problem: string;
  approach: string;
  result: string;
  featured?: boolean;
  archive?: boolean;
  /** Projects list: the category column, e.g. "Course project", "Full stack". */
  category?: string;
  /** Course code for a tugas besar, e.g. "IF2050". */
  course?: string;
  year?: string;
  /** Screenshot in public/ (e.g. "/projects/scribe.webp"); a generated cover shows until then. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "scribe",
    title: "SCRIBE",
    place: "1st Place",
    event: "Data Science Competition INFEST XII 2026",
    level: "National",
    issuer: "Informatics Festival XII, Universitas Syiah Kuala",
    month: "Oct 2026",
    featured: true,
    summary: "A dual-expert DINOv3 model that reads seven Nusantara scripts from degraded manuscript images.",
    stack: ["PyTorch", "DINOv3", "Synthetic corruption"],
    repoUrl: "https://github.com/psi-2/infest-2026",
    problem: "Classify seven Nusantara scripts from manuscript images that are degraded, faded and noisy.",
    approach: "Two DINOv3 experts work as one model, trained with synthetic corruption augmentation that imitates the damage real manuscripts carry.",
    result: "1st place at INFEST XII 2026.",
  },
  {
    slug: "grit",
    title: "GRIT",
    place: "1st Place",
    event: "Big Data Competition 2026",
    level: "National",
    issuer: "Statistics Explore 2026, Universitas Syiah Kuala",
    month: "Sep 2026",
    featured: true,
    summary: "A type-conditioned ordinal DINOv3 model that classifies disaster type and damage severity together.",
    stack: ["PyTorch", "DINOv3 ViT-7B", "Ordinal regression"],
    repoUrl: "https://github.com/veinsan/bdc-se26",
    problem: "From one image, tell what kind of disaster happened and how severe the damage is.",
    approach: "A DINOv3 ViT-7B backbone with an ordinal regression head conditioned on the predicted disaster type, so severity is ranked rather than guessed as a flat class.",
    result: "1st place at Big Data Competition 2026, Statistics Explore.",
  },
  {
    slug: "resi",
    title: "RESI",
    place: "2nd Place",
    event: "DATASCAPE 2026",
    featured: true,
    summary: "A rotation-invariant DINOv3 classifier that identifies three package conditions from logistics images.",
    stack: ["PyTorch", "DINOv3 ViT-7B", "Focal loss"],
    problem: "Tell which of three conditions a package is in from logistics photos, where packages appear at any angle.",
    approach: "A DINOv3 ViT-7B classifier made rotation-invariant, so orientation does not change the prediction, trained with focal loss.",
    result: "2nd place at DATASCAPE 2026.",
  },
  {
    slug: "retain",
    title: "RETAIN",
    place: "3rd Place",
    event: "DAC PRS ITS 2026",
    level: "International",
    issuer: "Pekan Raya Statistika, HIMASTA ITS",
    month: "Oct 2026",
    featured: true,
    summary: "A gradient-boosting ensemble that ranks life-insurance customers by churn risk.",
    stack: ["LightGBM", "XGBoost", "CatBoost"],
    repoUrl: "https://github.com/IndomaretLabtekV/prs-its-2026",
    metric: { value: "92%", label: "of churners caught" },
    problem: "Rank life-insurance policyholders by how likely they are to leave, so retention effort goes where it matters.",
    approach: "An ensemble of LightGBM, XGBoost and CatBoost scores each policyholder, and the ranking is read from the top down.",
    result: "Caught 92% of churners. 3rd place at PRS ITS 2026.",
  },
  {
    slug: "atlas",
    title: "ATLAS",
    place: "4th Place",
    event: "HoloMine HOLOGY 9.0",
    level: "National",
    issuer: "Faculty of Computer Science, Universitas Brawijaya",
    month: "Oct 2026",
    rank: "1st Honorable Mention",
    summary: "A satellite-pretrained DINOv3 ensemble that segments paddy fields from high-resolution imagery.",
    stack: ["PyTorch", "DINOv3", "Semantic segmentation"],
    repoUrl: "https://github.com/IndomaretLabtekV/hology",
    problem: "Find and outline paddy fields in high-resolution satellite imagery, pixel by pixel.",
    approach: "An ensemble of DINOv3 backbones pretrained on satellite data, each producing a segmentation mask that the ensemble combines.",
    result: "4th place and 1st Honorable Mention at HoloMine HOLOGY 9.0.",
  },
  {
    slug: "galon",
    title: "GALON",
    place: "Top 10 Finalist",
    event: "DAC IFest 2026",
    level: "National",
    issuer: "HIMATIF Universitas Padjadjaran",
    month: "Oct 2026",
    rank: "5th of 88 teams",
    summary: "A GBDT ensemble forecasting next-month water stress in U.S. watersheds from corrupted data.",
    stack: ["LightGBM", "XGBoost", "CatBoost", "Optuna"],
    repoUrl: "https://github.com/IndomaretLabtekV/ifest-2026",
    problem: "Forecast next month's water stress for U.S. watersheds when the input data arrives corrupted.",
    approach: "Gradient-boosted tree models, tuned with Optuna and combined into one ensemble.",
    result: "Top 10 finalist at DAC IFest 2026, ranking 5th of 88 teams.",
  },
  {
    slug: "harvest",
    title: "HARVEST",
    place: "Top 10 Finalist",
    event: "Data Science Competition RASIO 10.0",
    level: "International",
    issuer: "Statistics Day 2026, Universitas Padjadjaran",
    month: "Oct 2026",
    rank: "7th place",
    summary: "A CatBoost model forecasting food system resilience across 358 Southeast Asian regions.",
    stack: ["CatBoost", "Time series forecasting"],
    repoUrl: "https://github.com/IndomaretLabtekV/rasio-2026",
    problem: "Forecast how resilient the food system is in each of 358 Southeast Asian regions.",
    approach: "A CatBoost spatiotemporal model forecasting across regions and time.",
    result: "Top 10 finalist at RASIO 10.0, in 7th place.",
  },
  {
    slug: "face-anti-spoofing",
    title: "Face Anti-Spoofing",
    place: "Top 15 Finalist",
    event: "DAC Find IT! 2026",
    level: "National",
    issuer: "KMTETI, Fakultas Teknik UGM",
    month: "May 2026",
    rank: "13th of 339 teams",
    summary: "Two vision streams, DINOv2 and ConvNeXtV2, detecting five types of presentation attack.",
    stack: ["PyTorch", "DINOv2", "ConvNeXtV2"],
    repoUrl: "https://github.com/veinsan/face-anti-spoofing-dinov2-convnext",
    metric: { value: "0.982", label: "private leaderboard" },
    team: "Team ParaPencariGus: Aldyto Rafif Abhinaya, Riantama Putra, M. Ghiffary Alfathan.",
    problem: "Tell real faces from five kinds of presentation attack when the labelled dataset is small.",
    approach: "DINOv2 ViT-Small/14 and ConvNeXtV2-Tiny run side by side. A Laplacian filter adds high-frequency detail, and an asymmetric gated fusion decides how much each stream contributes.",
    result: "0.982 on the private leaderboard. Top 15 finalist at DAC Find IT! 2026, ranking 13th of 339 teams.",
  },
  {
    slug: "hr-command-center",
    title: "HR Command Center",
    place: "Grand Finalist",
    event: "AutoPilot Asia Hackathon 2026",
    level: "International",
    issuer: "Supervity, Kuala Lumpur",
    month: "Aug 2026",
    summary: "A multi-agent HR command center that watches 90-day onboarding and routes risks to HR, IT and Payroll.",
    stack: ["Supervity Auto", "Supabase", "Slack API"],
    repoUrl: "https://github.com/veinsan/supervity-hr-ai-employee",
    problem: "Follow every new hire through a 90-day onboarding journey, notice early risk signals, and get each one to the team that can act on it.",
    approach: "Several agents built on Supervity Auto act as one HR command center. Supabase is the system of record, and Slack is where risks reach HR, IT and Payroll.",
    result: "Grand finalist at AutoPilot Asia Hackathon 2026, with the finals in Kuala Lumpur.",
  },
  {
    slug: "tunas",
    title: "TUNAS",
    place: "Semifinalist",
    event: "Datathon 2026",
    level: "International",
    issuer: "RISTEK Fasilkom UI",
    month: "Aug 2026",
    rank: "One of 35 semifinalist teams",
    summary: "A child-growth monitor with photo-based height estimation and SHAP-explained risk ranking.",
    stack: ["LightGBM", "Computer vision", "SHAP"],
    repoUrl: "https://github.com/IndomaretLabtekV/tunas-posyandu",
    problem: "Help community health posts monitor child growth without precise measuring equipment.",
    approach: "Height is estimated from a photo, and a LightGBM model ranks growth risk, with SHAP showing which factors drive each child's score.",
    result: "One of 35 semifinalist teams at Datathon 2026, run by RISTEK Fasilkom UI.",
  },
  {
    slug: "waste-classification",
    category: "Computer vision",
    title: "Waste Material Classification",
    archive: true,
    event: "BDC Satria Data 2026, rank 24 of 544",
    summary: "26,527 waste images sorted into recyclable, electronic and organic with a frozen ViT-7B.",
    stack: ["PyTorch", "DINOv3", "timm"],
    metric: { value: "99.8869", label: "macro F1" },
    repoUrl: "https://github.com/veinsan/waste-material-image-classification",
    problem: "Classify waste photos into recyclable, electronic and organic, trained on 26,527 images.",
    approach: "A frozen DINOv3 ViT-7B backbone with multi-branch feature pooling feeds a small trainable head.",
    result: "99.8869 macro F1 on the held-out test set. Rank 24 of 544 teams at BDC Satria Data 2026.",
  },
  {
    slug: "phishing-detection",
    category: "Tabular ML",
    title: "Phishing URL Detection",
    archive: true,
    event: "FIT Competition 2026",
    summary: "A leak-free URL classifier, built after finding duplicates in 47.6% of the rows.",
    stack: ["LightGBM", "XGBoost", "CatBoost", "SHAP"],
    metric: { value: "0.966", label: "ROC AUC" },
    repoUrl: "https://github.com/veinsan/phishing-url-detection-lightgbm",
    problem: "Separate phishing URLs from legitimate ones, in data where duplicates affected 47.6% of the rows.",
    approach: "Deduplicate first, then train gradient-boosted models on lexical features from inside the URL only, explained with SHAP.",
    result: "0.899 F1 and 0.966 ROC AUC on a held-out, deduplicated test set.",
  },
  {
    slug: "soil-organic-regression",
    category: "Tabular ML",
    title: "Soil Organic Regression",
    archive: true,
    event: "COMPFEST 18 Academy selection",
    summary: "The tree-based ensemble that earned a COMPFEST 18 Academy place.",
    stack: ["LightGBM", "XGBoost", "CatBoost"],
    metric: { value: "10.972", label: "private RMSE" },
    repoUrl: "https://github.com/veinsan/soil-organic-carbon-regression",
    problem: "Predict soil organic content from geographic, physicochemical and spectral features.",
    approach: "Out-of-fold target-transform selection and hierarchical target encoding, then a greedy forward-selected ensemble.",
    result: "10.972 RMSE on the private leaderboard. This case earned a place in COMPFEST 18 Academy, selected from 4,400+ applicants.",
  },
  {
    slug: "belajarduludek",
    category: "Course project",
    course: "II2210",
    title: "BelajarDuluDek",
    archive: true,
    event: "Deployed to production",
    summary: "A study platform for Indonesian high-school students with AI chat, flashcards and tryouts.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    repoUrl: "https://github.com/veinsan/belajarduludek",
    team: "Built with Mishael Gilland for II2210 at ITB.",
    problem: "Give Indonesian high-school students one place to study, ask questions and practise for exams.",
    approach: "Next.js and TypeScript on Prisma and PostgreSQL, with AI chat through the Gemini and Claude APIs, generated flashcards, quizzes, tryouts and JWT authentication.",
    result: "Deployed to production.",
  },
  {
    slug: "oceanearn",
    category: "Full stack",
    title: "OceanEarn",
    archive: true,
    event: "I/O Festival 2026",
    summary: "A reward platform for maritime waste with photo-based waste estimation.",
    stack: ["React", "Django", "PostgreSQL", "YOLO"],
    metric: { value: "19", label: "REST endpoints" },
    repoUrl: "https://github.com/veinsan/oceanearn",
    problem: "Reward people who bring maritime waste ashore, across fishers, collection points and admins.",
    approach: "A Django REST API with role-based auth and Google SSO, YOLO waste estimation, perceptual hashing against duplicate submissions and a Haversine nearest-point lookup.",
    result: "19 REST API endpoints behind a React front end.",
  },
  {
    slug: "open-transcript",
    category: "ML systems",
    title: "Open Transcript",
    archive: true,
    event: "Open source",
    summary: "Offline transcription with speaker labels, fast enough on a CPU.",
    stack: ["faster-whisper", "pyannote.audio", "CTranslate2"],
    repoUrl: "https://github.com/veinsan/open-transcript",
    problem: "Transcribe audio and video fully offline, without a GPU, and know who said what.",
    approach: "faster-whisper with int8 quantization for CPU inference, pyannote.audio for diarization, and a resumable batch CLI.",
    result: "Exports TXT, JSON, SRT and VTT.",
  },
  {
    slug: "deardiary",
    title: "DearDiary",
    archive: true,
    category: "Course project",
    course: "IF2050",
    event: "Team project, IF2050",
    summary: "A desktop app for tracking innovation projects, from the first idea to prototype versions.",
    stack: ["Java", "JavaFX", "PostgreSQL", "Maven"],
    repoUrl: "https://github.com/veinsan/IF2050-2026-K01-G12-DearDiary",
    problem: "Manage internal innovation projects in one desktop app: ideas, experiment logs and prototype version history.",
    approach: "A JavaFX app on PostgreSQL built by a course team. My part was the login and authentication module with role-based access control.",
    result: "Idea tracking, experiment logs and prototype history behind role-based sign-in.",
  },
  {
    slug: "nimonscooked",
    title: "Nimonscooked",
    archive: true,
    category: "Course project",
    event: "Java game",
    summary: "A cooperative cooking game with multi-threaded cooking and cutting stations.",
    stack: ["Java", "LibGDX"],
    repoUrl: "https://github.com/veinsan/nimonscooked",
    problem: "Build a cooperative cooking simulation where several stations work at the same time.",
    approach: "Multi-threaded concurrency for the cooking and cutting stations, a state machine for ingredient processing, and the Singleton, Factory, Observer and MVC patterns.",
    result: "A playable LibGDX game with concurrent stations and a clear object model.",
  },
  {
    slug: "gelap-nyawang",
    title: "Ganyang Lapar di Gelap Nyawang",
    archive: true,
    category: "Full stack",
    event: "Directory platform",
    summary: "A directory of local food and small businesses around Gelap Nyawang, with live search.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    repoUrl: "https://github.com/veinsan/GelapNyawang",
    problem: "Help people find local food and UMKM listings around the Gelap Nyawang area.",
    approach: "I built the main landing page and the directory page end to end: live search, category filtering and dark mode.",
    result: "A searchable directory of local businesses.",
  },
  {
    slug: "nimonshospital",
    title: "NimonsHospital",
    archive: true,
    category: "Course project",
    event: "Terminal app in C",
    summary: "A terminal hospital management system with multi-role login and patient queues.",
    stack: ["C"],
    repoUrl: "https://github.com/veinsan/NimonsHospital",
    problem: "Run a hospital's core flows from the terminal for several kinds of user.",
    approach: "Multi-role authentication, queue-based patient scheduling, and sorting and searching written by hand: bubble sort, selection sort and binary search.",
    result: "A working terminal system built on core data structures and algorithms.",
  },
  {
    slug: "fithealth",
    title: "Fithealth",
    archive: true,
    category: "Full stack",
    event: "Health platform",
    summary: "A digital health platform for tracking personal metrics, building habits and assessing risk.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    repoUrl: "https://github.com/veinsan/Fithealth",
    problem: "Give people one place to track health metrics and build healthier habits.",
    approach: "A Next.js and TypeScript app on PostgreSQL covering metric tracking, habit building and risk assessment.",
    result: "Tracking, habits and risk assessment in one platform.",
  },
];

export const experience = [
  {
    when: "Aug 2026 to now",
    role: "Laboratory Assistant",
    type: "AI Laboratory",
    org: "Artificial Intelligence Laboratory, STEI ITB",
    note: "Support AI and ML coursework, student projects and faculty-led work, helping students put machine learning into practice. Joined through a three-stage selection covering Prolog, ML from scratch in NumPy and multimodal classification.",
    now: true,
  },
  {
    when: "Sep 2026 to now",
    role: "Backend Lead",
    type: "Volunteer",
    org: "AIAA ITB internal website",
    note: "Leading a three-person team on the ERP API in NestJS, Drizzle and PostgreSQL. I own the ERD, role-based authorization and cross-module review, and built auth, the Tracker approval flow, Swagger docs and rate limiting, backed by 136 tests.",
    now: true,
  },
  {
    when: "Jul to Sep 2026",
    role: "Data Science Mentee",
    type: "Academy",
    org: "COMPFEST 18 Academy",
    note: "Selected from 4,400+ applicants with a soil organic content regression case. Won Best Case Study Team with Awas Api, an AI wildfire early-warning platform predicting H-1 hotspot surges.",
  },
  {
    when: "Feb to Apr 2025",
    role: "Backend Developer",
    type: "Volunteer",
    org: "Wisuda April ITB 2025",
    note: "Built the backend for Menfess, an anonymous messaging feature, with Next.js, TypeScript and Prisma.",
  },
  {
    when: "Dec 2024",
    role: "IT Intern, Operations",
    type: "Internship",
    org: "Pendidikan Tingkat Dasar, KSEP ITB",
    note: "Supported the technical systems and digital workflows used during the program's event operations.",
  },
];

export const education = {
  degree: "B.Sc. Information Systems and Technology",
  school: "Institut Teknologi Bandung",
  start: "2024-09-01",
  end: "2028-08-31",
  when: "Sep 2024 to Aug 2028",
  gpa: "3.64",
  activities: [
    "Head of Sponsorship, Arkavidia 11.0",
    "Head of Creative, Aksi Angkatan SPARTA HMIF ITB 2025",
    "Head of Public Relations, Formatur Committee STEI-K ITB 2024",
    "Head of Documentation, STEI TPB Cup 2024",
    "Mentor, OSKM ITB 2025",
    "People Development Intern, HMIF ITB",
    "Field Staff, Wisuda April HMIF 2026",
    "Videographer, Aku Masuk ITB 2025",
  ],
};

export const certifications = [
  { title: "SummerCamp Machine Learning 2026", issuer: "Codelab Indonesia", when: "Aug 2026" },
];

export const practices = [
  {
    title: "Computer vision",
    tools: ["PyTorch", "timm", "DINOv3", "Hugging Face", "YOLO"],
    text: "Foundation-model backbones, DINOv3 and DINOv2, adapted for scripts, disasters, packages, fields and faces.",
    proof: "SCRIBE, GRIT, RESI, ATLAS",
  },
  {
    title: "Tabular and forecasting",
    tools: ["LightGBM", "XGBoost", "CatBoost", "Optuna", "SHAP", "scikit-learn", "Pandas"],
    text: "Gradient-boosted ensembles tuned with Optuna and explained with SHAP, on messy real data.",
    proof: "RETAIN, GALON, HARVEST",
  },
  {
    title: "Backend systems",
    tools: ["NestJS", "FastAPI", "Django", "PostgreSQL", "Drizzle", "Prisma", "Supabase", "Docker"],
    text: "Typed APIs with authorization, approval flows and tests, from NestJS to Django.",
    proof: "AIAA ITB ERP, 136 tests",
  },
  {
    title: "Agentic AI",
    tools: ["Supervity Auto", "Slack API", "Supabase"],
    text: "Multi-agent workflows that hand real cases to the right people, and what I am exploring next.",
    proof: "HR Command Center",
  },
];

export const faq = [
  {
    q: "What are you looking for?",
    a: "Internships in AI, ML or data science, research work, and teammates for the next competition.",
  },
  {
    q: "Where are you based?",
    a: "Bandung, Indonesia. I study Information Systems and Technology at ITB and graduate in August 2028.",
  },
  {
    q: "What do you work with?",
    a: "PyTorch, timm and Hugging Face for vision. LightGBM, XGBoost, CatBoost, Optuna and SHAP for tabular work. NestJS, FastAPI, Django and PostgreSQL for backends.",
  },
  {
    q: "Can I see the code?",
    a: "Yes. Most projects link to their repository on GitHub from the case page.",
  },
  {
    q: "Anything outside code?",
    a: "Head of Sponsorship for Arkavidia 11.0, Head of Creative for Aksi Angkatan SPARTA HMIF ITB 2025, Mentor at OSKM ITB 2025, and documentation and public relations for STEI-K ITB events.",
  },
];

export const numbers = [
  { value: "4", label: "competition wins in 2026" },
  { value: "2", label: "first places, both national" },
  { value: "10", label: "competition results in 2026" },
  { value: "3.64", label: "GPA out of 4.00" },
];

export const skills = [
  { group: "AI and ML", items: ["PyTorch", "Hugging Face Transformers", "timm", "LightGBM", "XGBoost", "CatBoost", "scikit-learn", "Optuna", "SHAP", "Pandas", "NumPy"] },
  { group: "Backend and cloud", items: ["NestJS", "FastAPI", "Django", "Node.js", "PostgreSQL", "Drizzle ORM", "Prisma ORM", "Supabase", "Docker", "Vercel"] },
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C", "Java", "SQL"] },
  { group: "Frontend and tools", items: ["React", "Next.js", "Tailwind CSS", "Git", "Linux", "Swagger/OpenAPI", "CI/CD"] },
];

/** The photo strip. Add `src` (an image in public/) to replace a placeholder frame. */
export const moments: { caption: string; src?: string }[] = [
  { caption: "1st Place, INFEST XII 2026", src: "/photo/infest.jpg" },
  { caption: "1st Place, Big Data Competition 2026", src: "/photo/big-data.jpg" },
  { caption: "2nd Place, DATASCAPE 2026", src: "/photo/datascape.jpg" },
  { caption: "3rd Place, DAC PRS ITS 2026", src: "/photo/dac-prs-its.jpg" },
  { caption: "1st Honorable Mention, HOLOGY 9.0", src: "/photo/hology.jpg" },
  { caption: "Grand Finalist, AutoPilot Asia, Kuala Lumpur", src: "/photo/autopilot.jpg" },
  { caption: "COMPFEST 18 Academy, Best Case Study Team", src: "/photo/compfest.jpg" },
];

/** From LinkedIn, Nov 2026. */
export const organizations = [
  { role: "Head of Sponsorship", org: "Arkavidia 11.0", when: "May 2026 to now" },
  { role: "Field Staff", org: "Wisuda April HMIF 2026", when: "Mar to Apr 2026" },
  { role: "People Development Intern", org: "HMIF ITB", when: "Oct 2025 to Apr 2026" },
  { role: "Liaison Officer", org: "Wisuda Oktober HMIF 2025", when: "Oct 2025" },
  { role: "Mentor", org: "OSKM ITB 2025", when: "Jul to Aug 2025" },
  { role: "Head of Creative", org: "Aksi Angkatan SPARTA HMIF ITB 2025", when: "2025" },
  { role: "Videographer", org: "Aku Masuk ITB 2025", when: "Dec 2024 to Feb 2025" },
  { role: "Photographer and Documentation Staff", org: "STEI-K ITB 2024", when: "Dec 2024 to Jun 2025" },
  { role: "Head of Documentation", org: "STEI TPB Cup 2024", when: "Oct 2024 to May 2025" },
  { role: "Head of Public Relations", org: "Formatur Committee STEI-K ITB 2024", when: "Sep to Oct 2024" },
];
