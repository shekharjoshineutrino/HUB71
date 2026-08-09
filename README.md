# Hub71 Perks — POC

A UI proof-of-concept for a standalone Hub71 partner-perks platform, replacing the current
third-party catalogue. Front-end only, with dummy data — built to demonstrate the experience
and the analytics/visibility layer.

## Interfaces

| Route | Interface | What it shows |
|-------|-----------|---------------|
| `/founder` | Founder experience | Curated, filterable perk library; value on every card; offer detail + query submission |
| `/partner` | Partner portal | A partner's own engagement — views, queries received, trend, and query list |
| `/admin` | Hub71 admin | Programme-wide analytics — KPIs, views/queries over time, category split, per-partner performance |

Use the sidebar to switch interfaces, and the sun/moon button (top-right) to switch **light / dark** mode.
Theme preference persists; you can also force it with `?theme=light` or `?theme=dark`.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

Build a static bundle with `npm run build` (output in `dist/`), preview it with `npm run preview`.

## Tech

- Vite + React + TypeScript
- Plain CSS with CSS-variable theming (light/dark)
- Recharts for charts, lucide-react for icons

## Structure

```
src/
  App.tsx          app shell — sidebar, topbar, routing, theme toggle
  theme.tsx        light/dark theme context + chart palette
  index.css        design system (tokens, components, both themes)
  data.ts          all dummy data (offers, analytics, queries)
  pages/
    Founder.tsx    founder experience
    Partner.tsx    partner portal
    Admin.tsx      Hub71 admin analytics
```

All data is mock data in `src/data.ts`. Brand colours are placeholders — swap `--brand*` in
`src/index.css` for the exact Hub71 blue.
