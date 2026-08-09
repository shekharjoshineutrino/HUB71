import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Compass, Store, LayoutDashboard, Moon, Sun, ChevronDown, Check, Building2, Settings2, Inbox, LogOut, UserRound, X, Bell, Rocket, Menu, Search } from 'lucide-react'
import { ThemeProvider, useTheme } from './theme'
import Browse from './pages/Browse'
import Offer from './pages/Offer'
import Partner from './pages/Partner'
import Admin from './pages/Admin'
import AdminApplications from './pages/AdminApplications'
import AdminPartners from './pages/AdminPartners'
import AdminSettings from './pages/AdminSettings'
import RegisterOfferPage from './pages/RegisterOfferPage'
import CommandBar from './CommandBar'
import { applications, currentUser, currentPartner, categoryById } from './data'

const NAV = [
  { to: '/founder', icon: Compass, label: 'Founder experience', desc: 'Browse & redeem' },
  { to: '/partner', icon: Store, label: 'Partner portal', desc: 'Your analytics' },
  { to: '/admin', icon: LayoutDashboard, label: 'Hub71 admin', desc: 'Programme console' },
]

const ADMIN_GROUPS = [
  { label: 'General', items: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true, badge: '' },
  ]},
  { label: 'Programme', items: [
    { to: '/admin/applications', icon: Inbox, label: 'Applications', end: false, badge: String(applications.length) },
    { to: '/admin/partners', icon: Building2, label: 'Partners', end: false, badge: '18' },
  ]},
]
const ADMIN_UTIL = [
  { to: '/admin/settings', icon: Settings2, label: 'Settings', end: false, badge: '' },
]
const ADMIN_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/register-offer': 'Register Partner Offer',
  '/admin/applications': 'Applications',
  '/admin/partners': 'Partners',
  '/admin/settings': 'Settings',
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button className="icon-btn" onClick={toggle} aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
      {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  )
}

