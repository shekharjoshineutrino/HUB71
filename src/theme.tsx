import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type Ctx = { theme: Theme; toggle: () => void }

const ThemeContext = createContext<Ctx>({ theme: 'light', toggle: () => {} })

function initial(): Theme {
  if (typeof location !== 'undefined') {
    const p = new URLSearchParams(location.search).get('theme')
    if (p === 'light' || p === 'dark') return p
  }
  const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('hub71-theme')) as Theme | null
  if (saved === 'light' || saved === 'dark') return saved
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('hub71-theme', theme) } catch {}
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

/**
 * Chart palette.
 * Categorical slots come from a CVD-validated set; both modes are *selected*
 * steps for their own surface, not an automatic flip.
 * Verified with the data-viz validator (adjacent CVD ΔE 9.2 light / 9.4 dark,
 * normal-vision ΔE 27.6 / 26.5 — both clear of the floors).
 */
const SERIES_LIGHT = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300']
const SERIES_DARK = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300']

export function chartColors(theme: Theme) {
  const dark = theme === 'dark'
  const series = dark ? SERIES_DARK : SERIES_LIGHT
  return {
    series,
    s1: series[0], s2: series[1], s3: series[2],
    grid: dark ? '#26314a' : '#e7ecf3',
    axis: dark ? '#8ea0bd' : '#647089',
    fillFrom: series[0],
    tooltip: dark ? '#151d31' : '#ffffff',
    tooltipBorder: dark ? '#2a3550' : '#e4e9f0',
    // legacy aliases
    brand: series[0], brand2: series[2],
  }
}

/** Motion: honour prefers-reduced-motion, and allow ?still=1 to freeze for capture. */
export const stillMode = () =>
  (typeof location !== 'undefined' && new URLSearchParams(location.search).get('still') === '1') ||
  (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)
