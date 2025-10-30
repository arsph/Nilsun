## Nilsun Studio — React + TypeScript + Vite

Modern, bilingual (FA/EN) marketing site for Nilsun Studio. Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and i18next.

### Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS
- i18next for localization (FA/EN)
- Framer Motion animations

### Prerequisites
- Node.js 18+

### Quick Start
```bash
npm install
npm run dev
```
Visit the dev server URL printed in the terminal.

### Available Scripts
- `npm run dev`: start dev server with HMR
- `npm run build`: production build to `dist/`
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

### Project Structure
```
src/
  components/        # UI components (home, layout, etc.)
  pages/             # Route pages
  i18n/              # i18next config & locale files
  assets/            # App assets (if any)
public/              # Static assets served at root
```

### Localization
- Strings live in `src/i18n/locales/fa.json` and `src/i18n/locales/en.json`.
- i18n is initialized in `src/i18n/i18n.ts`.
- Use in components:
```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
return <h1>{t('hero.title')}</h1>;
```

### Styling & Animations
- Tailwind classes in JSX for styling.
- Framer Motion for entry/hover animations.

### Build & Deploy
```bash
npm run build
# outputs to dist/
```
Serve `dist/` with any static host (Netlify, Vercel, Nginx, etc.).

### Conventions
- DRY, readable code, descriptive names
- Keep translations in sync across FA/EN
- Prefer functional components and hooks

### License
Proprietary — Designed by [Arsalan Parham](https://arsalanparham.com)
