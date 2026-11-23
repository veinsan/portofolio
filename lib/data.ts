/**
 * All site copy. Sources: main.pdf (CV, Nov 2026), the repositories and slide decks on github.com/veinsan
 * and its team orgs (read Nov 2026), and the earlier LinkedIn export for hosts, months and committees.
 * Nothing here is invented. Placements follow the CV where a README says otherwise (see RANGKUMAN.md).
 * Deployed measurements are used over local ones.
 */

export const site = {
  name: "Riantama Putra",
  first: "Riantama",
  initials: "RP",
  role: "AI/ML & Software Engineer, Data Scientist",
  title: ["AI/ML & Software", "Engineer"],
  subtitle: "Data Scientist.",
  lead: "I build vision and tabular models on foundation backbones, validate them without leaks, and ship them behind tested APIs.",
  email: "riantamaputra751@gmail.com",
  location: "Bandung, Indonesia",
  url: "https://riantamaputra.tech",
  github: "https://github.com/veinsan",
  githubUser: "veinsan",
  linkedin: "https://www.linkedin.com/in/riantamaputra/",
  description:
    "AI/ML and software engineer and data scientist at ITB. Three first places among five podiums in 2026, AI Lab Assistant, and models shipped behind tested APIs.",
  /** The public CV. Delete the file and set this to "" to hide every Download CV button. */
  cvUrl: "/cv.pdf",
};

export const nav = [
  { label: "About", href: "/about/" },
  { label: "Work", href: "/work/" },
  { label: "Experience", href: "/#experience" },
];

/** The five accents of the palette picker. The colours live in app/styles/tokens.css. */
export const accents = ["slate", "forest", "rust", "cobalt", "plum"] as const;

/* ---------- Work: every project, each with its own page ---------- */

export const categories = ["Competition", "AI & ML", "Engineering", "Coursework"] as const;
export type Category = (typeof categories)[number];

type Size = [width: number, height: number];

export type Project = {
  slug: string;
  title: string;
  /** One line under the title. */
  kind: string;
  categories: Category[];
  year: string;
  when?: string;
  /** Placement or status. */
  badge?: string;
  summary: string;
  problem: string;
  approach: string;
  result?: string;
  facts?: { k: string; v: string }[];
  stack: string[];
  team?: string;
  /** In the gallery on the home page. */
  featured?: boolean;
  /** Pixel size of /projects/{slug}.webp. A 720px copy sits next to it. */
  cover?: Size;
  /** /projects/{slug}-shot{n}.webp, in order. */
  shots?: { size: Size; alt: string }[];
  repo?: string;
  live?: string;
  video?: string;
  /** Shown instead of a link. */
  note?: string;
};

const SLIDE: Size = [1400, 788];

