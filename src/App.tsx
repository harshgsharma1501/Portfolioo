import { useEffect, useMemo, useState } from 'react'
import type { AriaRole, ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, BrainCircuit,
  BriefcaseBusiness, Check, Code2, Copy, Cpu, Database,
  Download, ExternalLink, Github, GraduationCap, Layers3,
  Linkedin, Mail, Menu, Moon, PanelsTopLeft, Sparkles, Sun, Terminal,
  Trophy, Workflow, X, Zap,
} from 'lucide-react'
import { ProjectArtwork } from './components/ProjectArtwork'
import { achievements, education, leadership, profile, skills } from './data/profile'
import { projects, type Project, type ProjectCategory } from './data/projects'
import { codingProfiles } from './data/codingProfiles'
import { certifications } from './data/certifications'

type Theme = 'light' | 'dark'
type IconComponent = typeof Code2

const navItems = [
  // Keep header navigation in the same order as the page sections below.
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Stack', id: 'stack' },
  { label: 'Journey', id: 'journey' },
]
const filters: ('All work' | ProjectCategory)[] = ['All work', 'AI / GenAI', 'Full Stack', 'Developer Tools', 'Web Development']

const skillIcons: Record<string, IconComponent> = {
  code: Code2,
  core: Cpu,
  frontend: PanelsTopLeft,
  backend: Workflow,
  database: Database,
  ai: BrainCircuit,
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><i />{children}</div>
}

