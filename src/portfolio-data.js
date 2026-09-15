import {
  ArrowRight,
  Barbell,
  Brain,
  Briefcase,
  Buildings,
  ChartLineUp,
  CheckCircle,
  Code,
  Database,
  Dog,
  FileText,
  GithubLogo,
  LinkedinLogo,
  List,
  MagnifyingGlass,
  PersonSimpleSwim,
  ShieldCheck,
  TennisBall,
  X,
} from "@phosphor-icons/react";
export const projects = [
  {
    id: "vaccine-modeling",
    eyebrow: "PREDICT → INFER",
    title: "Multi-Vaccine Clinical Modeling & Statistical Inference",
    summary:
      "An active, multi-stage analysis program that predicts post-immunization response levels and examines how they relate to other clinical outcomes.",
    tags: ["LASSO · RF · XGBoost", "ANCOVA · SEM · Bayesian", "Active analysis"],
    maturity: "Active · iterative modeling",
    icon: ChartLineUp,
    role: "Primary Analyst",
    question:
      "Which baseline and study variables help predict post-immunization response, and how should relationships with other outcomes be estimated without confusing prediction with inference?",
    method:
      "Stage-gated exploratory analysis followed by LASSO, regression, random forest, and gradient-boosted trees for prediction; ANCOVA, structural equation modeling, and Bayesian models for statistical inference.",
    ownership:
      "I lead exploratory analysis, outcome and feature framing, model implementation, diagnostic review, and synthesis of findings across successive vaccine datasets.",
    collaboration:
      "A programming lead coordinates experiment execution, statistical leadership sets milestones, and a statistician independently checks test outputs with me.",
    validation:
      "Predictive performance, calibration, assumptions, sensitivity analyses, and agreement across modeling approaches are reviewed separately. Results remain qualified until professional review is complete.",
    value:
      "Connects practical prediction with interpretable inference so that model performance and scientific meaning are evaluated as different, complementary questions.",
  },
  {
    id: "cross-regulatory-safety",
    eyebrow: "HARMONIZE → EXPLORE",
    title: "Cross-Regulatory Post-Market Safety Data Foundation",
    summary:
      "A harmonized adverse-event data foundation spanning VAERS, CVAR, JADER and EudraVigilance, built for reproducible descriptive analysis and future signal-review work.",
    tags: ["FDA · EMA · PMDA · Health Canada", "RWD engineering", "Descriptive analysis"],
    maturity: "Active · database & analysis",
    icon: Database,
    role: "Primary Data Developer & Analyst",
    question:
      "How can heterogeneous spontaneous-reporting systems be aligned to compare reporting patterns and prepare data for further safety analysis?",
    method:
      "Full-source ingestion, shared field definitions, terminology and product mappings, provenance tracking, reproducible transformations, quality checks and cross-source descriptive views.",
    ownership:
      "I designed and built the database, harmonization workflow, analytical layer and visualization structure, and maintain the data foundation for ongoing analytical work.",
    collaboration:
      "PV risk leadership aligns the analytical output and signal-review dimensions; the QPPV reviews visualization standards, data dimensions, and product-level framing.",
    validation:
      "Source counts, field completeness, duplicate logic, terminology mappings, time consistency, and reproducible outputs are checked by market. Reporting patterns are not presented as incidence or causal effects.",
    value:
      "Creates a common analytical foundation for cross-market pharmacovigilance while keeping source limitations and expert signal assessment visible.",
  },
  {
    id: "meddra-operations",
    eyebrow: "RETRIEVE → REVIEW",
    title: "Multilingual MedDRA Coding Assistance & PV Operations Data",
    summary:
      "A trilingual English–Chinese–Japanese assistance layer that ranks likely MedDRA PT and LLT candidates from physician narratives and supports aligned PV data workflows.",
    tags: ["MedDRA PT / LLT", "Vector retrieval", "EN · 中文 · 日本語"],
    maturity: "Active · co-development",
    icon: Code,
    role: "Co-developer with Programming Lead",
    question:
      "How can multilingual medical narratives be converted into fast, reviewable terminology candidates without replacing qualified coding judgment?",
    method:
      "Language-aware text processing, semantic vector retrieval, ranked PT and LLT candidates, side-by-side terminology comparison, and bilingual web-function translation and alignment.",
    ownership:
      "I co-develop the retrieval logic, terminology comparison workflow, PV operations data handling, and the multilingual web experience.",
    collaboration:
      "The programming lead and I develop the system together; qualified reviewers retain final confirmation of every coding decision.",
    validation:
      "Candidate rankings are evaluated against reviewer-confirmed examples, with source text and alternatives kept visible. The tool assists selection; it does not autonomously assign regulated codes.",
    value:
      "Reduces repetitive terminology search while preserving traceability, multilingual context, and human accountability.",
  },
  {
    id: "international-gvp",
    eyebrow: "SOURCE → MAP",
    title: "International GVP Regulatory Intelligence & Requirement Mapping",
    summary:
      "Independent, source-grounded analysis that maps ICH, regional, and national pharmacovigilance requirements into traceable operational interpretations.",
    tags: ["ICH & regional frameworks", "Requirement mapping", "Source traceability"],
    maturity: "Active · independent analysis",
    icon: FileText,
    role: "Independent Regulatory Intelligence Analyst",
    question:
      "How can changing GVP expectations across Asia, Europe, the Middle East, Africa, and Latin America be compared without losing source context or jurisdictional differences?",
    method:
      "Primary-source retrieval, versioned evidence records, requirement decomposition, jurisdictional comparison, trigger mapping, and bilingual interpretation for operational use.",
    ownership:
      "I independently conduct the regulatory research, source assessment, requirement mapping, comparative analysis, and written interpretation.",
    collaboration:
      "High-impact interpretations are escalated to the relevant medical, legal, quality, or local-market professionals before operational adoption.",
    validation:
      "Every material interpretation remains linked to its source and effective context. The work supports professional review and does not make autonomous legal or compliance decisions.",
    value:
      "Turns fragmented regulatory reading into a maintainable comparison layer that helps teams identify obligations, differences, and follow-up questions.",
  },
  {
    id: "clinical-sdv",
    eyebrow: "EXTRACT → RECONCILE",
    title: "Clinical SDV Consistency Review System",
    summary:
      "An end-to-end review workflow that converts source documents into traceable fields, applies consistency rules, routes exceptions, and supports reviewer feedback during pilot use.",
    tags: ["OCR & extraction", "Consistency logic", "Human review"],
    maturity: "Pilot · user acceptance testing",
    icon: MagnifyingGlass,
    role: "End-to-End System Developer",
    question:
      "How can source-data verification focus attention on meaningful inconsistencies while preserving direct access to the original record and clinical context?",
    method:
      "Document processing, field extraction, configurable consistency rules, exception routing, a reviewer-facing interface, deployment, and iterative refinement.",
    ownership:
      "I implement the complete workflow—from source-document processing and review logic to the interface, deployment, testing support, and ongoing iteration.",
    collaboration:
      "CRA colleagues define clinical review requirements and business rules; I translate those requirements into the operating system and refine it with their feedback.",
    validation:
      "The system is being tested by business users against review scenarios. Exceptions remain visible for manual assessment, and workflow changes are versioned through feedback cycles.",
    value:
      "Creates a traceable bridge between source documents, consistency checks, and human SDV decisions without presenting automation as clinical judgment.",
  },
];