export const projects: Project[] = [
  {
    slug: "scribe",
    title: "SCRIBE",
    kind: "Indonesian script classification",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "1st place, INFEST XII 2026",
    featured: true,
    cover: [1440, 474],
    summary: "Reads seven Indonesian scripts from manuscript pages and single lines, on a test set that was corrupted on purpose.",
    problem:
      "Classify a text image as one of seven scripts: Bali, Jawa, Jawi, Lampung, Lontara, Pegon and Sunda. The baseline scored 0.976 on a random holdout but 0.863 on the public leaderboard, because the test set was shifted by synthetic corruption, full-page photos and skew.",
    approach:
      "Each test artifact was reproduced at its measured rate during training. Validation grouped near-duplicates by perceptual hashes and DINOv3 embeddings, so no copy crossed folds. A router sends each image by height to a page expert or a line expert, both DINOv3 ViT-L/16 trained over five folds.",
    result: "1st overall at INFEST XII 2026, judged on the leaderboard, the notebook and the presentation. The best private macro F1 was 0.953.",
    facts: [{ k: "Overall", v: "1st" }, { k: "Private macro F1", v: "0.953" }, { k: "Scripts", v: "7" }, { k: "Training images", v: "3,771" }],
    stack: ["PyTorch", "timm", "DINOv3 ViT-L/16", "SigLIP2", "StratifiedGroupKFold"],
    team: "M. Fachri Alfaridzi, Riantama Putra, Tiara Kusuma W.",
    shots: [
      { size: SLIDE, alt: "Slide: a router sends page photos and text lines to two DINOv3 experts." },
      { size: SLIDE, alt: "Slide: clean script samples beside the synthetic corruptions used in training." },
      { size: SLIDE, alt: "Slide: the baseline drops from 0.976 on a random holdout to 0.863 on the public leaderboard." },
    ],
    repo: "https://github.com/psi-2/infest-2026",
  },
  {
    slug: "grit",
    title: "GRIT",
    kind: "Disaster type and damage severity",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Sep 2026",
    badge: "1st place, BDC Statistics Explore 2026",
    featured: true,
    cover: [1440, 590],
    summary: "Labels disaster photos by type and damage, on 17,482 images full of near-duplicates and noisy labels.",
    problem:
      "Label each photo with its disaster (flood, earthquake, fire) and its damage (light, moderate, heavy). Type accuracy was already near 99.6%, so every gain had to come from severity, in data where about 38% of images are near-duplicates.",
    approach:
      "Fine-tuned the last 6 of 40 blocks of DINOv3 ViT-7B/16 at 384px. Folds were grouped by rotation- and mirror-invariant hashes, because a random split would leak 45% of the validation rows. The head conditions on disaster type with FiLM and predicts severity as an ordinal with CORN and soft targets.",
    result: "1st place in the image track and #1 on the private leaderboard, with a micro F1 of 0.904.",
    facts: [{ k: "Private leaderboard", v: "#1" }, { k: "Private micro F1", v: "0.904" }, { k: "Training images", v: "17,482" }, { k: "Leak avoided", v: "45%" }],
    stack: ["PyTorch", "DINOv3 ViT-7B/16", "FiLM", "CORN", "StratifiedGroupKFold"],
    team: "Riantama Putra, Farrel Athalla Putra, Ayu Nagita Cahyaning Wulan.",
    shots: [
      { size: SLIDE, alt: "Slide: the DINOv3 pipeline with pooling, a joint head and ordinal severity." },
      { size: SLIDE, alt: "Slide: scene-grouped validation keeps near-duplicate photos in one fold." },
      { size: SLIDE, alt: "Slide: backbone benchmark, led by DINOv3." },
    ],
    repo: "https://github.com/veinsan/bdc-se26",
  },
  {
    slug: "echo",
    title: "ECHO",
    kind: "Tabular regression on tiny data",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Nov 2026",
    badge: "1st place, FIK FAIR 2026",
    featured: true,
    cover: [1440, 720],
    summary: "Regression on 382 rows with two tabular foundation models and a stack of residual corrections.",
    problem: "Predict an anonymized competition score from 24 anonymized, highly collinear features, with only 382 training rows.",
    approach:
      "A feature layer averages TabICLv2 and TabPFN-3.5 and blends them with an RBF SVR. The training file turned out to be almost sorted by the target (Spearman ρ = −0.981), so a row-order layer follows, which the organizers confirmed is allowed. Four nested-CV residual corrections finish the stack.",
    result: "1st place at FIK FAIR 2026 Data Science, UPN Veteran Jakarta. Cross-validated RMSE fell from 7.23 to 3.02 over five folds and three repeats.",
    facts: [{ k: "Placement", v: "1st" }, { k: "CV RMSE", v: "3.02" }, { k: "Before correction", v: "7.23" }, { k: "Training rows", v: "382" }],
    stack: ["TabICLv2", "TabPFN-3.5", "scikit-learn", "SVR", "Kernel Ridge"],
    team: "Riantama Putra (lead), Haikal Muhammad Royyan, Defina Aurellia Ningsih, Taufiq Muhammad Arif.",
    shots: [
      { size: [1400, 818], alt: "Solution dashboard: cross-validated and public RMSE across thirteen versions." },
      { size: [1400, 658], alt: "Analysis: the position of each row in the file predicts its target." },
    ],
    repo: "https://github.com/veinsan/fikfair-2026",
  },
  {
    slug: "resi",
    title: "RESI",
    kind: "Package condition from photos",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    badge: "2nd place, DATASCAPE 2026",
    featured: true,
    cover: [1440, 528],
    summary: "Sorts parcel photos into intact, damaged and other, after cleaning mixed-source, mislabeled data.",
    problem:
      "Classify shipping-package photos from data that is imbalanced, mixed-source and noisy. 26 byte-identical images carried conflicting labels.",
    approach:
      "Cleaned 12,224 images down to 11,299: exact conflicts and source profiling first, then confident learning with a DINOv3 linear probe, which removed 246 more. Then fine-tuned DINOv3 ViT-7B/16 with focal loss, layer-wise learning-rate decay and EMA on grouped five-fold CV.",
    result: "2nd place at DATASCAPE 2026, Telkom University. Private macro F1 reached 0.927, and 0.935 out of fold against 0.730 for a frozen linear probe.",
    facts: [{ k: "Placement", v: "2nd" }, { k: "Private macro F1", v: "0.927" }, { k: "Frozen baseline", v: "0.730" }, { k: "Images kept", v: "11,299" }],
    stack: ["PyTorch", "DINOv3 ViT-7B/16", "Confident learning", "Focal loss"],
    team: "Riantama Putra (lead), Farrel Athalla Putra, Ayu Nagita Cahyaning Wulan.",
    shots: [
      { size: SLIDE, alt: "Slide: the workflow from cleaning to test-time augmentation." },
      { size: SLIDE, alt: "Slide: examples of mislabeled package photos." },
      { size: SLIDE, alt: "Slide: rotated and mirrored duplicates found with polar FFT matching." },
    ],
    repo: "https://github.com/veinsan/datascape-2026",
  },
  {
    slug: "retain",
    title: "RETAIN",
    kind: "Life-insurance churn",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "3rd place, PRS ITS 2026",
    featured: true,
    cover: [1200, 810],
    summary: "Ranks policies by churn risk when only 3.7% churn, and catches 24 of 26 churners on holdout.",
    problem: "Predict which life-insurance policies will churn when churn is rare: 185 cases, or 3.7% of customers.",
    approach:
      "Five-fold CV grouped by customer plus a 20% holdout, then a class-weighted ensemble of LightGBM, CatBoost and XGBoost, with calibration and SHAP checks. The preliminary round ranked fraudulent claims under a 5% audit budget.",
    result: "3rd place in the final round, international level. The holdout ROC AUC was 0.991, with 24 of 26 churners found at 0.53 precision.",
    facts: [{ k: "Placement", v: "3rd" }, { k: "Holdout ROC AUC", v: "0.991" }, { k: "Churners found", v: "24 of 26" }, { k: "Precision", v: "0.53" }],
    stack: ["LightGBM", "CatBoost", "XGBoost", "SHAP", "scikit-learn"],
    team: "Athilla Zaidan Zidna Fann, Riantama Putra.",
    shots: [
      { size: [1400, 396], alt: "Holdout diagnostics: confusion matrix, ROC curve and precision-recall curve." },
      { size: [1400, 876], alt: "SHAP summary of the churn model, led by tenure and payment frequency." },
    ],
    repo: "https://github.com/IndomaretLabtekV/prs-its-2026",
  },
  {
    slug: "proofskill",
    title: "ProofSkill",
    kind: "Verifiable skill credentials",
    categories: ["Engineering", "AI & ML", "Coursework"],
    year: "2026",
    when: "Nov 2026",
    badge: "Live product",
    featured: true,
    cover: [1440, 900],
    summary: "Tamper-evident credentials anyone can verify, with an evaluated LLM judge for skill fit.",
    problem: "Certificates from nonformal training are hard to verify, so holders cannot prove what they learned and recruiters cannot trust what they see.",
    approach:
      "Organizers issue a credential whose salted hash, issuer and status go to a Solidity registry on Base Sepolia, with no personal data on-chain. Holders share a scoped link. Verifiers check integrity, issuer and status, then read a skill-fit note from Gemini embeddings and an LLM judge chosen on a locked synthetic gold set.",
    result: "Deployed on Vercel with a FastAPI backend. 169 API tests pass, and a check on the deployed stack takes a median of 0.44 seconds over 10 runs.",
    facts: [{ k: "Median check, deployed", v: "0.44 s" }, { k: "API tests", v: "169" }, { k: "Acceptance cases", v: "16 of 16" }, { k: "Personal data on-chain", v: "None" }],
    stack: ["FastAPI", "Next.js", "Solidity", "Base Sepolia", "Supabase", "Gemini"],
    team: "Group project for II3120, Information Systems and Technology Services.",
    shots: [
      { size: [1400, 887], alt: "Verifier portal showing a valid credential and its three checks." },
      { size: [1400, 887], alt: "Verifier portal refusing a revoked credential." },
      { size: SLIDE, alt: "Deployed architecture: web app, API, database, chain registry and model." },
    ],
    repo: "https://github.com/veinsan/proofskill",
    live: "https://proofskill-two.vercel.app",
  },
  {
    slug: "atlas",
    title: "ATLAS",
    kind: "Paddy-field segmentation from satellites",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "4th place, HOLOGY 9.0 HoloMine",
    featured: true,
    cover: [1440, 498],
    summary: "Maps paddy fields from satellite tiles, with spatial folds that purge every overlapping neighbour.",
    problem:
      "The final task was segmenting paddy fields on Pleiades tiles that overlap by half. The earlier rounds, mammogram classification and property prices from text, hid file-format and patient leaks.",
    approach:
      "Patient and spatial folds with overlap purging, a DINOv3 ViT-L/16 satellite encoder with a fused multi-layer decoder, and acquisition-aware augmentation for haze, seams and radiometric stretch.",
    result: "4th overall and 1st Honorable Mention, from the private leaderboard and the judged presentation.",
    facts: [{ k: "Overall", v: "4th" }, { k: "Private IoU, final", v: "0.645" }, { k: "Mammogram macro F1", v: "0.904" }, { k: "Data types", v: "3" }],
    stack: ["PyTorch", "DINOv3 SAT", "Mammo-FM", "DeBERTa-v3", "LightGBM"],
    team: "Riantama Putra, Athilla Zaidan Zidna Fann, Nicholas Wise Saragih Sumbayak.",
    shots: [
      { size: SLIDE, alt: "Slide: satellite tile, reference mask, prediction and error map." },
      { size: SLIDE, alt: "Slide: five spatial folds with overlapping tiles purged." },
      { size: SLIDE, alt: "Slide: predicted masks turned into paddy-area estimates." },
    ],
    repo: "https://github.com/IndomaretLabtekV/hology-2026",
  },
  {
    slug: "galon",
    title: "GALON",
    kind: "Next-month water stress",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "5th place, IFEST 2026",
    featured: true,
    cover: [1440, 512],
    summary: "Warns which US sub-basins will be water-stressed next month, from deliberately corrupted data.",
    problem:
      "Forecast next-month water stress per sub-basin when the test set is rescaled, corrupted in 11 ways and set in future, partly unseen basins.",
    approach:
      "Scale-free anomaly features, repairs through the water-budget identity, leave-one-year-out plus whole-basin holdouts, and an Optuna-tuned ensemble of five gradient-boosting families.",
    result: "5th of 88 teams. Private average precision was 0.768, and validation beat the persistence baseline 0.708 to 0.589.",
    facts: [{ k: "Of 88 teams", v: "5th" }, { k: "Private AP", v: "0.768" }, { k: "Persistence baseline", v: "0.589" }, { k: "Corruption types", v: "11" }],
    stack: ["LightGBM", "XGBoost", "CatBoost", "Optuna", "SHAP"],
    team: "Riantama Putra, Athilla Zaidan Zidna Fann, Nicholas Wise Saragih Sumbayak.",
    shots: [
      { size: SLIDE, alt: "Slide: dry sub-basins are 6.6 times as likely to be stressed next month." },
      { size: SLIDE, alt: "Slide: repairing duplicated and corrupted records." },
      { size: SLIDE, alt: "Slide: feature importance and evaluation of the early-warning model." },
    ],
    repo: "https://github.com/IndomaretLabtekV/ifest-2026",
  },
  {
    slug: "harvest",
    title: "HARVEST",
    kind: "Food-system resilience forecasting",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "7th place, RASIO 10.0",
    featured: true,
    cover: [1300, 438],
    summary: "Forecasts food resilience for 358 regions using only what was known the year before.",
    problem:
      "Forecast the 2026 resilience index for 358 regions. The target persists in time and across neighbours, and its best same-year predictor is missing for all of 2026.",
    approach:
      "61 causal lag, rolling and neighbour features built only from earlier years, one CatBoost averaged over five seeds, and nested rolling-origin validation.",
    result: "7th place, international level. Pooled out-of-fold RMSE was 9.349, 18% below the persistence baseline.",
    facts: [{ k: "Placement", v: "7th" }, { k: "Below baseline", v: "18%" }, { k: "Regions", v: "358" }, { k: "Causal features", v: "61" }],
    stack: ["CatBoost", "LightGBM", "XGBoost", "SHAP"],
    team: "Riantama Putra, Athilla Zaidan Zidna Fann, Nicholas Wise Saragih Sumbayak.",
    shots: [
      { size: SLIDE, alt: "Slide: the neighbour graph and historical neighbour mean." },
      { size: SLIDE, alt: "Slide: resilience is persistent but noisy through time." },
      { size: SLIDE, alt: "Slide: checking for a regime shift toward 2026." },
    ],
    repo: "https://github.com/IndomaretLabtekV/rasio-2026",
  },
  {
    slug: "face-anti-spoofing",
    title: "Face Anti-Spoofing",
    kind: "Dual-stream presentation-attack detection",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "May 2026",
    badge: "13th of 339 teams, Find IT! 2026",
    featured: true,
    cover: [1440, 494],
    summary: "Separates real faces from five kinds of spoof by looking at shape and texture in two streams.",
    problem: "Some attacks differ only in micro-texture such as moiré and print grain, others only in global shape. One backbone rarely sees both.",
    approach:
      "DINOv2 ViT-S/14 reads global structure while a Laplacian enhancer feeds ConvNeXtV2-Tiny for texture. Gated fusion joins them, with grouped five-fold CV, test-time augmentation and calibration.",
    result: "13th of 339 teams. The private leaderboard score was 0.982, with 0.974 out of fold.",
    facts: [{ k: "Of 339 teams", v: "13th" }, { k: "Private score", v: "0.982" }, { k: "Out-of-fold macro F1", v: "0.974" }, { k: "Classes", v: "6" }],
    stack: ["PyTorch", "DINOv2", "ConvNeXtV2", "Gated fusion"],
    team: "Riantama Putra, Aldyto Rafif Abhinaya, M. Ghiffary Alfathan.",
    shots: [
      { size: SLIDE, alt: "Slide: a global shape stream and a local texture stream." },
      { size: SLIDE, alt: "Slide: why two streams are needed for spoofing cues." },
    ],
    repo: "https://github.com/veinsan/face-anti-spoofing-dinov2-convnext",
  },
  {
    slug: "hr-command-center",
    title: "HR Command Center",
    kind: "Governed multi-agent HR operations",
    categories: ["Competition", "AI & ML", "Engineering"],
    year: "2026",
    when: "Aug 2026",
    badge: "Grand finalist, AutoPilot Asia",
    featured: true,
    cover: [1200, 850],
    summary: "Agents follow each new hire through the first 90 days and hand risky cases to people.",
    problem: "Onboarding slips quietly: late provisioning, missed check-ins and sensitive disclosures that a person should handle.",
    approach:
      "Operators and an orchestrator on Supervity Auto watch each hire, with Supabase, Slack and Typeform around them, policy limits and human escalation. I planned and integrated the system and added the CI pipeline.",
    result: "Grand finalist in an APAC-wide hackathon, with finals in Kuala Lumpur. The pipeline runs 58 passing tests.",
    facts: [{ k: "Result", v: "Grand final" }, { k: "Tests in CI", v: "58" }, { k: "Team", v: "2" }, { k: "Window", v: "90 days" }],
    stack: ["Supervity Auto", "FastAPI", "Next.js", "Supabase", "GitHub Actions"],
    team: "A team of two.",
    repo: "https://github.com/veinsan/supervity-hr-ai-employee",
  },
  {
    slug: "avela",
    title: "Avela",
    kind: "Wildfire-smoke companion",
    categories: ["Engineering", "Coursework"],
    year: "2026",
    when: "Nov 2026",
    badge: "Live API",
    cover: [1440, 720],
    summary: "Hourly PM2.5 forecasts and symptom reports, served from a 256 MB set-top box.",
    problem: "Residents get an air-quality number with no next step, and health staff never hear how people feel.",
    approach:
      "A FastAPI and SQLite core runs on a set-top box behind Nginx and Cloudflare Tunnel. A second service brings in forecasts, and a React Native app serves residents and facility staff.",
    result: "The core API is live, and 66 tests cover the two services and the app.",
    facts: [{ k: "Memory", v: "256 MB" }, { k: "Tests", v: "66" }, { k: "Services", v: "2" }, { k: "Forecast", v: "Hourly" }],
    stack: ["FastAPI", "SQLite", "React Native", "Docker", "Cloudflare Tunnel"],
    team: "Mishael Gilland, Riantama Putra.",
    shots: [{ size: [1400, 875], alt: "The live API reference of the Avela core service." }],
    repo: "https://github.com/veinsan/avela",
    live: "https://avela.stei.fun/api/docs",
  },
  {
    slug: "aiaa-erp",
    title: "AIAA ITB ERP",
    kind: "Backend lead, internal ERP",
    categories: ["Engineering"],
    year: "2026",
    when: "Sep 2026 to now",
    badge: "In production",
    summary: "The role-scoped API behind a student branch: members, trackers, requests, documents and audit logs.",
    problem: "Run a student branch's operations in one place, with every role seeing only what it should.",
    approach: "I lead a three-person team on a NestJS and PostgreSQL API in seven modules with role-based access control.",
    result: "175+ unit and end-to-end tests run in GitHub Actions, and the app deploys to Vercel and Neon.",
    facts: [{ k: "Tests", v: "175+" }, { k: "Modules", v: "7" }, { k: "Team led", v: "3" }],
    stack: ["NestJS", "PostgreSQL", "Drizzle", "Better Auth", "GitHub Actions"],
    note: "Private repository",
  },
  {
    slug: "belajarduludek",
    title: "BelajarDuluDek",
    kind: "LLM study platform",
    categories: ["Engineering", "AI & ML"],
    year: "2026",
    when: "May to Jun 2026",
    badge: "Live product",
    cover: [1440, 700],
    summary: "Turns a high-school student's material into summaries, flashcards, quizzes and tryouts.",
    problem: "Students preparing for exams juggle material, practice and explanations across many apps.",
    approach: "Next.js route handlers on Prisma and PostgreSQL, with Gemini and Claude generating study material from uploads and explaining it in chat.",
    result: "Built, deployed and live on Vercel.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Gemini API", "Claude API"],
    repo: "https://github.com/veinsan/belajarduludek",
    live: "https://belajarduludek.vercel.app",
  },
  {
    slug: "tunas",
    title: "TUNAS",
    kind: "Child-growth screening",
    categories: ["Competition", "AI & ML", "Engineering"],
    year: "2026",
    when: "Aug 2026",
    badge: "Semifinal, Datathon 2026",
    cover: [1440, 900],
    summary: "Estimates a toddler's length from photos and ranks who Posyandu cadres should visit first.",
    problem: "Manual growth measurements are error-prone, and follow-up visits are scarce.",
    approach: "Mat detection, segmentation and geometry estimate length, and a LightGBM model ranks risk from the growth trajectory with SHAP reasons.",
    result: "Semifinalist at Datathon 2026 by RISTEK Fasilkom UI, served live. The risk model was evaluated on synthetic cohorts.",
    stack: ["LightGBM", "SHAP", "FastAPI", "Next.js", "PostgreSQL"],
    team: "A team of three.",
    repo: "https://github.com/IndomaretLabtekV/tunas-posyandu",
    live: "https://tunas-posyandu-lemon.vercel.app",
  },
  {
    slug: "waste-classification",
    title: "Waste Classification",
    kind: "Frozen ViT-7B probe",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    badge: "24th of 544 teams, BDC Satria Data 2026",
    summary: "Sorts waste photos into recyclable, electronic and organic without fine-tuning a single block.",
    problem: "Fine-tuning a 6.7B-parameter backbone was too expensive on competition hardware.",
    approach: "A frozen DINOv3 ViT-7B with a class-token and mean-patch readout into a regularized MLP head.",
    result: "24th of 544 teams with a final macro F1 of 0.9989.",
    facts: [{ k: "Of 544 teams", v: "24th" }, { k: "Macro F1", v: "0.9989" }, { k: "Blocks trained", v: "0" }],
    stack: ["PyTorch", "DINOv3 ViT-7B", "timm", "scikit-learn"],
    repo: "https://github.com/IndomaretLabtekV/satria-data-2026",
  },
  {
    slug: "awas-api",
    title: "Awas Api",
    kind: "Wildfire early warning",
    categories: ["AI & ML"],
    year: "2026",
    when: "Sep 2026",
    badge: "Best Case Study Team, COMPFEST 18 Academy",
    cover: [1200, 880],
    summary: "An early-warning platform that predicts hotspot surges one day ahead.",
    problem: "Fire crews need to know where hotspots will surge before they do.",
    approach: "The final case study of COMPFEST 18 Academy: an AI model that predicts surges a day ahead, wrapped as an early-warning platform.",
    result: "Best Case Study Team of the Data Science Academy at Universitas Indonesia.",
    stack: ["Python", "Machine learning"],
  },
  {
    slug: "dere-detector",
    title: "Dere Detector",
    kind: "Multimodal late fusion",
    categories: ["AI & ML"],
    year: "2026",
    when: "Aug 2026",
    badge: "AI Lab selection, solo",
    cover: [1280, 456],
    summary: "Reads a character's text, name and face to call the archetype, as my third AI Lab selection task.",
    problem: "Classify character archetypes when text carries most of the signal and the image only helps on ambiguous cases.",
    approach: "Constrained late fusion of DeBERTa-v3, ModernBERT and TF-IDF for text with EVA02 and SigLIP2 for images, behind a standalone inference CLI.",
    result: "Public macro F1 of 0.835, against 0.623 out of fold for a baseline without transformers.",
    stack: ["PyTorch", "Transformers", "EVA02", "SigLIP2"],
    repo: "https://github.com/veinsan/Task3_AI_18224061",
    video: "https://youtu.be/C3USpEZVawQ",
  },
  {
    slug: "ml-from-scratch",
    title: "ML from Scratch",
    kind: "Classic models in NumPy",
    categories: ["AI & ML"],
    year: "2026",
    when: "Aug 2026",
    badge: "AI Lab selection, solo",
    summary: "CART, logistic regression and an SVM written by hand, with local search for shift rosters.",
    problem: "Implement the core algorithms without scikit-learn, which could only be used to check them.",
    approach: "CART with cost-complexity pruning, Newton-Raphson logistic regression and a squared-hinge SVM, plus hill climbing, annealing and a genetic algorithm.",
    result: "42 tests pass, and three search methods found a roster with zero violations.",
    stack: ["Python", "NumPy", "pandas"],
    repo: "https://github.com/veinsan/Task2_AI_18224061",
  },
  {
    slug: "soil-organic",
    title: "Soil Organic Content",
    kind: "Tabular regression",
    categories: ["AI & ML"],
    year: "2026",
    when: "Jul 2026",
    badge: "COMPFEST 18 Academy selection",
    summary: "The case that won a seat in an academy with 4,400+ applicants.",
    problem: "Predict soil organic content from a skewed target, dense spectral components and high-cardinality geography.",
    approach: "Out-of-fold hierarchical target encoding and a greedy blend of LightGBM, ExtraTrees and XGBoost.",
    result: "Private RMSE of 10.97, and selected for the academy.",
    stack: ["LightGBM", "XGBoost", "ExtraTrees", "SHAP"],
    repo: "https://github.com/veinsan/soil-organic-carbon-regression",
  },
  {
    slug: "datathon-tracks",
    title: "Datathon ML Tracks",
    kind: "Traffic and next-click prediction",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Aug 2026",
    badge: "Semifinal, Datathon 2026",
    summary: "Two model tracks: city traffic speeds, and a link graph rebuilt from screenshots.",
    problem: "Forecast road speeds across a city, and predict the next click on Wikipedia when the links only exist inside page screenshots.",
    approach: "Regime-routed residual LightGBM on a per-road anchor for traffic. OCR rebuilds the link graph for clicks, then LambdaRank reranks it.",
    result: "Both entries reached the semifinal round.",
    stack: ["LightGBM", "LambdaRank", "EasyOCR", "Sentence Transformers"],
    repo: "https://github.com/IndomaretLabtekV/datathon-2026",
  },
  {
    slug: "minetoday",
    title: "MineToday",
    kind: "Cold-start ranking",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    badge: "IT Today 2026",
    summary: "Recommends learning modules to brand-new users from chat history and a self-assessment.",
    problem: "Rank 17 modules with no interaction history, where identical inputs carry conflicting labels.",
    approach: "A calibrated base ranker with a fail-closed top-1 action layer trained on counterfactual gains, over BM25 and embedding retrieval.",
    result: "Public NDCG@5 of 0.662 at rank 4. Private rank 20.",
    stack: ["LightGBM", "LambdaRank", "BM25", "E5 embeddings"],
    repo: "https://github.com/IndomaretLabtekV/it-today-2026",
  },
  {
    slug: "river-levels",
    title: "River Level Forecast",
    kind: "Long-horizon time series",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    badge: "SSDS UNS 2026",
    summary: "Forecasts 30 river stations three times a day, 242 days ahead.",
    problem: "The horizon is long relative to the history, so recursive target lags fall apart.",
    approach: "Predict the change from each station's last level with hydro-spatial and rainfall features in LightGBM, blended with a small GRU.",
    result: "Private RMSE of 1.638.",
    stack: ["LightGBM", "PyTorch GRU", "Optuna", "HydroRIVERS"],
    repo: "https://github.com/IndomaretLabtekV/ssds-ssf-uns-2026",
  },
  {
    slug: "phishing-urls",
    title: "Phishing URL Detection",
    kind: "Deduplicated binary classification",
    categories: ["Competition", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "FIT Competition 2026",
    summary: "Finds phishing links from lexical features, after removing the 47.6% of rows that were copies.",
    problem: "118,172 of 247,950 rows were exact duplicates, enough to fake almost any score.",
    approach: "Deduplicate before splitting, compare LightGBM with an ensemble, set the threshold out of fold and explain with SHAP.",
    result: "F1 of 0.899 for the phishing class and ROC AUC of 0.966 on held-out data.",
    stack: ["LightGBM", "CatBoost", "XGBoost", "SHAP"],
    repo: "https://github.com/IndomaretLabtekV/fit-competition-2026",
  },
  {
    slug: "cargo",
    title: "CARGO",
    kind: "Local search for ship loading",
    categories: ["Coursework", "AI & ML"],
    year: "2026",
    when: "Oct 2026",
    badge: "IF3070 Artificial Intelligence",
    summary: "Packs vehicles onto cargo decks, then replays the search in a 2D and 3D simulator.",
    problem: "Maximize shipping fees without overlaps or overweight decks.",
    approach: "I wrote the state, objective with delta evaluation, neighbour moves, upper bound and hill-climbing variants. The team added annealing and a genetic algorithm.",
    result: "Across three seeds, steepest ascent came within 5.1% to 12.9% of the upper bound.",
    stack: ["Python", "Local search"],
    team: "Riantama Putra, Tiara Kusuma Wardhani, Levina Nathania Bunardi.",
    repo: "https://github.com/veinsan/IF3070_G09_Sepakat",
  },
  {
    slug: "nimonscooked",
    title: "Gastropath",
    kind: "Cooperative cooking game",
    categories: ["Coursework", "Engineering"],
    year: "2025",
    badge: "IF2010 Object-Oriented Programming",
    cover: [1440, 783],
    summary: "A two-chef kitchen game with stations that cook concurrently, built for Nimonscooked.",
    problem: "Design a real-time game where many stations work at once without the code turning to soup.",
    approach:
      "LibGDX with Factory, Command, Observer, Strategy and object pooling. I built the station, interaction and concurrency systems and merged the team's code.",
    result: "A playable desktop game with orders, scoring and JSON recipes.",
    stack: ["Java", "LibGDX", "Gradle"],
    team: "A team of four.",
    shots: [{ size: [908, 590], alt: "Gameplay: the kitchen grid with orders, score and timer." }],
    repo: "https://github.com/veinsan/nimonscooked",
  },
  {
    slug: "deardiary",
    title: "DearDiary",
    kind: "Innovation journal for desktop",
    categories: ["Coursework", "Engineering"],
    year: "2026",
    when: "May 2026",
    badge: "IF2050 Software Engineering",
    cover: [1440, 849],
    summary: "Documents an innovation project from first idea to prototype versions and a PDF.",
    problem: "Research teams lose the history of ideas, experiments and prototypes.",
    approach: "A JavaFX and PostgreSQL app in MVC. I built login, authentication and the dashboard skeleton.",
    stack: ["Java", "JavaFX", "PostgreSQL", "JUnit 5"],
    team: "A team of six.",
    shots: [{ size: [1400, 827], alt: "The dashboard listing innovation ideas with status and priority." }],
    repo: "https://github.com/veinsan/IF2050-2026-K01-G12-DearDiary",
  },
  {
    slug: "gelap-nyawang",
    title: "Gelap Nyawang",
    kind: "Local food directory",
    categories: ["Engineering", "Coursework"],
    year: "2025",
    when: "Nov 2025",
    badge: "Live site",
    cover: [1440, 900],
    summary: "Helps the small food stalls around Gelap Nyawang get found online.",
    problem: "Small food businesses near campus were hard to find online.",
    approach: "A searchable, filterable Next.js directory with a page per stall. I built the main page and directory and integrated the team's work.",
    result: "Live on Vercel.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    team: "A team of three.",
    repo: "https://github.com/veinsan/GelapNyawang",
    live: "https://gelap-nyawang.vercel.app",
  },
  {
    slug: "virtual-lab",
    title: "Virtual Physics Lab",
    kind: "Browser experiments",
    categories: ["Engineering"],
    year: "2026",
    when: "Oct 2026",
    badge: "Solo",
    summary: "Projectiles, springs and DC circuits you can drag around in a browser.",
    problem: "First-year physics is easier to grasp when the experiment moves.",
    approach: "Canvas simulations in plain JavaScript with RK4 integration, touch fallbacks and a lab notebook that exports CSV.",
    stack: ["JavaScript", "Canvas", "HTML", "CSS"],
    repo: "https://github.com/veinsan/virtual-lab",
  },
  {
    slug: "nimons-hospital",
    title: "Nimons Hospital",
    kind: "Data structures in C",
    categories: ["Coursework"],
    year: "2025",
    badge: "IF1210 Algorithms and Programming",
    summary: "A terminal hospital system on hand-written queues, stacks, maps and lists.",
    problem: "Run a hospital's flows with no standard containers.",
    approach: "Hand-written queue, stack, set, map and linked list modules under a command-line interface.",
    stack: ["C"],
    team: "A team of five.",
    repo: "https://github.com/veinsan/NimonsHospital",
  },
];