/** A restrained scroll reveal used for major content groups. It respects reduced-motion preferences. */
function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  role,
  'aria-label': ariaLabel,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  role?: AriaRole
  'aria-label'?: string
}) {
  const reduceMotion = useReducedMotion()
  const offset = direction === 'left' ? { x: 18, y: 0 } : direction === 'right' ? { x: -18, y: 0 } : { x: 0, y: 18 }

  return (
    <motion.div
      className={className}
      role={role}
      aria-label={ariaLabel}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ExternalLinkIcon() {
  return <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
}

function ProjectCard({ project, onOpen, position }: { project: Project; onOpen: (p: Project) => void; position: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.article
      className={`project-card project-${project.id}`}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.42, delay: (position % 2) * 0.05 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <button className="project-card-open" onClick={() => onOpen(project)} aria-label={`Open ${project.name} project details`}>
        <ProjectArtwork project={project} />
        <div className="project-card-body">
          <div className="project-meta"><span>{project.category}</span><span>PROJECT {project.index}</span></div>
          <div className="project-title-line"><h3>{project.name}</h3><span className="project-arrow"><ArrowUpRight size={19} /></span></div>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-summary">{project.summary}</p>
          <div className="tag-row">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}{project.stack.length > 4 && <span>+{project.stack.length - 4}</span>}</div>
        </div>
      </button>
      <div className="project-card-links">
        <button className="text-link" onClick={() => onOpen(project)}>Case study <ArrowRight size={14} /></button>
        {project.github && <a className="quiet-link" href={project.github} target="_blank" rel="noreferrer">Source <ExternalLinkIcon /></a>}
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div className="modal-backdrop" role="presentation" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.99 }} transition={{ duration: 0.22 }}>
        <div className="modal-header"><div><span className="eyebrow">CASE STUDY · {project.index}</span><h2 id="modal-title">{project.name}</h2><p>{project.subtitle}</p></div><button className="icon-button modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button></div>
        <ProjectArtwork project={project} />
        <div className="modal-content-grid">
          <div className="modal-main-copy">
            <div className="modal-block"><span className="eyebrow">THE PROBLEM</span><p>{project.problem}</p></div>
            <div className="modal-block"><span className="eyebrow">THE APPROACH</span><p>{project.solution}</p></div>
            <div className="modal-block"><span className="eyebrow">CONTRIBUTIONS</span><ul>{project.contributions.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
          </div>
          <aside className="modal-aside">
            <div className="modal-block"><span className="eyebrow">TECH STACK</span><div className="tag-row modal-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            {project.facts.length > 0 && <div className="modal-block"><span className="eyebrow">PROJECT NOTES</span><div className="fact-stack">{project.facts.map((fact) => <div className="fact-line" key={fact.label}><b>{fact.value}</b><span>{fact.label}</span></div>)}</div></div>}
            {project.note && <div className="project-caveat"><Sparkles size={15} /><p>{project.note}</p></div>}
            <div className="modal-links">{project.github && <a href={project.github} className="button button-dark" target="_blank" rel="noreferrer">View source <ExternalLinkIcon /></a>}{project.live && <a href={project.live} className="button button-outline" target="_blank" rel="noreferrer">Visit website <ExternalLinkIcon /></a>}</div>
          </aside>
        </div>
      </motion.section>
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useState<Theme>(() => {
    try { return localStorage.getItem('harsh-theme') === 'dark' ? 'dark' : 'light' } catch { return 'light' }
  })
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All work')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    try { localStorage.setItem('harsh-theme', theme) } catch { /* Local storage is optional. */ }
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#121d19' : '#f5f4ee')
  }, [theme])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sectionElements = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    const visibleSections = new Map<string, IntersectionObserverEntry>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry)
        else visibleSections.delete(entry.target.id)
      })
      const visible = [...visibleSections.values()].sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      setActiveSection(visible?.target.id ?? '')
    }, { rootMargin: '-20% 0px -58% 0px', threshold: [0, 0.12, 0.25, 0.4, 0.65] })
    sectionElements.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const visibleProjects = useMemo(() => activeFilter === 'All work' ? projects : projects.filter((project) => project.category === activeFilter), [activeFilter])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className={`app theme-${theme}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Harsh Sharma home" onClick={closeMenu}><span className="wordmark-box">H<span>.</span></span><span className="wordmark-name">Harsh Sharma<small>ENGINEER · BUILDER</small></span></a>
          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => <a key={item.id} className={activeSection === item.id ? 'nav-active' : ''} aria-current={activeSection === item.id ? 'location' : undefined} href={`#${item.id}`} onClick={closeMenu}>{item.label}</a>)}
            <a className="nav-contact-mobile" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={14} /></a>
          </nav>
          <div className="header-actions">
            <button className="icon-button theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
            <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
            <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid-noise" />
          <div className="hero-main">
            <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className="availability"><span className="availability-dot" /> COMPUTER ENGINEERING · VJTI MUMBAI <span className="availability-line" /> <span className="availability-date">CLASS OF ’27</span></div>
              <h1>Thoughtful<br />software.<br /><em>Useful by design.</em></h1>
              <p className="hero-intro">I build full-stack products, document-grounded AI systems, and developer tools. I care about the engineering underneath the interface as much as the experience people see.</p>
              <div className="hero-actions">
                <a className="button button-lime" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
                <a className="button button-ghost-light" href="/resume.pdf" download="Harsh-Sharma-Resume.pdf"><Download size={16} /> Download resume</a>
              </div>
              <div className="hero-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ExternalLinkIcon /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ExternalLinkIcon /></a><a href={profile.leetcode} target="_blank" rel="noreferrer"><Code2 size={16} /> LeetCode <ExternalLinkIcon /></a></div>
            </motion.div>
            <motion.div className="hero-visual" aria-label="A visual overview of my engineering focus" initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
              <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
              <div className="visual-label visual-label-top"><span>FIG. 01</span><span>BUILD / LEARN / REPEAT</span></div>
              <div className="visual-core"><div className="core-mark">H<span>.</span></div><div className="core-caption">HARSH SHARMA<br /><span>SOFTWARE ENGINEERING</span></div></div>
              <div className="focus-card focus-card-one"><span className="focus-icon icon-lime"><Layers3 size={16} /></span><span><b>Full-stack systems</b><small>Interfaces → APIs → data</small></span><ArrowUpRight size={15} /></div>
              <div className="focus-card focus-card-two"><span className="focus-icon icon-orange"><BrainCircuit size={16} /></span><span><b>Practical AI</b><small>Retrieval · grounding · utility</small></span><ArrowUpRight size={15} /></div>
              <div className="focus-card focus-card-three"><span className="focus-icon icon-blue"><Zap size={16} /></span><span><b>Problem solving</b><small>Algorithms with intent</small></span><ArrowUpRight size={15} /></div>
              <div className="visual-coordinate">19°01′ N<br />72°52′ E</div>
              <div className="visual-side-note">ENGINEERED WITH CURIOSITY, SHIPPED WITH CARE.</div>
            </motion.div>
          </div>
          <div className="hero-bottom"><span>SCROLL TO EXPLORE <ArrowDownRight size={14} /></span><span>INDEPENDENT BUILDER · MUMBAI, INDIA</span><span>© 2026</span></div>
        </section>

        <section className="proof-strip" aria-label="Selected highlights">
          <Reveal className="proof-item" delay={0}><span className="proof-number">01</span><div><b>AI with evidence</b><small>Retrieval, citations, grounded responses</small></div></Reveal>
          <Reveal className="proof-item" delay={0.07}><span className="proof-number">02</span><div><b>End-to-end delivery</b><small>UI, APIs, data, deployment</small></div></Reveal>
          <Reveal className="proof-item" delay={0.14}><span className="proof-number">03</span><div><b>1,000+ DSA problems</b><small>Resume-reported across platforms</small></div></Reveal>
          <Reveal className="proof-more-reveal" delay={0.2}><a href="#work" className="proof-more">Proof lives in the work <ArrowRight size={16} /></a></Reveal>
        </section>

        <section className="section about-section" id="about">
          <Reveal className="section-heading-row"><SectionLabel number="01">A LITTLE CONTEXT</SectionLabel><span className="section-side-note">THE PERSON BEHIND THE PULL REQUESTS</span></Reveal>
          <Reveal className="about-grid" delay={0.06}>
            <h2>I like the part where<br />the <em>mess becomes a model.</em></h2>
            <div className="about-copy"><p className="about-lead">{profile.about}</p><p>That means caring about the UI, but also the schema behind it. Building an AI feature, but also asking what evidence makes its answer trustworthy. Shipping something useful, then checking where it breaks.</p><div className="about-signature"><span className="signature-mark">HS<span>.</span></span><span>Curious by default.<br />Practical on purpose.</span></div></div>
          </Reveal>
          <Reveal className="about-principles" delay={0.12}><div><span>01</span><b>Clarity over cleverness</b><p>Make the hard part understandable and the common path easy.</p></div><div><span>02</span><b>Evidence over assumptions</b><p>Ground the result in what the code and data can actually support.</p></div><div><span>03</span><b>Finish the full loop</b><p>Design, implementation, testing, documentation, and delivery matter together.</p></div></Reveal>
        </section>

        <section className="section work-section" id="work">
          <Reveal className="section-heading-row"><SectionLabel number="02">SELECTED WORK</SectionLabel><span className="section-side-note">A FEW THINGS I’VE BUILT</span></Reveal>
          <Reveal className="work-heading" delay={0.06}><div><h2>Built to solve<br /><em>real problems.</em></h2><p>Not just screenshots. Each project has a reason to exist, a set of decisions behind it, and trade-offs worth explaining.</p></div><div className="work-count"><span>0{visibleProjects.length}</span><small>PROJECTS SHOWN</small></div></Reveal>
          <Reveal className="filter-row" delay={0.12} role="group" aria-label="Filter projects">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter-active' : ''} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}<span>{filter === 'All work' ? projects.length : projects.filter((project) => project.category === filter).length}</span></button>)}</Reveal>
          <div className="projects-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} position={index} />)}</div>
          <Reveal className="more-work" delay={0.1}><span>MORE EXPERIMENTS, SOURCE CODE, AND REPOSITORIES</span><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Browse GitHub <ExternalLinkIcon /></a></Reveal>
        </section>

        <section className="section stack-section" id="stack">
          <Reveal className="section-heading-row"><SectionLabel number="03">TOOLS OF THE TRADE</SectionLabel><span className="section-side-note">PRACTICAL SKILLS, NOT PROGRESS BARS</span></Reveal>
          <Reveal className="stack-header" delay={0.06}><h2>The stack is a<br /><em>means, not the point.</em></h2><p>These are the tools and fundamentals I’ve used in coursework, projects, and practical development. No arbitrary 92% mastery meters. Those measure confidence, not competence.</p></Reveal>
          <div className="skills-grid">{skills.map((group, index) => { const Icon = skillIcons[group.icon]; return <motion.article className="skill-group" key={group.title} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.42, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}><div className="skill-group-head"><span className="skill-icon"><Icon size={18} /></span><span>0{index + 1}</span></div><h3>{group.title}</h3><div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></motion.article> })}</div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section journey-inner">
            <Reveal className="section-heading-row"><SectionLabel number="04">THE JOURNEY SO FAR</SectionLabel><span className="section-side-note">LEARNING, BUILDING, LEADING</span></Reveal>
            <Reveal className="journey-grid" delay={0.08}>
              <div className="journey-column experience-column"><div className="column-title"><BriefcaseBusiness size={20} /><h2>Experience</h2></div><article className="timeline-card"><div className="timeline-period"><span>JUL 2025</span><i>INTERNSHIP</i></div><div className="timeline-title-line"><h3>Software Engineering Intern</h3><span className="timeline-current-dot" /></div><div className="timeline-org">Ashley Global Exim · Remote</div><p>Developed and deployed a responsive six-page website using React, Vite, and Tailwind CSS. Integrated EmailJS, optimized media and loading, managed hosting/domain configuration, and iterated on UI/UX from client feedback.</p><div className="timeline-metrics"><span><b>94</b><small>Lighthouse score*</small></span><span><b>18</b><small>Reusable components</small></span><span><b>25+</b><small>Leads reported*</small></span></div><small className="metric-footnote">*Figures reported in resume, not independently audited here.</small></article><div className="journey-callout"><Sparkles size={17} /><p>My preference: ship the full experience, not just the visible layer. That includes performance, data flow, sensible error states, and handoff.</p></div></div>
              <div className="journey-column education-column"><div className="column-title"><GraduationCap size={21} /><h2>Education</h2></div><div className="education-list">{education.map((item) => <article className="education-card" key={item.school}><span className="education-period">{item.period}</span><h3>{item.school}</h3><p>{item.degree}</p><small>{item.detail}</small>{item.current && <span className="current-tag">IN PROGRESS</span>}</article>)}</div><div className="mini-credential"><div className="credential-symbol"><BookOpen size={19} /></div><div><span className="eyebrow">CERTIFICATION</span><b>Open Source Software Development, Linux and Git</b><small>The Linux Foundation · ID 751IQQGC2C05</small></div><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="View credential reference on LinkedIn"><ExternalLink size={15} /></a></div></div>
            </Reveal>
          </div>
        </section>

        <section className="section coding-section" id="coding">
          <Reveal className="section-heading-row"><SectionLabel number="05">THE PRACTICE</SectionLabel><span className="section-side-note">CONSISTENCY OVER SCOREBOARD THEATRE</span></Reveal>
          <Reveal className="coding-heading" delay={0.06}><div><h2>Problem solving<br /><em>is a habit.</em></h2><p>Over 1,000 DSA problems solved across platforms, as reported in my resume. Profile cards open the original platforms so the evidence stays where it belongs.</p></div><div className="coding-mark"><Code2 size={28} /><span>DSA / CP</span><b>1000<span>+</span></b><small>PROBLEMS · RESUME REPORTED</small></div></Reveal>
          <div className="coding-cards">{codingProfiles.map((item, index) => <motion.a className={`coding-card coding-${item.tone}`} href={item.url} key={item.name} target="_blank" rel="noreferrer" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }} whileHover={reduceMotion ? undefined : { y: -3 }}><div className="coding-card-top"><span className="coding-monogram">{item.mark}</span><span className="coding-number">0{index + 1}</span></div><h3>{item.name}</h3><span className="coding-handle">@{item.handle}</span><p>{item.description}</p><div className="coding-card-bottom"><span>Open profile</span><ArrowUpRight size={17} /></div></motion.a>)}</div>
          <p className="data-note"><span>NOTE</span> Live ratings, streaks, and platform-specific counts are intentionally omitted until they can be reliably fetched or verified. No invented dashboards here.</p>
        </section>

        <section className="section recognition-section">
          <Reveal className="section-heading-row"><SectionLabel number="06">MILESTONES & BEYOND CODE</SectionLabel><span className="section-side-note">ACHIEVEMENTS THAT SHAPED THE WORK</span></Reveal>
          <Reveal className="recognition-grid" delay={0.06}><div className="recognition-intro"><Trophy size={23} /><h2>Proof of<br /><em>persistence.</em></h2><p>Competitive exams, team challenges, and campus events taught different versions of the same lesson: preparation matters, and execution is where it counts.</p><a className="quiet-link" href={profile.linkedin} target="_blank" rel="noreferrer">More on LinkedIn <ExternalLinkIcon /></a></div><div className="achievement-list">{achievements.map((item) => <article className="achievement-row" key={item.number}><span className="achievement-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div><span className="achievement-tag">{item.tag}</span></article>)}</div></Reveal>
          <Reveal className="leadership-block" delay={0.12}><div className="leadership-heading"><span className="eyebrow">LEADERSHIP & CAMPUS LIFE</span><p>Building event experiences takes planning, coordination, and an unreasonable number of details. Useful engineering practice, in its own way.</p></div><div className="leadership-list">{leadership.map((item, index) => <article className="leadership-row" key={item.organization}><span className="leadership-index">0{index + 1}</span><div><small>{item.period}</small><h3>{item.organization}</h3><b>{item.role}</b><p>{item.detail}</p></div><ArrowUpRight size={17} /></article>)}</div></Reveal>
        </section>

        <section className="section credentials-section" id="credentials">
          <Reveal className="section-heading-row"><SectionLabel number="07">CREDENTIALS</SectionLabel><span className="section-side-note">VERIFY BEFORE YOU TRUST THE BADGE</span></Reveal>
          <Reveal className="credentials-layout" delay={0.08}><div><h2>Learning that<br /><em>leaves a trail.</em></h2><p>One publicly listed credential is included here. Other certificates can be added in <code>src/data/certifications.ts</code> when the original title and verification link are available.</p></div><div className="credential-cards">{certifications.map((cert) => <article className="certificate-card" key={cert.credentialId}><div className="certificate-top"><div className="certificate-seal"><Terminal size={22} /></div><span className="certificate-id">ID · {cert.credentialId}</span></div><span className="eyebrow">{cert.issuer}</span><h3>{cert.title}</h3><p>{cert.note}</p><a className="text-link" href={cert.url} target="_blank" rel="noreferrer">Profile reference <ExternalLinkIcon /></a></article>)}</div></Reveal>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-ornament ornament-a" /><div className="contact-ornament ornament-b" />
          <div className="contact-inner"><div className="contact-top"><SectionLabel number="08">THE NEXT CONVERSATION</SectionLabel><span className="contact-availability"><i /> OPEN TO COLLABORATION & ENGINEERING CONVERSATIONS</span></div><Reveal className="contact-main" direction="left"><h2>Have a real problem<br />to solve? <em>Let’s talk.</em></h2><p>Internship opportunities, thoughtful product work, AI engineering, or a conversation about how something works under the hood. I’m happy to connect.</p><a className="button button-lime contact-email" href={`mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`}><Mail size={17} /> {profile.email} <ArrowUpRight size={17} /></a></Reveal><div className="contact-bottom"><div><span className="eyebrow">FIND ME AROUND THE INTERNET</span><div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalLinkIcon /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalLinkIcon /></a><a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode <ExternalLinkIcon /></a><a href={profile.codolio} target="_blank" rel="noreferrer">Codolio <ExternalLinkIcon /></a></div></div><button className="copy-email" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Email copied' : 'Copy email'}</button></div></div>
        </section>
      </main>

      <footer className="site-footer"><a className="footer-mark" href="#top">H<span>.</span></a><span>DESIGNED WITH INTENT · BUILT WITH REACT</span><span>© 2026 HARSH SHARMA</span><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></footer>

      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </div>
  )
}

export default App