function InterfaceSwitcher() {
  const loc = useLocation()
  const nav = useNavigate()
  const [open, setOpen] = useState(typeof location !== 'undefined' && new URLSearchParams(location.search).get('menu') === '1')
  const current = NAV.find((n) => loc.pathname.startsWith(n.to)) ?? NAV[0]
  const Icon = current.icon
  return (
    <div className="switcher">
      <button className={'switcher-btn' + (open ? ' open' : '')} onClick={() => setOpen((o) => !o)}>
        <Icon size={19} color="var(--brand)" />
        <div className="sw-text"><div className="sw-label">{current.label}</div><div className="sw-desc">{current.desc}</div></div>
        <ChevronDown size={17} className="chev" />
      </button>
      {open && (
        <>
          <div className="switcher-overlay" onClick={() => setOpen(false)} />
          <div className="switcher-menu">
            {NAV.map(({ to, icon: I, label, desc }) => {
              const active = loc.pathname.startsWith(to)
              return (
                <button key={to} className={'switcher-item' + (active ? ' active' : '')} onClick={() => { nav(to); setOpen(false) }}>
                  <I size={19} color={active ? 'var(--brand)' : 'var(--text-faint)'} />
                  <div><div className="si-label">{label}</div><div className="si-desc">{desc}</div></div>
                  {active && <Check size={16} className="si-check" />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function UserMenu() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(typeof location !== 'undefined' && new URLSearchParams(location.search).get('profile') === '1')
  const [toast, setToast] = useState(false)
  const logout = () => { setOpen(false); setProfile(false); setToast(true); setTimeout(() => setToast(false), 2600) }
  return (
    <div className="side-foot">
      <div className="user-card" onClick={() => setOpen((o) => !o)}>
        <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>{currentUser.initials}</div>
        <div className="user-meta"><div className="user-name">{currentUser.name}</div><div className="user-role">{currentUser.role}</div></div>
        <ChevronDown size={16} color="var(--text-faint)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
        {open && (
          <>
            <div className="switcher-overlay" onClick={(e) => { e.stopPropagation(); setOpen(false) }} />
            <div className="user-pop" onClick={(e) => e.stopPropagation()}>
              <div className="up-head"><div className="user-name">{currentUser.name}</div><div className="user-role">{currentUser.email}</div></div>
              <button className="pop-item" onClick={() => { setOpen(false); setProfile(true) }}><UserRound size={16} /> View profile details</button>
              <button className="pop-item danger" onClick={logout}><LogOut size={16} /> Log out</button>
            </div>
          </>
        )}
      </div>

      {profile && createPortal(
        <div className="overlay" onClick={() => setProfile(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="avatar lg">{currentUser.initials}</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 17 }}>{currentUser.name}</div><div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{currentUser.role}</div></div>
              <button className="icon-btn" style={{ width: 34, height: 34 }} onClick={() => setProfile(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="kv"><span className="k">Email</span><span className="v">{currentUser.email}</span></div>
              <div className="kv"><span className="k">Role</span><span className="v">{currentUser.role}</span></div>
              <div className="kv"><span className="k">Organisation</span><span className="v">Hub71</span></div>
              <div className="kv"><span className="k">Access</span><span className="v">Programme admin</span></div>
              <button className="btn btn-ghost btn-block" style={{ marginTop: 16 }} onClick={logout}><LogOut size={16} /> Log out</button>
            </div>
          </div>
        </div>, document.body)}

      {toast && createPortal(
        <div className="toast">
          <LogOut size={16} /> Signed out of the demo
          <span className="t-actions">
            <button onClick={() => setToast(false)}>Undo</button>
            <button onClick={() => setToast(false)}>Dismiss</button>
          </span>
        </div>, document.body)}
    </div>
  )
}

function AdminSidebar({ open, close }: { open: boolean; close: () => void }) {
  return (
    <aside className={'side' + (open ? ' open' : '')}>
      <div className="side-brand">
        <div className="brand-mark">H</div>
        <div style={{ flex: 1 }}><div className="brand-name">Hub71 Perks</div><div className="brand-sub">Admin console</div></div>
        <button className="icon-btn side-close" onClick={close} aria-label="Close menu"><X size={17} /></button>
      </div>
      {ADMIN_GROUPS.map((g) => (
        <div key={g.label}>
          <div className="side-nav-label">{g.label}</div>
          {g.items.map(({ to, icon: I, label, end, badge }) => (
            <NavLink key={to} to={to} end={end} onClick={close} className={({ isActive }) => 'side-item' + (isActive ? ' active' : '')}>
              <I size={18} /> {label}
              {badge && <span className="si-badge">{badge}</span>}
            </NavLink>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 'auto' }}>
        {ADMIN_UTIL.map(({ to, icon: I, label, end }) => (
          <NavLink key={to} to={to} end={end} onClick={close} className={({ isActive }) => 'side-item' + (isActive ? ' active' : '')}>
            <I size={18} /> {label}
          </NavLink>
        ))}
        <div className="side-sep" />
        <UserMenu />
      </div>
    </aside>
  )
}

function Shell() {
  const [navOpen, setNavOpen] = useState(typeof location !== 'undefined' && new URLSearchParams(location.search).get('nav') === '1')
  const [cmdOpen, setCmdOpen] = useState(false)
  const loc = useLocation()
  const isAdmin = loc.pathname.startsWith('/admin')
  const isPartner = loc.pathname.startsWith('/partner')
  const isFounder = loc.pathname.startsWith('/founder')
  const pcg = categoryById(currentPartner.cat)?.g1 || '#2260e6'

  return (
    <div className="app" style={{ display: 'flex' }}>
      {isAdmin && <AdminSidebar open={navOpen} close={() => setNavOpen(false)} />}
      {isAdmin && navOpen && <div className="side-scrim" onClick={() => setNavOpen(false)} />}
      <div className="main">
        <header className="topbar">
          {isAdmin ? (
            <>
              <button className="icon-btn nav-toggle" onClick={() => setNavOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
              <div className="topbar-title">{ADMIN_TITLES[loc.pathname] ?? 'Admin'}</div>
            </>
          ) : (
            <div className="topbar-brand">
              <div className="brand-mark">H</div>
              <div className="bn">
                <div className="tb-name">Hub71 Perks</div>
                <div className="tb-sub">Partner platform</div>
              </div>
              <div className="topbar-div" />
              <InterfaceSwitcher />
            </div>
          )}

          <div className="topbar-right">
            <button
              className="btn btn-ghost btn-sm cmd-trigger-btn"
              onClick={() => setCmdOpen(true)}
              title="Search perks & commands (Ctrl+K or /)"
            >
              <Search size={14} />
              <span className="cmd-text">Search...</span>
              <kbd className="cmd-kbd">⌘K</kbd>
            </button>
            {isFounder && (
              <>
                <button className="icon-btn" style={{ position: 'relative' }} aria-label="Notifications"><Bell size={18} /><span className="notif-dot" /></button>
                <div className="partner-chip">
                  <div className="avatar" style={{ width: 30, height: 30, fontSize: 11, background: 'color-mix(in srgb, var(--brand) 14%, var(--surface))', color: 'var(--brand-text)' }}><Rocket size={15} /></div>
                  <div className="pc-text">
                    <div className="pc-name">Falcon AI</div>
                    <div className="pc-sub">Cohort 18</div>
                  </div>
                </div>
              </>
            )}
            {isPartner && (
              <div className="partner-chip">
                <div className="avatar" style={{ width: 30, height: 30, fontSize: 11, background: `color-mix(in srgb, ${pcg} 15%, var(--surface))`, color: pcg }}>{currentPartner.initials}</div>
                <div className="pc-text">
                  <div className="pc-name">{currentPartner.name}</div>
                  <div className="pc-sub">{currentPartner.tier}</div>
                </div>
                <span className="status responded">{currentPartner.status}</span>
              </div>
            )}
            {isAdmin && <InterfaceSwitcher />}
            <ThemeToggle />
          </div>
        </header>

        <CommandBar open={cmdOpen} close={() => setCmdOpen(false)} />

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/founder" replace />} />
            <Route path="/founder" element={<Browse />} />
            <Route path="/founder/offer/:offerId" element={<Offer />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/partner/register-offer" element={<RegisterOfferPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/register-offer" element={<RegisterOfferPage />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  )
}