export const featured = projects.filter((p) => p.featured);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

/* ---------- Results: the medal board ---------- */

export type Metal = "gold" | "silver" | "bronze" | "steel";

export type Result = {
  /** Numeral or short word on the medal and in the row. */
  mark: string;
  /** Ordinal suffix, set small. */
  suffix?: string;
  /** Word under the mark. */
  label: string;
  metal: Metal;
  event: string;
  /** Short name that runs around the medal's rim. */
  short: string;
  host?: string;
  level?: "International" | "National";
  when: string;
  /** Month number in 2026. Absent when the source gives only the year. */
  month?: number;
  of?: string;
  note: string;
  tags: string[];
  slug: string;
};

export const results: Result[] = [
  {
    mark: "1", suffix: "st", label: "Place", metal: "gold", event: "FIK FAIR 2026 Data Science", short: "FIK FAIR", host: "UPN Veteran Jakarta",
    level: "National", when: "Nov 2026", month: 11, slug: "echo",
    note: "ECHO combined TabICLv2 and TabPFN-3.5 with row-order residual correction, cutting CV RMSE from 7.23 to 3.02.",
    tags: ["TabICL", "TabPFN", "Regression"],
  },
  {
    mark: "1", suffix: "st", label: "Overall", metal: "gold", event: "INFEST XII 2026 Data Science", short: "INFEST XII",
    level: "National", when: "Oct 2026", month: 10, slug: "scribe",
    note: "SCRIBE routes manuscript pages and lines to two DINOv3 experts to read seven Indonesian scripts. Best private macro F1 was 0.953.",
    tags: ["DINOv3", "Computer vision", "Routing"],
  },
  {
    mark: "1", suffix: "st", label: "Place", metal: "gold", event: "BDC Statistics Explore 2026", short: "BDC STATISTICS EXPLORE",
    level: "National", when: "Sep 2026", month: 9, slug: "grit",
    note: "GRIT fine-tuned DINOv3 ViT-7B on 17,482 disaster photos with leak-free folds and ranked #1 on the private leaderboard.",
    tags: ["ViT-7B", "Ordinal head", "Group CV"],
  },
  {
    mark: "2", suffix: "nd", label: "Place", metal: "silver", event: "DATASCAPE 2026 Data Mining", short: "DATASCAPE", host: "HIMA Data Science, Telkom University",
    level: "National", when: "2026", slug: "resi",
    note: "RESI cleaned noisy labels with confident learning before DINOv3 ViT-7B graded package condition. Private macro F1 was 0.927.",
    tags: ["Confident learning", "ViT-7B", "Focal loss"],
  },
  {
    mark: "3", suffix: "rd", label: "Place", metal: "bronze", event: "PRS ITS 2026 Data Analysis Competition", short: "PRS ITS", host: "HIMASTA ITS",
    level: "International", when: "Oct 2026", month: 10, slug: "retain",
    note: "RETAIN, a gradient-boosting ensemble, caught 92% of life-insurance churners on holdout at a ROC AUC of 0.991.",
    tags: ["Gradient boosting", "Churn", "SHAP"],
  },
  {
    mark: "4", suffix: "th", label: "Honorable", metal: "steel", event: "HOLOGY 9.0 HoloMine", short: "HOLOGY 9.0", host: "Universitas Brawijaya",
    level: "National", when: "Oct 2026", month: 10, slug: "atlas",
    note: "Mammograms, property prices, then ATLAS for paddy-field segmentation, each on leak-free patient or spatial folds. 1st Honorable Mention.",
    tags: ["Segmentation", "DINOv3 SAT", "Medical imaging"],
  },
  {
    mark: "5", suffix: "th", label: "Place", metal: "steel", event: "IFEST 2026 Data Analytics Competition", short: "IFEST", host: "HIMATIF Universitas Padjadjaran",
    level: "National", when: "Oct 2026", month: 10, of: "88 teams", slug: "galon",
    note: "GALON forecasts next-month water stress for US sub-basins from deliberately corrupted data. Private average precision was 0.768.",
    tags: ["Forecasting", "Optuna", "Data repair"],
  },
  {
    mark: "7", suffix: "th", label: "Place", metal: "steel", event: "RASIO 10.0 Data Science Competition", short: "RASIO 10.0", host: "Statistics Day 2026, Universitas Padjadjaran",
    level: "International", when: "Oct 2026", month: 10, slug: "harvest",
    note: "HARVEST forecasts food-system resilience for 358 regions with causal features, 18% below the persistence baseline.",
    tags: ["CatBoost", "Spatio-temporal", "Forecasting"],
  },
  {
    mark: "13", suffix: "th", label: "Place", metal: "steel", event: "Find IT! 2026 Data Analytics Competition", short: "FIND IT!", host: "KMTETI, Universitas Gadjah Mada",
    level: "National", when: "May 2026", month: 5, of: "339 teams", slug: "face-anti-spoofing",
    note: "DINOv2 and ConvNeXtV2 streams with gated fusion separate real faces from five attack types. Private score was 0.982.",
    tags: ["DINOv2", "ConvNeXtV2", "Biometrics"],
  },
  {
    mark: "24", suffix: "th", label: "Place", metal: "steel", event: "BDC Satria Data 2026", short: "SATRIA DATA",
    when: "2026", of: "544 teams", slug: "waste-classification",
    note: "A frozen DINOv3 ViT-7B with a class-token and mean-patch readout sorted waste photos at a macro F1 of 0.9989.",
    tags: ["ViT-7B", "Linear probe"],
  },
  {
    mark: "Semi", label: "Finalist", metal: "steel", event: "Datathon 2026", short: "DATATHON", host: "RISTEK Fasilkom UI",
    when: "Aug 2026", month: 8, slug: "tunas",
    note: "TUNAS estimates toddler length from photos and ranks growth risk with SHAP reasons, alongside two machine-learning tracks.",
    tags: ["LightGBM", "SHAP", "Computer vision"],
  },
  {
    mark: "Grand", label: "Finalist", metal: "steel", event: "AutoPilot Asia Hackathon 2026", short: "AUTOPILOT ASIA", host: "Supervity, finals in Kuala Lumpur",
    level: "International", when: "Aug 2026", month: 8, slug: "hr-command-center",
    note: "A governed multi-agent HR command center that follows each new hire through the first 90 days, built by a team of two.",
    tags: ["Multi-agent", "Human in the loop"],
  },
  {
    mark: "Best", label: "Case team", metal: "gold", event: "COMPFEST 18 Academy", short: "COMPFEST 18 ACADEMY", host: "Universitas Indonesia",
    when: "Sep 2026", month: 9, slug: "awas-api",
    note: "Best Case Study Team with Awas Api, an AI early-warning platform that predicts hotspot surges a day ahead.",
    tags: ["Early warning", "Bootcamp"],
  },
];

