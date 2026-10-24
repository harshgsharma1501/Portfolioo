export const profile = {
  name: 'Harsh Sharma',
  shortName: 'Harsh',
  role: 'Computer Engineering · VJTI Mumbai',
  location: 'Mumbai, India',
  graduation: 'June 2027',
  email: 'harshgsharma1501@gmail.com',
  linkedin: 'https://linkedin.com/in/harsh-sharma-003859280',
  github: 'https://github.com/harshgsharma1501',
  leetcode: 'https://leetcode.com/u/debugmylife/',
  codeforces: 'https://codeforces.com/profile/harshsharma1501?utm=codolio',
  codolio: 'https://codolio.com/profile/hugsandbugs',
  headline: 'Thoughtful software. Useful by design.',
  intro:
    'I build full-stack products, document-grounded AI systems, and developer tools. I care about the engineering underneath the interface as much as the experience people see.',
  about:
    'I’m a Computer Engineering student at VJTI Mumbai, graduating in 2027. My work sits at the intersection of full-stack development, practical AI/GenAI, and problem solving. I like taking messy workflows, understanding what actually matters, and turning them into software that is easier to use and maintain.',
  emailSubject: 'Hello Harsh — connecting about your work',
} as const

export const skills = [
  { title: 'Programming', items: ['C++', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'], icon: 'code' },
  { title: 'Core computer science', items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'], icon: 'core' },
  { title: 'Frontend', items: ['React.js', 'Vite', 'Tailwind CSS', 'Responsive UI', 'Streamlit'], icon: 'frontend' },
  { title: 'Backend & APIs', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'EmailJS'], icon: 'backend' },
  { title: 'Databases', items: ['MongoDB', 'MySQL', 'SQLite'], icon: 'database' },
  { title: 'AI / ML & tools', items: ['RAG', 'LangChain', 'Prompt Engineering', 'Git', 'GitHub', 'Linux', 'VS Code'], icon: 'ai' },
] as const

export const education = [
  {
    period: 'Sep 2023 — Jun 2027',
    school: 'Veermata Jijabai Technological Institute',
    degree: 'B.Tech · Computer Engineering',
    detail: 'Mumbai, Maharashtra',
    current: true,
  },
  {
    period: 'Jun 2021 — Mar 2023',
    school: 'A.K. National High School, Khamgaon',
    degree: 'HSC · Science',
    detail: 'HSC: 79.50% · SSC: 97.60%',
    current: false,
  },
] as const

export const achievements = [
  {
    number: '01',
    title: '1st place · SuperNova’23',
    body: 'Won the E-Cell VJTI innovation and entrepreneurship challenge among 20+ teams; awarded ₹20,000.',
    tag: 'Innovation',
  },
  {
    number: '02',
    title: '1,000+ DSA problems',
    body: 'Competitive programming and algorithm practice across multiple coding platforms, as reported in the resume.',
    tag: 'Problem solving',
  },
  {
    number: '03',
    title: 'JEE Main · 98.35 percentile',
    body: 'Qualified JEE Advanced in 2023; the LinkedIn profile lists a JEE Advanced score of 79/360.',
    tag: 'Academics',
  },
  {
    number: '04',
    title: 'MHT-CET · 99.72 percentile',
    body: 'Scored in the top 0.28% by percentile in the 2023 examination, as reported in the resume.',
    tag: 'Academics',
  },
  {
    number: '05',
    title: 'Chess · district-level representation',
    body: 'Represented school at district level for three consecutive years and ranked in the top three at the sub-district championship (2017–2019).',
    tag: 'Chess',
  },
] as const

export const leadership = [
  {
    period: 'Oct 2024 — May 2026',
    organization: 'Technovanza, VJTI',
    role: 'Sponsorship Executive Head (2024–25) → Marketing Head (2025–26)',
    detail: 'Led event outreach and marketing initiatives, coordinated across teams, and worked to expand festival visibility and student engagement.',
  },
  {
    period: 'Oct 2023 — May 2024',
    organization: 'Enthusia, VJTI',
    role: 'Event Head · Chess',
    detail: 'Managed registrations, player fixtures, on-ground coordination, and prize distribution for the chess event.',
  },
] as const
