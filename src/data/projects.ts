export type ProjectCategory = 'AI / GenAI' | 'Full Stack' | 'Developer Tools' | 'Web Development'

export type Project = {
  id: string
  index: string
  name: string
  subtitle: string
  category: ProjectCategory
  summary: string
  problem: string
  solution: string
  contributions: string[]
  stack: string[]
  facts: { value: string; label: string }[]
  github?: string
  live?: string
  note?: string
  featured?: boolean
  accent: 'lime' | 'blue' | 'orange' | 'violet' | 'green'
}

export const projects: Project[] = [
  {
    id: 'swiggy-rag', index: '01', name: 'Swiggy RAG System', subtitle: 'Answers grounded in a real annual report', category: 'AI / GenAI',
    summary: 'A document-grounded assistant for the Swiggy FY 2023–24 annual report, combining semantic retrieval with deterministic financial lookups.',
    problem: 'Annual reports are dense and slow to search. A generic language model can also invent figures when a question asks for a precise financial metric.',
    solution: 'A hybrid answer engine routes structured financial questions to extracted data and narrative questions through a retrieval-augmented generation pipeline. Unsupported queries are filtered instead of being answered with guesswork.',
    contributions: ['Designed an ingestion flow that chunks report content and preserves page-level context.', 'Embedded chunks with all-mpnet-base-v2 and indexed them using FAISS for semantic retrieval.', 'Combined top-k retrieval with structured JSON for 8 financial metrics and a local FLAN-T5 model.', 'Displayed source previews, similarity/confidence information, and page references; included refusal logic for unsupported questions.'],
    stack: ['Python', 'LangChain', 'FAISS', 'MPNet embeddings', 'FLAN-T5', 'Streamlit'],
    facts: [{ value: '160+', label: 'document chunks' }, { value: 'Top 5', label: 'retrieved chunks' }, { value: '9/9', label: 'README benchmark cases' }],
    github: 'https://github.com/harshgsharma1501/swiggy-rag-qa', note: 'The 9/9 evaluation result is reported in the repository README. It should be read as the project’s listed benchmark result, not as a universal accuracy guarantee.', featured: true, accent: 'lime',
  },
  {
    id: 'zostel', index: '02', name: 'Zostel Hostel MIS', subtitle: 'A system for the work behind the rooms', category: 'Full Stack',
    summary: 'A hostel operations platform spanning student records, room allocation, fee tracking, maintenance workflows, notifications, and analytics.',
    problem: 'Hostel administration involves separate day-to-day workflows that are difficult to coordinate when student, room, payment, and maintenance data live in disconnected places.',
    solution: 'A React client communicates with Express REST APIs and a SQLite database. Role-aware authentication separates workflows for five roles, while dashboards summarize operations.',
    contributions: ['Built across 10 functional modules and a 12-table relational schema.', 'Implemented JWT authentication, bcrypt password hashing, and role-based access control.', 'Designed room allocation, student CRUD, fee tracking, maintenance requests, notifications, and reporting flows.', 'Used indexes and seeded data to support SQL analytics and dashboard views.'],
    stack: ['React', 'Node.js', 'Express', 'SQLite', 'JWT', 'bcrypt', 'Chart.js'],
    facts: [{ value: '33', label: 'REST endpoints' }, { value: '10', label: 'functional modules' }, { value: '5', label: 'roles supported' }],
    github: 'https://github.com/harshgsharma1501/Zostel', note: 'Repository documentation says payment gateway and SMS/email integrations are simulated in this prototype. The README reports 8 dashboard views and 9 indexes; the resume reports sub-16 ms average API responses on seeded data.', featured: true, accent: 'blue',
  },
  {
    id: 'jobtrack', index: '03', name: 'JobTrack', subtitle: 'Capture the opportunity before the tab disappears', category: 'Developer Tools',
    summary: 'A local-first Manifest V3 Chrome extension that detects job postings on career pages and saves them into a personal tracker.',
    problem: 'Tracking applications means repeatedly copying details from different company sites into a separate spreadsheet or tracker.',
    solution: 'Content scripts inspect multiple signals on the page, detect relevant job data, and surface an editable capture card. Saved records are managed locally in a searchable dashboard.',
    contributions: ['Extracted signals from URLs, JobPosting JSON-LD, headings, metadata, descriptions, and common recruiting platforms.', 'Added SPA support using DOM observation and History API URL-change detection.', 'Built editable application fields, duplicate protection, search, filters, sorting, and list/Kanban views.', 'Kept application records in chrome.storage.local rather than a custom backend.'],
    stack: ['JavaScript', 'Chrome Extension APIs', 'Manifest V3', 'HTML', 'CSS'],
    facts: [{ value: 'Local-first', label: 'application data' }, { value: 'SPA-aware', label: 'page detection' }, { value: 'List + board', label: 'tracker views' }],
    github: 'https://github.com/harshgsharma1501/JobTrack', note: 'The README notes that some authenticated or iframe-based recruiting pages hide data; in those cases the extension avoids inventing fields and allows manual editing.', featured: true, accent: 'orange',
  },
  {
    id: 'quizzzy', index: '04', name: 'Quizzzy', subtitle: 'A JEE / NEET test preparation platform', category: 'Full Stack',
    summary: 'An interactive test platform with quiz sessions, performance analytics, bookmarks, test history, a calendar, and admin tools.',
    problem: 'Exam preparation works better when students can practice in a realistic interface and review where their time and marks went.',
    solution: 'A MERN-stack application supports timed test sessions, answer review, subject-wise insights, and administrative question/test management.',
    contributions: ['Implemented question status states for attempted, unattempted, and marked-for-review questions.', 'Built test history, answer keys, bookmarks, and performance analysis views.', 'Supported admin workflows for question uploads, test creation, and result review.', 'Used the repository README to document setup and environment requirements for the frontend and backend.'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'JWT'],
    facts: [{ value: 'MERN', label: 'application stack' }, { value: 'Timed', label: 'test interface' }, { value: 'Analytics', label: 'performance review' }],
    github: 'https://github.com/harshgsharma1501/Quizzzy', note: 'The repository requires separate frontend/backend setup and environment configuration for services. This portfolio does not claim that a live public demo is currently available.', accent: 'violet',
  },
  {
    id: 'ashley', index: '05', name: 'Ashley Global Exim', subtitle: 'Client-facing website, shipped end to end', category: 'Web Development',
    summary: 'A responsive six-page business website delivered during a Software Engineering Internship, including deployment and client feedback iterations.',
    problem: 'A business website needs to communicate products and services clearly across devices while making inquiries simple for prospective customers.',
    solution: 'Built a responsive React/Vite website with reusable components, optimized media, and EmailJS contact handling, then managed hosting and domain configuration.',
    contributions: ['Developed a six-page responsive SPA with 18 reusable components.', 'Integrated EmailJS to process contact inquiries without a custom backend.', 'Managed Hostinger deployment, custom domain, and DNS setup.', 'Applied four rounds of UI/UX revisions from client feedback across 50+ commits.'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'EmailJS', 'Cloudinary', 'Hostinger'],
    facts: [{ value: '94', label: 'Lighthouse performance score reported' }, { value: '<2 s', label: 'mobile LCP reported' }, { value: '25+', label: 'leads in first 2 months reported' }],
    live: 'https://ashleyglobalexim.com/', note: 'Performance and lead figures are reported in the resume; no independent measurement report is included in this package.', accent: 'green',
  },
]