/** The five finishes the opening flashes through, best first. */
export const podiums = [
  { mark: "1st", event: "INFEST XII", image: "/photo/infest.webp" },
  { mark: "1st", event: "BDC Statistics Explore", image: "/photo/big-data.webp" },
  { mark: "1st", event: "FIK FAIR", image: "/projects/echo-720.webp" },
  { mark: "2nd", event: "DATASCAPE", image: "/photo/datascape.webp" },
  { mark: "3rd", event: "PRS ITS", image: "/photo/dac-prs-its.webp" },
];

/* ---------- About ---------- */

export const intro = {
  headline: "Riantama Putra, building models that hold up.",
  text: "Information Systems and Technology at Institut Teknologi Bandung, and AI Laboratory Assistant at STEI ITB. I work from the first data audit to the API someone calls.",
  stats: [
    { value: "3", label: "First places in data science competitions, 2026" },
    { value: "5", label: "Podium finishes, national and international" },
  ],
  currently: {
    headline: "Open to internships and collaborations.",
    text: "Focus areas: machine learning, computer vision, data science and the software around them.",
  },
};

/** Home manifesto. A photo sits inline after the words that carry one. */
export const manifesto: { text: string; image?: string }[] = [
  { text: "I trust a score only after I have tried to break it." },
  { text: "I hunt for the leak, the copy and the wrong label,", image: "/photo/hology.webp" },
  { text: "then train the strongest model the data deserves" },
  { text: "and put it behind an API that has tests.", image: "/photo/autopilot.webp" },
];

