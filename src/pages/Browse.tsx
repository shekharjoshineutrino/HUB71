import { useMemo, useState } from 'react'
import {
  Search,
  Sparkles,
  X,
  Check,
  LayoutGrid,
  BadgeDollarSign,
  Layers,
  Rocket,
  Star,
  SlidersHorizontal,
  RefreshCw,
  Bookmark,
  List,
  FolderKanban,
  ArrowRight,
  Plus,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { categories, categoryById, valueBands, types, lifecycles, sorts, bandOf, offers, Offer } from '../data'
import PerkCard from '../PerkCard'
import QuickClaimDrawer from '../QuickClaimDrawer'
import { partnerIcon } from '../icons'

const STATUS: Record<string, { label: string; cls: string }> = {
  available: { label: 'Available', cls: 'tb-blue' },
  requested: { label: 'Requested', cls: 'tb-amber' },
  redeemed: { label: 'Redeemed', cls: 'tb-green' },
}

function PillGroup({ title, icon: Icon, options, value, onChange }: { title: string; icon: any; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="filter-sec">
      <div className="filter-h"><Icon size={12} /> {title}</div>
      <div className="fpills">
        {['All', ...options].map((opt) => {
          const v = opt === 'All' ? '' : opt
          return (
            <button key={opt} className={'fpill' + (value === v ? ' on' : '')} onClick={() => onChange(v)}>{opt}</button>
          )
        })}
      </div>
    </div>
  )
}

export default function Browse() {
  const [q, setQ] = useState('')
  const [cats, setCats] = useState<string[]>([])
  const [band, setBand] = useState('')
  const [type, setType] = useState('')
  const [stage, setStage] = useState('')
  const [exclusive, setExclusive] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>(['gcloud', 'aws'])
  const [stackIds, setStackIds] = useState<string[]>(['gcloud', 'openai'])
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [sort, setSort] = useState(sorts[0])
  const [fOpen, setFOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'grouped'>('grid')
  const [stackDrawerOpen, setStackDrawerOpen] = useState(false)

  const toggleCat = (id: string) => setCats((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const toggleSave = (id: string) => setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const toggleStack = (id: string) => setStackIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const list = useMemo(() => {
    let out = offers.filter((o) => {
      if (cats.length && !cats.includes(o.cat)) return false
      if (band && bandOf(o.valueAED) !== band) return false
      if (type && o.type !== type) return false
      if (stage && o.lifecycle !== stage) return false
      if (exclusive && !o.exclusive) return false
      if (savedOnly && !savedIds.includes(o.id)) return false
      if (q && !(o.partner + ' ' + o.short + ' ' + o.valueLabel).toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
    if (sort === 'Most viewed') out = [...out].sort((a, b) => b.views - a.views)
    if (sort === 'Highest value') out = [...out].sort((a, b) => b.valueAED - a.valueAED)
    if (sort === 'A – Z') out = [...out].sort((a, b) => a.partner.localeCompare(b.partner))
    return out
  }, [q, cats, band, type, stage, exclusive, savedOnly, savedIds, sort])

  const stackedOffers = useMemo(() => offers.filter((o) => stackIds.includes(o.id)), [stackIds])
  const totalStackAED = useMemo(() => stackedOffers.reduce((sum, o) => sum + o.valueAED, 0), [stackedOffers])

  const chips: { label: string; clear: () => void }[] = []
  if (q) chips.push({ label: `"${q}"`, clear: () => setQ('') })
  cats.forEach((c) => chips.push({ label: categoryById(c)?.name || c, clear: () => toggleCat(c) }))
  if (band) chips.push({ label: band, clear: () => setBand('') })
  if (type) chips.push({ label: type, clear: () => setType('') })
  if (stage) chips.push({ label: stage, clear: () => setStage('') })
  if (exclusive) chips.push({ label: 'Hub71 exclusive', clear: () => setExclusive(false) })
  if (savedOnly) chips.push({ label: 'Saved perks only', clear: () => setSavedOnly(false) })

  const clearAll = () => {
    setQ('')
    setCats([])
    setBand('')
    setType('')
    setStage('')
    setExclusive(false)
    setSavedOnly(false)
  }

  return (
    <>
      {/* Simple, Minimal Clean Page Header */}
      <div className="card clean-hero-card">
        <div className="clean-hero-main">
          <div>
            <h1 className="clean-hero-title">Partner Perks & Offers</h1>
            <p className="clean-hero-sub">Explore and request curated partner offers available to <strong>Falcon AI</strong>.</p>
          </div>
          <div className="clean-hero-stats">
            <div className="chs-item"><span className="chs-val">{offers.length}</span><span className="chs-lbl">Offers Available</span></div>
            <span className="chs-div" />
            <div className="chs-item"><span className="chs-val">{savedIds.length}</span><span className="chs-lbl">Saved</span></div>
          </div>
        </div>
      </div>

      {/* On-Demand Slide-Out Filter Drawer Scrim */}
      {fOpen && <div className="frail-scrim" onClick={() => setFOpen(false)} />}

      {/* Side Sliding Bar for Filter Criteria */}
      <aside className={'card filter-rail drawer-mode' + (fOpen ? ' open' : '')}>
        <div className="frail-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SlidersHorizontal size={15} style={{ color: '#0066cc' }} />
            <span className="frail-title">Filter Criteria</span>
            {chips.length > 0 && <span className="deck-badge">{chips.length}</span>}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            {chips.length > 0 && (
              <button className="clear-link" onClick={clearAll} style={{ fontSize: 12 }}>
                Reset
              </button>
            )}
            <button className="icon-btn frail-close" onClick={() => setFOpen(false)} aria-label="Close filters">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="drawer-body-scroll" style={{ overflowY: 'auto', flex: 1, padding: '10px 0' }}>
          {/* Category Filter Pills */}
          <div className="filter-sec">
            <div className="filter-h"><LayoutGrid size={13} /> Category</div>
            <div className="fpills">
              <button
                className={'fpill' + (cats.length === 0 ? ' on' : '')}
                onClick={() => setCats([])}
              >
                All ({offers.length})
              </button>
              {categories.map((c) => {
                const on = cats.includes(c.id)
                const count = offers.filter((o) => o.cat === c.id).length
                return (
                  <button
                    key={c.id}
                    className={'fpill' + (on ? ' on' : '')}
                    onClick={() => toggleCat(c.id)}
                  >
                    {c.name} <span style={{ opacity: 0.75, fontSize: 10.5 }}>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Offer Value Filter */}
          <PillGroup title="Offer value" icon={BadgeDollarSign} options={valueBands} value={band} onChange={setBand} />

          {/* Perk Type Filter */}
          <PillGroup title="Perk Type" icon={Layers} options={types} value={type} onChange={setType} />

          {/* Startup Stage Filter */}
          <PillGroup title="Startup Stage" icon={Rocket} options={lifecycles} value={stage} onChange={setStage} />

          {/* Hub71 Exclusive Toggle Card */}
          <div className="filter-sec">
            <div
              className="excl-card"
              onClick={() => setExclusive((v) => !v)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div className="excl-star-box">
                  <Star size={14} fill={exclusive ? '#ff9500' : 'none'} color="#ff9500" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Hub71 Exclusives</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Special perks for Hub71 founders</div>
                </div>
              </div>
              <span className={'switch' + (exclusive ? ' on' : '')} />
            </div>
          </div>
        </div>

        {/* Side Sliding Bar Footer */}
        <div className="drawer-footer">
          <button
            className="cpc-claim-btn"
            onClick={() => setFOpen(false)}
            style={{ width: '100%', height: 44, justifyContent: 'center', fontSize: 13.5, fontWeight: 700 }}
          >
            Show {list.length} Offers <ArrowRight size={14} />
          </button>
        </div>
      </aside>
      {/* Unified Apple-Style Control Deck */}
      <div className="card control-deck" style={{ marginTop: 18 }}>
        {/* Tier 1: Category Segmented Tabs */}
        <div className="deck-category-track">
          <button
            className={'deck-tab' + (cats.length === 0 && !savedOnly ? ' active' : '')}
            onClick={() => { setCats([]); setSavedOnly(false); }}
          >
            All Offers ({offers.length})
          </button>
          <button
            className={'deck-tab' + (savedOnly ? ' active' : '')}
            onClick={() => setSavedOnly((v) => !v)}
          >
            <Bookmark size={13} /> Saved ({savedIds.length})
          </button>
          {categories.map((c) => {
            const active = cats.includes(c.id)
            const count = offers.filter((o) => o.cat === c.id).length
            return (
              <button
                key={c.id}
                className={'deck-tab' + (active ? ' active' : '')}
                onClick={() => toggleCat(c.id)}
              >
                {c.name} <span className="deck-tab-count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="deck-divider" />

        {/* Tier 2: Search, Filter Criteria, View Switcher & Sort Controls */}
        <div className="deck-action-row">
          {/* Integrated Search Input */}
          <div className="deck-search-wrap">
            <Search size={15} className="deck-search-icon" />
            <input
              placeholder="Search partner name, offer credits, technology..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="deck-search-input"
            />
            {q && (
              <button onClick={() => setQ('')} className="deck-search-clear">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Side Sliding Drawer Trigger */}
          <button
            className={'deck-btn deck-filter-btn' + (chips.length > 0 ? ' active' : '')}
            onClick={() => setFOpen(true)}
          >
            <SlidersHorizontal size={14} />
            <span>Filter Criteria</span>
            {chips.length > 0 && <span className="deck-badge">{chips.length}</span>}
          </button>

          {/* View Switcher Controls */}
          <div className="view-mode-group">
            <button
              className={'vmode-btn' + (viewMode === 'grid' ? ' active' : '')}
              onClick={() => setViewMode('grid')}
              title="Grid View (Cards)"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              className={'vmode-btn' + (viewMode === 'list' ? ' active' : '')}
              onClick={() => setViewMode('list')}
              title="List View (Table Rows)"
            >
              <List size={15} />
            </button>
            <button
              className={'vmode-btn' + (viewMode === 'grouped' ? ' active' : '')}
              onClick={() => setViewMode('grouped')}
              title="Grouped Category View"
            >
              <FolderKanban size={15} />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="deck-sort-wrap">
            <select className="deck-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sorts.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="full-width-container" style={{ marginTop: 14 }}>
        {/* Results Counter & Active Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <span className="result-count">Showing <strong>{list.length}</strong> of {offers.length} offers</span>
        </div>

        {/* Active Filter Chips */}
        {chips.length > 0 && (
          <div className="active-chips" style={{ marginTop: 8 }}>
            {chips.map((c, i) => (
              <span key={i} className="active-chip">{c.label}<button onClick={c.clear}><X size={13} /></button></span>
            ))}
            <button className="clear-link" onClick={clearAll}>Reset all filters</button>
          </div>
        )}

        {list.length === 0 ? (
          <div className="card empty section-gap" style={{ marginTop: 18 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>No matching perks found</div>
            <p style={{ margin: '0 0 16px', color: 'var(--text-muted)' }}>Try adjusting your filters or search keywords to explore all available offers.</p>
            <button className="btn btn-ghost btn-sm" onClick={clearAll} style={{ margin: '0 auto' }}>
              <RefreshCw size={14} /> Reset all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid perk-cards section-gap" style={{ marginTop: 16 }}>
            {list.map((o) => (
              <PerkCard
                key={o.id}
                o={o}
                showCat
                isSaved={savedIds.includes(o.id)}
                onToggleSave={toggleSave}
                onQuickClaim={(offer) => setSelectedOffer(offer)}
              />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="proto-list-rowset" style={{ marginTop: 16 }}>
            {list.map((o) => {
              const cat = categoryById(o.cat)
              const Icon = partnerIcon(o.icon)
              const st = STATUS[o.status] || STATUS.available

              return (
                <div key={o.id} className="proto-list-row" onClick={() => setSelectedOffer(o)}>
                  <div className="plr-logo">
                    <Icon size={20} />
                  </div>
                  <div className="plr-meta">
                    <div className="plr-title-wrap">
                      <span className="plr-title">{o.partner}</span>
                      {o.exclusive && (
                        <span className="excl-star" title="Hub71 Exclusive Perk">
                          <Sparkles size={11} />
                        </span>
                      )}
                      <span className="plr-cat-pill">{cat?.name}</span>
                    </div>
                    <p className="plr-desc">{o.short}</p>
                  </div>
                  <div className="plr-val-wrap">
                    <span className="plr-val-big">{o.valueLabel}</span>
                  </div>
                  <div className="plr-status">
                    <span className={'tbadge ' + st.cls}>
                      <span className="bdot" />
                      {st.label}
                    </span>
                  </div>
                  <div className="plr-actions">
                    <button
                      className={'icon-btn bookmark-btn' + (savedIds.includes(o.id) ? ' saved' : '')}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(o.id)
                      }}
                      title={savedIds.includes(o.id) ? 'Remove from saved' : 'Save perk'}
                    >
                      <Bookmark size={15} fill={savedIds.includes(o.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="cpc-claim-btn" onClick={() => setSelectedOffer(o)}>
                      {o.status === 'redeemed' ? 'Access' : 'Claim'} <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grouped-sections-view" style={{ marginTop: 20 }}>
            {categories.map((c) => {
              const catOffers = list.filter((o) => o.cat === c.id)
              if (catOffers.length === 0) return null

              return (
                <div key={c.id} className="cat-group-section" style={{ marginBottom: 28 }}>
                  <div className="cat-group-header">
                    <div className="cat-group-title-wrap">
                      <span className="cat-group-dot" style={{ background: c.g1 }} />
                      <h2 className="cat-group-title">{c.name}</h2>
                      <span className="cat-group-badge">{catOffers.length} offers</span>
                    </div>
                    <span className="cat-group-desc">{c.desc}</span>
                  </div>

                  <div className="grid perk-cards" style={{ marginTop: 14 }}>
                    {catOffers.map((o) => (
                      <PerkCard
                        key={o.id}
                        o={o}
                        showCat={false}
                        isSaved={savedIds.includes(o.id)}
                        onToggleSave={toggleSave}
                        onQuickClaim={(offer) => setSelectedOffer(offer)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <QuickClaimDrawer offer={selectedOffer} close={() => setSelectedOffer(null)} />
    </>
  )
}
