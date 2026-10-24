# Changelog

## 2026-10-24 — Navigation and motion update

- Fixed the mismatch between header navigation and rendered content. Both now follow **About → Work → Stack → Journey**.
- Improved the active-section observer so the header indicator tracks the section in the reading area and clears when no tracked section is active.
- Added restrained hero entrance, section scroll-reveal, and staggered project/skill/coding-profile card animations.
- Added subtle movement to the hero focus cards and preserved their responsive positioning.
- Kept animations compatible with `prefers-reduced-motion` and reduced-motion settings from Framer Motion.
- Added keyboard-focus styling for nav links and project-card controls.
- Validated TS/TSX syntax, CSS parsing, package JSON, the navigation/page order, Reveal tag balance, and the included resume PDF.
- A dependency-backed typecheck and production build could not be run in the packaging environment because npm registry access timed out. Run `npm install` followed by `npm run typecheck` and `npm run build` locally.