export const story = [
  "I study Information Systems and Technology at ITB, class of 2028, and work at the AI Laboratory of STEI ITB, where I assist four courses from computational logic to machine learning. Outside of that, you will usually find me with a dataset that is lying a little.",
  "I like finding out how it lies. I have caught photo sets where a random split would leak 45% of validation, a training file quietly sorted by its own target, packages with two labels for the same bytes, and satellite tiles that overlapped their way into perfect scores. Once validation is honest, I bring in the big backbones, DINOv3, TabPFN and TabICL, or plain gradient boosting when that wins.",
  "The other half of me is a software engineer. I lead the backend of AIAA ITB's internal ERP, built credentials you can verify on a chain, and ran an air-quality API from a 256 MB set-top box. Three first places in 2026 are nice. A model someone can actually call is nicer.",
];

export const principles = [
  {
    word: "Leak-free",
    text: "Folds follow the way the data was made: by patient, customer, scene, tile or year. If a random split looks brilliant, I assume it is cheating and go looking for how.",
    avoids: "Leakage",
  },
  {
    word: "Measured",
    text: "Every change earns its place against a baseline, out of fold, with the metric the problem cares about. Negative results get written down too.",
    avoids: "Wishful scores",
  },
  {
    word: "Shipped",
    text: "A notebook is half the job. The model gets an API, tests, CI and a deploy, and someone who is not me can use it without asking.",
    avoids: "Dead notebooks",
  },
];

