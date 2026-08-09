import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Compass, Store, LayoutDashboard, X, ArrowRight, Sparkles, Star } from 'lucide-react'
import { offers, categories, categoryById } from './data'
import { partnerIcon } from './icons'

export default function CommandBar({ open, close }: { open: boolean; close: () => void }) {
  const [q, setQ] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) close()
        else setQ('')
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        setQ('')
      }
      if (e.key === 'Escape' && open) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  if (!open) return null

  const filteredOffers = offers.filter((o) =>
    (o.partner + ' ' + o.short + ' ' + o.valueLabel).toLowerCase().includes(q.toLowerCase())
  ).slice(0, 5)

  const filteredCats = categories.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  )

  const pages = [
    { label: 'Founder Experience', to: '/founder', icon: Compass, desc: 'Browse and redeem perks' },
    { label: 'Partner Portal', to: '/partner', icon: Store, desc: 'View partner redemptions & metrics' },
    { label: 'Admin Dashboard', to: '/admin', icon: LayoutDashboard, desc: 'Hub71 programme console' },
  ]

  const handleSelect = (to: string) => {
    nav(to)
    close()
  }

  return (
    <div className="overlay cmd-overlay" onClick={close}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Search size={18} className="cmd-ico" />
          <input
            autoFocus
            className="cmd-input"
            placeholder="Type a command or search perks, partners, categories..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="icon-btn cmd-close" onClick={close} aria-label="Close search">
            <X size={16} />
          </button>
        </div>

        <div className="cmd-body">
          {/* Quick Pages */}
          <div className="cmd-sec">
            <div className="cmd-head">Navigation</div>
            {pages.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.to} className="cmd-item" onClick={() => handleSelect(p.to)}>
                  <div className="cmd-item-ico"><Icon size={16} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cmd-item-title">{p.label}</div>
                    <div className="cmd-item-desc">{p.desc}</div>
                  </div>
                  <ArrowRight size={14} className="cmd-arrow" />
                </div>
              )
            })}
          </div>

          {/* Offers */}
          {filteredOffers.length > 0 && (
            <div className="cmd-sec">
              <div className="cmd-head">Matching Offers ({filteredOffers.length})</div>
              {filteredOffers.map((o) => {
                const Icon = partnerIcon(o.icon)
                const cat = categoryById(o.cat)
                return (
                  <div key={o.id} className="cmd-item" onClick={() => handleSelect(`/founder/offer/${o.id}`)}>
                    <div className="cmd-item-ico" style={{ color: cat?.g1 || 'var(--brand)' }}>
                      <Icon size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="cmd-item-title">
                        {o.partner}
                        {o.exclusive && <Star size={11} style={{ color: 'var(--amber)', marginLeft: 4 }} />}
                      </div>
                      <div className="cmd-item-desc">{o.valueLabel} · {cat?.name}</div>
                    </div>
                    <span className="tbadge tb-blue">View</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Categories */}
          {filteredCats.length > 0 && (
            <div className="cmd-sec">
              <div className="cmd-head">Categories</div>
              {filteredCats.map((c) => (
                <div key={c.id} className="cmd-item" onClick={() => handleSelect(`/founder?cat=${c.id}`)}>
                  <div className="cmd-item-ico" style={{ background: c.g1, color: '#fff' }}>
                    <Sparkles size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cmd-item-title">{c.name}</div>
                    <div className="cmd-item-desc">Explore {c.name} perks</div>
                  </div>
                  <ArrowRight size={14} className="cmd-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cmd-foot">
          <span>Tip: Press <kbd>ESC</kbd> to exit, <kbd>Ctrl+K</kbd> or <kbd>/</kbd> to open anytime.</span>
        </div>
      </div>
    </div>
  )
}