export const methods = [
  {
    number: "01",
    title: "Latent decision mechanisms",
    text: "Hierarchical Drift Diffusion Models to infer how evidence accumulation, caution, and response processes may differ across people and conditions.",
    tools: "HDDM / HSSM · Hierarchical Bayes",
  },
  {
    number: "02",
    title: "Signals across people and studies",
    text: "Mixed models, longitudinal methods, and multilevel structures for repeated measures, heterogeneous populations, and clustered clinical data.",
    tools: "LMM / GLMM · Longitudinal · SEM",
  },
  {
    number: "03",
    title: "Prediction with accountable limits",
    text: "Machine learning for screening and prioritization, paired with transparent validation, interpretable features, and explicit limits on generalization.",
    tools: "Random Forest · Validation · Explainability",
  },
];

export const experiences = [
  {
    id: "sinovac",
    period: "06/2025 – Present",
    company: "Sinovac Biotech Group Co., Ltd.",
    role: "International Pharmacovigilance Administrator",
    location: "Beijing / Chengdu, China",
    summary:
      "Interpret GVP requirements across international markets; coordinate PVA/SDEA, vendors, audits, and periodic-report support; and contribute to workflow automation and structured data infrastructure for global vaccine safety.",
    path:
      "Made the real constraints behind post-market evidence visible: regulation, accountability, data quality, and cross-market coordination.",
    tags: ["Global safety operations", "GVP quality", "Workflow systems"],
    icon: ShieldCheck,
  },
  {
    id: "miami-brain",
    period: "08/2023 – 05/2025",
    company: "University of Miami · BRAIN Group",
    role: "Graduate Research Assistant",
    location: "Miami, USA",
    summary:
      "Studied anxiety and executive function through behavioral tasks, fMRI, ECG, random forest, linear mixed models, and hierarchical drift diffusion modeling, while supporting data quality and research-assistant training.",
    path:
      "Connected questions about human decision-making to measurable, uncertainty-aware models.",
    tags: ["Computational psychiatry", "fMRI & ECG", "HDDM / HSSM"],
    icon: Brain,
  },
  {
    id: "medchemexpress",
    period: "01/2023 – 08/2023",
    company: "MedChemExpress LLC",
    role: "Operations Associate",
    location: "New Jersey, USA",
    summary:
      "Managed 80+ daily cases for a biomedical research-material supplier, coordinating logistics and trade-compliance solutions among clients, agents, vendors, and researchers.",
    path:
      "Revealed the operational network that enables biomedical research.",
    tags: ["Biomedical research", "Cross-border operations", "Researcher support"],
    icon: Buildings,
  },
  {
    id: "cb-payments",
    period: "10/2022 – 12/2022",
    company: "CB Payments LLC",
    role: "Data Analyst Intern",
    location: "Remote, USA",
    summary:
      "Applied NLP, data capture, and cleaning to prostate-cancer case reports, alongside literature and patent research on medical-language applications.",
    path:
      "Created a direct bridge between computational methods and disease-specific medical data.",
    tags: ["Medical NLP", "Case reports", "Data cleaning"],
    icon: Code,
  },
  {
    id: "hopkins-medtech",
    period: "01/2022 – 09/2022",
    company: "Hopkins MedTech Compliance LLC",
    role: "Clinical Research Associate",
    location: "New Jersey, USA",
    summary:
      "Led a 10-person data-entry team supporting 300+ participant records daily, analyzed COVID-19 test sensitivity and specificity, and supervised FDA-aligned site execution.",
    path:
      "Placed me inside the clinical data-generating process, where protocol execution and data quality are inseparable.",
    tags: ["Clinical research", "Diagnostic data", "FDA-aligned conduct"],
    icon: Briefcase,
  },
  {
    id: "deloitte",
    period: "06/2019 – 08/2019",
    company: "Deloitte Consulting Shanghai",
    role: "Business Analyst Intern",
    location: "Beijing, China",
    summary:
      "Used Excel-based analysis for city-level salary normalization and financial-report review, and supported the design of an international management-trainee program.",
    path:
      "Built an early habit of structuring ambiguous organizational questions for decisions.",
    tags: ["Business analytics", "Excel visualization", "Cross-functional work"],
    icon: ChartLineUp,
  },
];

