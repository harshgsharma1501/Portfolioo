# Harsh Sharma — Developer Portfolio

A local-first, responsive portfolio built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. It includes selected project case studies, profile links, experience, education, technical skills, achievements, leadership, one documented credential, a working resume download, theme toggle, responsive navigation, project filters, case-study modal, and copy-email action.

## Run locally on Windows

Prerequisites: Node.js 20+ and npm. Node.js 22 is supported.

1. Extract `harsh-sharma-portfolio.zip`.
2. Open the extracted `harsh-sharma-portfolio` folder in VS Code.
3. Open VS Code Terminal → PowerShell and run:

   ```powershell
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite, usually `http://127.0.0.1:5173/`.

## Verify a production build

```powershell
npm run typecheck
npm run build
npm run preview
```

The production output is written to `dist/`. The ZIP intentionally excludes `node_modules/` and generated `dist/` so it stays lightweight; `npm install` downloads dependencies on the receiving machine.

## Main files

```text
harsh-sharma-portfolio/
├── docs/
│   └── PROFILE_RESEARCH.md
├── CHANGELOG.md
├── public/
│   ├── favicon.svg
│   └── resume.pdf
├── src/
│   ├── components/
│   │   └── ProjectArtwork.tsx
│   ├── data/
│   │   ├── certifications.ts
│   │   ├── codingProfiles.ts
│   │   ├── profile.ts
│   │   └── projects.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Update your details

- **Links/email/name/graduation:** `src/data/profile.ts`
- **Project content, tech stack, stats, source/demo URLs:** `src/data/projects.ts`
- **Coding platform links and handles:** `src/data/codingProfiles.ts`
- **Certifications:** `src/data/certifications.ts`
- **Skill categories, education, achievements and leadership:** `src/data/profile.ts`
- **Resume:** replace `public/resume.pdf` with your latest resume. Keep the same filename so the download button continues to work.
- **Project cover artwork:** edit `src/components/ProjectArtwork.tsx` and its related CSS in `src/styles.css`.

## Important data notes

- Platform-specific live ratings, streaks, problem counts, and coding charts are not fabricated. The page links to the profiles; fill in statistics only after verifying them.
- Several results on the project cards are reported in the resume or project README. `docs/PROFILE_RESEARCH.md` records where they came from and which items need follow-up.
- The Zostel README says payment gateway and SMS/email integrations are simulated in its prototype; the case study discloses that limitation.
- The Linux Foundation credential card links to the LinkedIn profile because a direct credential-specific URL was not verified in this build.
- The Ashley Global Exim project card links to `https://ashleyglobalexim.com/`, which was reachable during research. Confirm it is the exact production version you want recruiters to see and review the resume-reported performance/lead metrics before treating them as independently measured.

## Design & behavior

- Light/dark theme persists through `localStorage` when available.
- Project category filters and case-study modals work without a backend.
- `mailto:` contact links and the resume download work locally. The copy-email button uses the clipboard API when browser permissions allow, with a mailto fallback.
- Coding profile cards open the supplied external accounts. Profile statistics are not dynamically scraped, avoiding fragile undocumented endpoints and keys.
- Layout adapts to desktop, tablet, and mobile, and supports reduced-motion preferences.
- Header navigation follows the visible section order: About → Work → Stack → Journey. The active link updates as you scroll.
- Framer Motion reveals section content and staggers project, skill, and coding-profile cards; subtle hero-card drift adds movement without distracting from the content. Animations honor reduced-motion preferences.

## Validation note for this revision

All TS/TSX source files were syntax-parsed successfully. A full dependency-backed TypeScript check and production build could not be completed in the packaging environment because npm registry access timed out. Run `npm install`, then `npm run typecheck` and `npm run build` locally to verify the full dependency and build pipeline.

## Deploy later

This project uses Vite's default build output and can later be deployed to a static host such as Vercel, Netlify, or GitHub Pages. No deployment configuration is required for local use.