export const now = [
  { title: "Teaching", text: "Assisting four AI and machine-learning courses at STEI ITB, from writing the practicum to grading the exam." },
  { title: "Building", text: "Leading a three-person backend team on AIAA ITB's internal ERP, and shipping ProofSkill." },
  { title: "Competing", text: "Data science competitions with DINOv3, tabular foundation models and very suspicious validation." },
];

/* ---------- Experience ---------- */

export type Role = {
  role: string;
  org: string;
  when: string;
  place?: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    role: "AI Laboratory Assistant",
    org: "Artificial Intelligence Laboratory, STEI ITB",
    when: "Aug 2026 to now",
    place: "Bandung",
    points: [
      "Assist four courses: Computational Logic, Fundamentals of AI, Artificial Intelligence and Machine Learning.",
      "Write assignment and practicum specifications, proctor practicums, quizzes and exams, and run Q&A sessions.",
      "Joined through a three-stage selection: Prolog, ML from scratch in NumPy, and multimodal classification.",
    ],
    tags: ["Machine learning", "Teaching", "Prolog", "NumPy"],
  },
  {
    role: "Backend Lead",
    org: "AIAA ITB, internal ERP",
    when: "Sep 2026 to now",
    place: "Bandung, volunteer",
    points: [
      "Lead a three-person team on the NestJS and PostgreSQL API, seven modules and its role-based access control.",
      "Covered the API with 175+ unit and end-to-end tests and GitHub Actions CI, deployed on Vercel and Neon.",
    ],
    tags: ["NestJS", "PostgreSQL", "RBAC", "CI/CD"],
  },
  {
    role: "Data Science Mentee",
    org: "COMPFEST 18 Academy, Universitas Indonesia",
    when: "Jul to Sep 2026",
    place: "Indonesia, selective bootcamp",
    points: [
      "Selected from 4,400+ applicants by solving a soil organic content regression case with a tree ensemble.",
      "Won Best Case Study Team with Awas Api, an AI early-warning platform predicting next-day hotspot surges.",
    ],
    tags: ["Data science", "Gradient boosting", "Case study"],
  },
  {
    role: "Backend Developer",
    org: "Wisuda April ITB 2025",
    when: "Feb to Apr 2025",
    place: "Volunteer",
    points: ["Built the backend for Menfess, the anonymous messaging feature of the graduation platform."],
    tags: ["Next.js", "TypeScript", "Prisma"],
  },
  {
    role: "IT Intern, Operations",
    org: "Pendidikan Tingkat Dasar, KSEP ITB",
    when: "Dec 2024",
    points: ["Supported the technical systems and digital workflows behind the program's events."],
    tags: ["Operations", "IT support"],
  },
];