export const earlierFoundations = [
  {
    id: "bit-research",
    year: "2018",
    title: "Beijing Institute of Technology · Research Assistant",
    detail:
      "Behavioral-science research in data cleaning, SPSS analysis, report development, and study interpretation; later connected to a co-authored multilevel study published in 2019.",
  },
  {
    id: "pea-teaching",
    year: "2018",
    title: "PEA International Summer School · Teaching Assistant",
    detail:
      "Supported international-course delivery, faculty coordination, classroom organization, and student logistics at Beihang University.",
  },
  {
    id: "new-oriental",
    year: "2017",
    title: "New Oriental · Teaching Assistant",
    detail:
      "Supported English learning, student progress tracking, and communication among students, parents, and teachers.",
  },
];

export const interests = [
  {
    id: "tennis",
    eyebrow: "PLAY / ITERATE",
    title: "One Year into Tennis",
    fact: "Since summer 2025 · NTRP 3.0–3.5",
    body:
      "I started learning tennis in summer 2025. About a year in, I am around NTRP 3.0–3.5. There is still a long way to go—and that is part of what keeps me on court.",
    tags: ["Started in 2025", "NTRP 3.0–3.5", "Still learning"],
    icon: TennisBall,
  },
  {
    id: "movement",
    eyebrow: "LEARN / PRACTICE",
    title: "Lifelong Learner",
    fact: "Fitness · Swimming · More to learn",
    body:
      "Fitness and swimming are two things I am learning now, but the list is never meant to be fixed. I like beginning as a novice, practicing patiently, and getting a little better over time.",
    tags: ["Fitness", "Swimming", "Keep learning"],
    icon: PersonSimpleSwim,
    secondaryIcon: Barbell,
  },
  {
    id: "dogs",
    eyebrow: "COMPANIONS / THE JOURNEY",
    title: "Rocky & Chacha",
    fact: "Rocky · Oct 2019 | Chacha · Mar 2022",
    body:
      "Rocky was born in October 2019 and Chacha in March 2022. They moved with me from New Jersey to Miami, then Beijing and Chengdu. Wherever I go next, they will be part of the journey.",
    tags: ["New Jersey → Miami", "Beijing → Chengdu", "The journey continues"],
    icon: Dog,
  },
  {
    id: "ai-coding",
    eyebrow: "BUILD / EXPLORE",
    title: "Building with AI",
    fact: "Small ideas · Working prototypes",
    body:
      "I also like using AI to turn small ideas into working prototypes. The fun is not only in making things faster, but in learning where human judgment still matters.",
    tags: ["AI-assisted coding", "Small prototypes", "Human judgment"],
    icon: Code,
  },
];