export const education = {
  degree: "B.Sc. Information Systems and Technology",
  school: "Institut Teknologi Bandung",
  when: "Sep 2024 to Aug 2028, expected",
  gpa: "3.34 / 4.00",
};

export const certifications = [{ title: "SummerCamp Machine Learning 2026", issuer: "Codelab Indonesia", when: "Aug 2026" }];

/** From LinkedIn, Nov 2026. */
export const organizations = [
  { role: "Head of Sponsorship", org: "Arkavidia 11.0", when: "2026" },
  { role: "Field Staff", org: "Wisuda April HMIF 2026", when: "2026" },
  { role: "People Development Intern", org: "HMIF ITB", when: "2025 to 2026" },
  { role: "Mentor", org: "OSKM ITB 2025", when: "2025" },
  { role: "Head of Creative", org: "Aksi Angkatan SPARTA HMIF ITB 2025", when: "2025" },
  { role: "Liaison Officer", org: "Wisuda Oktober HMIF 2025", when: "2025" },
  { role: "Head of Documentation", org: "STEI TPB Cup 2024", when: "2024 to 2025" },
  { role: "Videographer", org: "Aku Masuk ITB 2025", when: "2024 to 2025" },
  { role: "Photographer and Documentation Staff", org: "STEI-K ITB 2024", when: "2024 to 2025" },
  { role: "Head of Public Relations", org: "Formatur Committee STEI-K ITB 2024", when: "2024" },
];

/** The path so far, oldest first. */
export const journey = [
  { tick: "Sep 2024", title: "Into ITB", text: "Started Information Systems and Technology at Institut Teknologi Bandung." },
  { tick: "Dec 2024", title: "First IT role", text: "Interned in operations at KSEP ITB, keeping a training program's systems running." },
  { tick: "Feb 2025", title: "First backend", text: "Built the anonymous messaging backend for ITB's April graduation." },
  { tick: "May 2026", title: "Into competitions", text: "A dual-stream anti-spoofing model placed 13th of 339 teams at Find IT!" },
  { tick: "Jul 2026", title: "One of 4,400+", text: "Selected for COMPFEST 18 Academy, and later left with Best Case Study Team." },
  { tick: "Aug 2026", title: "The AI Lab", text: "Became a lab assistant at STEI ITB and reached a hackathon grand final in Kuala Lumpur." },
  { tick: "Sep 2026", title: "First first place", text: "GRIT took #1 on the private leaderboard at BDC Statistics Explore." },
  { tick: "Now", title: "Three firsts", text: "Five podiums in one year, a backend team to lead, and open to internships." },
];

/* ---------- Skills ---------- */

export const skills = [
  { group: "Machine Learning", items: ["PyTorch", "scikit-learn", "LightGBM", "XGBoost", "CatBoost", "TabPFN", "TabICL", "Optuna", "SHAP"] },
  { group: "Computer Vision", items: ["DINOv2", "DINOv3", "Vision Transformers", "ConvNeXtV2", "SigLIP2", "EVA02", "Segmentation", "Image classification"] },
  { group: "AI Engineering", items: ["Hugging Face Transformers", "Gemini API", "Claude API", "Embeddings", "LLM-as-judge", "Multi-agent workflows", "OCR"] },
  { group: "Data Science", items: ["pandas", "NumPy", "Matplotlib", "Group and temporal CV", "Leakage audits", "Calibration", "Kaggle GPU notebooks"] },
  { group: "Backend", items: ["FastAPI", "NestJS", "REST APIs", "RBAC", "Better Auth", "Solidity"] },
  { group: "Databases", items: ["PostgreSQL", "SQLite", "Supabase", "Prisma", "Drizzle ORM", "Neon"] },
  { group: "Frontend & Mobile", items: ["Next.js", "React", "React Native", "Tailwind CSS", "JavaFX"] },
  { group: "MLOps & DevOps", items: ["Docker", "GitHub Actions", "Linux", "Vercel", "Nginx", "Cloudflare Tunnel", "Git"] },
  { group: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "C"] },
];

/** The marquee. Each icon is /icons/{icon}.svg (Simple Icons, CC0). */
export const tools: { name: string; icon?: string }[] = [
  { name: "Python", icon: "python" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "Hugging Face", icon: "huggingface" },
  { name: "scikit-learn", icon: "scikitlearn" },
  { name: "pandas", icon: "pandas" },
  { name: "Kaggle" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "NestJS", icon: "nestjs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Docker", icon: "docker" },
  { name: "GitHub Actions", icon: "githubactions" },
  { name: "Solidity", icon: "solidity" },
];

/* ---------- Photos ---------- */

export const portrait = {
  src: "/photo/riantama.webp",
  small: "/photo/riantama-600.webp",
  alt: "Riantama Putra sitting with arms crossed in front of the Petronas Twin Towers at night.",
};

export const moments = [
  { src: "/photo/infest.webp", label: "1st place, INFEST XII 2026", alt: "Riantama and two teammates at ITB, one holding a tablet that shows the INFEST XII first-place result." },
  { src: "/photo/dac-prs-its.webp", label: "3rd place, PRS ITS 2026", alt: "Riantama and a teammate on stage holding the third-place trophy and a Master of Data Analysis III cheque." },
  { src: "/photo/autopilot.webp", label: "Grand final, AutoPilot Asia in Kuala Lumpur", alt: "Riantama and a teammate holding certificates at the AutoPilot Asia Hackathon ceremony in Kuala Lumpur." },
  { src: "/photo/hology.webp", label: "Honorable Mention, HOLOGY 9.0", alt: "Three team members in green jackets on stage with a HOLOGY 9.0 certificate and trophy." },
  { src: "/photo/compfest.webp", label: "Best Case Study Team, COMPFEST 18 Academy", alt: "Group photo of the COMPFEST 18 Academy cohort at graduation night." },
];
