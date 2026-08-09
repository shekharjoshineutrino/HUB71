import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  ArrowLeft, Building2, Globe, Mail, Coins, Sparkles, CheckCircle2,
  ArrowRight, Star, ShieldCheck, Plus, Trash2, Check,
} from 'lucide-react'
import { Offer, categories, types, lifecycles, addOffer, currentPartner } from '../data'
import { partnerIcon } from '../icons'

const AVAILABLE_ICONS = [
  { id: 'sparkles', label: 'AI & Machine Learning' },
  { id: 'cloud', label: 'Cloud Computing' },
  { id: 'server', label: 'Infrastructure & APIs' },
  { id: 'shield', label: 'Security & Compliance' },
  { id: 'code', label: 'Developer Tools' },
  { id: 'git-branch', label: 'Code Repository' },
  { id: 'key', label: 'Authentication & SSO' },
  { id: 'wallet', label: 'Fintech & Payments' },
  { id: 'credit-card', label: 'Cards & Spend' },
  { id: 'scale', label: 'Legal & Advisory' },
  { id: 'megaphone', label: 'Marketing & SEO' },
  { id: 'mail', label: 'Comms & Email' },
  { id: 'users', label: 'HR & Global Payroll' },
  { id: 'notebook', label: 'Workspace & Docs' },
  { id: 'table', label: 'Database & No-Code' },
]

function HelpTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span
      className="help-tip-wrap"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={(e) => {
        e.stopPropagation()
        setShow(!show)
      }}
    >
      <span className="help-tip-btn" aria-label="Help">?</span>
      {show && (
        <span className="help-tip-popover">
          {text}
        </span>
      )}
    </span>
  )
}

export default function RegisterOfferPage() {
  const navigate = useNavigate()
  const loc = useLocation()
  const isAdmin = loc.pathname.startsWith('/admin')
  const defaultPartner = isAdmin ? '' : (currentPartner.name || 'Google Cloud')

  const [partner, setPartner] = useState(defaultPartner)
  const [website, setWebsite] = useState(isAdmin ? '' : currentPartner.website || 'cloud.google.com/startup')
  const [hq, setHq] = useState(isAdmin ? 'Abu Dhabi, UAE' : 'Mountain View, US')
  const [founded, setFounded] = useState('2020')
  const [contact, setContact] = useState(isAdmin ? '' : currentPartner.contact || 'Jordan Reyes')
  const [icon, setIcon] = useState('sparkles')

  // Offer fields in AED
  const [aed, setAed] = useState(185000)
  const [valueLabel, setValueLabel] = useState('AED 185,000 in platform credits')
  const [cat, setCat] = useState('build')
  const [type, setType] = useState<'Software' | 'Service' | 'Both'>('Software')
  const [lifecycle, setLifecycle] = useState('Product')
  const [short, setShort] = useState('Cloud compute, database storage, and AI infrastructure.')
  const [about, setAbout] = useState('Access scalable compute, storage, databases, and AI models to accelerate your product development.')
  const [why, setWhy] = useState('Eliminates infrastructure cost bottlenecks so your engineering team can focus on shipping product.')
  const [whoFor, setWhoFor] = useState('Early and growth stage Hub71 startups with under $5M in external funding.')
  const [included, setIncluded] = useState<string[]>([
    'AED 185,000 in platform usage credits for 12 months',
    '1-on-1 architecture review session with senior solutions architect',
    'Priority 24/7 developer support and onboarding guide',
  ])
  const [newInc, setNewInc] = useState('')
  const [exclusive, setExclusive] = useState(true)
  const [redemption, setRedemption] = useState<'apply' | 'instant' | 'booking'>('apply')
  const [submitted, setSubmitted] = useState(false)

  const handleAddIncluded = () => {
    if (newInc.trim()) {
      setIncluded([...included, newInc.trim()])
      setNewInc('')
    }
  }

  const handleRemoveIncluded = (idx: number) => {
    setIncluded(included.filter((_, i) => i !== idx))
  }

  const handleAedChange = (val: number) => {
    setAed(val)
    if (!valueLabel || valueLabel.startsWith('AED ')) {
      setValueLabel(`AED ${val.toLocaleString()} in credits`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = (partner || 'partner').toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + Date.now().toString().slice(-4)
    const initials = partner.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'HB'
    const valueAED = Number(aed) || 10000
    const usd = Math.round(valueAED / 3.67)

    const newOffer: Offer = {
      id,
      icon,
      partner: partner || 'New Partner',
      initials,
      cat,
      type,
      lifecycle,
      usd,
      valueLabel: valueLabel || `AED ${valueAED.toLocaleString()}`,
      valueAED,
      exclusive,
      short,
      about,
      why,
      whoFor,
      included: included.length > 0 ? included : ['Full platform access', 'Dedicated founder onboarding'],
      website: website || 'hub71.com',
      hq: hq || 'Abu Dhabi, UAE',
      founded: founded || '2024',
      redemption,
      status: 'available',
      claimed: 0,
      contact: contact || 'Hub71 Partner Team',
      views: 1,
      clicks: 0,
      redemptions: 0,
    }

    addOffer(newOffer)
    setSubmitted(true)
    setTimeout(() => {
      navigate(isAdmin ? '/admin' : '/partner')
    }, 1200)
  }

  const IconComponent = partnerIcon(icon)
  const currentCategory = categories.find((c) => c.id === cat) || categories[0]
  const backRoute = isAdmin ? '/admin' : '/partner'

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 20px 80px' }}>
      {/* Top Breadcrumb & Page Head */}
      <div style={{ marginBottom: 28 }}>
        <Link
          to={backRoute}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: 12,
            textDecoration: 'none',
            transition: 'color 0.15s ease',
          }}
        >
          <ArrowLeft size={15} /> Back to {isAdmin ? 'Admin Console' : 'Partner Portal'}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: 'var(--text)', letterSpacing: '-0.5px' }}>
              {isAdmin ? 'Register Partner Perk Offer' : `Submit Perk Offer for ${partner}`}
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 0' }}>
              {isAdmin
                ? 'Onboard and publish a new partner offer to the Hub71 founder directory.'
                : 'Publish a curated startup perk offer to all founders across the Hub71 ecosystem.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to={backRoute} className="btn btn-ghost" style={{ padding: '0 18px', height: 42 }}>
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              className="cpc-claim-btn"
              style={{ height: 42, padding: '0 24px', fontSize: 13.5 }}
            >
              {submitted ? <CheckCircle2 size={16} /> : <ArrowRight size={15} />}
              <span>{submitted ? 'Published to Hub71!' : 'Publish Partner Offer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Spacious Form Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
        {/* Left: Spacious Form Cards */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Card 1: Partner Information */}
          <div className="card" style={{ padding: '28px 30px', borderRadius: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'color-mix(in srgb, #0066cc 12%, var(--surface))', color: '#0066cc', display: 'grid', placeItems: 'center' }}>
                <Building2 size={16} />
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                1. Partner Profile & Contact
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Partner / Company Name *
                  <HelpTooltip text="Official registered entity or startup program brand name." />
                </label>
                {isAdmin ? (
                  <input
                    className="input"
                    required
                    style={{ height: 42, fontSize: 14 }}
                    placeholder="e.g. Supabase, Datadog, Loom"
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                  />
                ) : (
                  <input className="input" disabled value={partner} style={{ height: 42, fontSize: 14, opacity: 0.8 }} />
                )}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Partner Website URL *
                  <HelpTooltip text="Link to the partner homepage or dedicated startup program portal." />
                </label>
                <input
                  className="input"
                  required
                  style={{ height: 42, fontSize: 14 }}
                  placeholder="e.g. supabase.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Headquarters / Location
                  <HelpTooltip text="Primary office or operational hub location." />
                </label>
                <input
                  className="input"
                  style={{ height: 42, fontSize: 14 }}
                  placeholder="e.g. Abu Dhabi, UAE"
                  value={hq}
                  onChange={(e) => setHq(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Partner Representative Contact *
                  <HelpTooltip text="Lead representative handling founder access requests and approvals." />
                </label>
                <input
                  className="input"
                  required
                  style={{ height: 42, fontSize: 14 }}
                  placeholder="e.g. Sarah Jenkins (Head of Startups)"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            {/* Logo / Icon Selector */}
            <div className="form-group" style={{ marginTop: 20 }}>
              <label className="form-label" style={{ fontSize: 13, marginBottom: 8 }}>
                Brand Icon
                <HelpTooltip text="Choose a symbol that best represents your tech stack or domain." />
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {AVAILABLE_ICONS.map((ico) => {
                  const I = partnerIcon(ico.id)
                  const active = icon === ico.id
                  return (
                    <button
                      key={ico.id}
                      type="button"
                      onClick={() => setIcon(ico.id)}
                      className={'icon-btn' + (active ? ' saved' : '')}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        border: active ? '1.5px solid #0066cc' : '1px solid var(--border)',
                        background: active ? 'color-mix(in srgb, #0066cc 15%, var(--surface))' : 'var(--surface-2)',
                        color: active ? '#0066cc' : 'var(--text)',
                        transition: 'all 0.15s ease',
                      }}
                      title={ico.label}
                    >
                      <I size={17} />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Card 2: Offer Valuation & Classification in AED */}
          <div className="card" style={{ padding: '28px 30px', borderRadius: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'color-mix(in srgb, #10b981 12%, var(--surface))', color: '#10b981', display: 'grid', placeItems: 'center' }}>
                <Coins size={16} />
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                2. Offer Valuation & Classification (AED)
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Offer Headline / Value Label *
                  <HelpTooltip text="Prominent headline shown on the perk card (e.g. AED 185,000 in credits, 90% off year one)." />
                </label>
                <input
                  className="input"
                  required
                  style={{ height: 42, fontSize: 14 }}
                  placeholder="e.g. AED 185,000 in platform credits"
                  value={valueLabel}
                  onChange={(e) => setValueLabel(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Estimated Value (AED) *
                  <HelpTooltip text="Total estimated value in UAE Dirham (AED) for program valuation and ecosystem metrics." />
                </label>
                <input
                  type="number"
                  className="input"
                  required
                  style={{ height: 42, fontSize: 14 }}
                  placeholder="e.g. 185000"
                  value={aed}
                  onChange={(e) => handleAedChange(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 18 }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Category *
                  <HelpTooltip text="Primary business domain for directory filtering." />
                </label>
                <select className="select" style={{ width: '100%', height: 42, fontSize: 13.5 }} value={cat} onChange={(e) => setCat(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Offer Type *
                  <HelpTooltip text="Specify whether this offer is Software, Advisory service, or Both." />
                </label>
                <select className="select" style={{ width: '100%', height: 42, fontSize: 13.5 }} value={type} onChange={(e) => setType(e.target.value as any)}>
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Target Stage *
                  <HelpTooltip text="Startup maturity level best suited to redeem this perk." />
                </label>
                <select className="select" style={{ width: '100%', height: 42, fontSize: 13.5 }} value={lifecycle} onChange={(e) => setLifecycle(e.target.value)}>
                  {lifecycles.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Perk Descriptions & Benefits */}
          <div className="card" style={{ padding: '28px 30px', borderRadius: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'color-mix(in srgb, #8b5cf6 12%, var(--surface))', color: '#8b5cf6', display: 'grid', placeItems: 'center' }}>
                <Sparkles size={16} />
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                3. Perk Content & Deliverables
              </h2>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Short Summary (Visible on Card) *
                <HelpTooltip text="1-2 concise sentences summarizing the value proposition." />
              </label>
              <input
                className="input"
                required
                style={{ height: 42, fontSize: 14 }}
                placeholder="e.g. Cloud compute, database storage, and AI infrastructure."
                value={short}
                onChange={(e) => setShort(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                About the Offer & Solution *
                <HelpTooltip text="In-depth details shown in the Quick Claim Drawer and detail view." />
              </label>
              <textarea
                className="textarea"
                rows={3}
                required
                style={{ fontSize: 13.5, lineHeight: 1.5 }}
                placeholder="Detailed description of what the platform provides..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Why Founders Need This
                  <HelpTooltip text="Key ROI, cost-savings, or operational benefit." />
                </label>
                <textarea
                  className="textarea"
                  rows={2}
                  style={{ fontSize: 13.5, lineHeight: 1.5 }}
                  placeholder="Key benefits and founder ROI..."
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                  Target Audience / Eligibility
                  <HelpTooltip text="Prerequisites or funding limits (e.g. under $3M raised)." />
                </label>
                <textarea
                  className="textarea"
                  rows={2}
                  style={{ fontSize: 13.5, lineHeight: 1.5 }}
                  placeholder="e.g. Hub71 startups with under $5M raised..."
                  value={whoFor}
                  onChange={(e) => setWhoFor(e.target.value)}
                />
              </div>
            </div>

            {/* What's Included Deliverables List */}
            <div className="form-group" style={{ marginTop: 18 }}>
              <label className="form-label" style={{ fontSize: 13, marginBottom: 8 }}>
                What's Included (Key Deliverables)
                <HelpTooltip text="Bullet points outlining credits, duration, features, and support." />
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {included.map((inc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <Check size={15} style={{ color: '#0066cc', flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: 'var(--text)', flex: 1 }}>{inc}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIncluded(i)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', padding: 4 }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <input
                    className="input"
                    style={{ height: 42, fontSize: 13.5 }}
                    placeholder="Add deliverable, e.g. 1 year free premium support..."
                    value={newInc}
                    onChange={(e) => setNewInc(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddIncluded(); } }}
                  />
                  <button type="button" className="btn btn-ghost" style={{ height: 42, padding: '0 18px' }} onClick={handleAddIncluded}>
                    <Plus size={15} /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Exclusivity Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 14,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                marginTop: 20,
                cursor: 'pointer',
              }}
              onClick={() => setExclusive(!exclusive)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Star size={18} fill={exclusive ? '#ff9500' : 'none'} color="#ff9500" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Exclusive to Hub71 Startups
                    <HelpTooltip text="Marks the perk as a specially negotiated Hub71-only offer." />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Special negotiated terms for Abu Dhabi ecosystem founders</div>
                </div>
              </div>
              <span className={'switch' + (exclusive ? ' on' : '')} />
            </div>
          </div>

          {/* Bottom Action Deck */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, paddingTop: 10 }}>
            <Link to={backRoute} className="btn btn-ghost" style={{ height: 44, padding: '0 20px' }}>
              Cancel
            </Link>
            <button type="submit" className="cpc-claim-btn" style={{ height: 44, padding: '0 28px', fontSize: 14 }}>
              {submitted ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
              <span>{submitted ? 'Published to Hub71!' : 'Publish Partner Offer'}</span>
            </button>
          </div>
        </form>

        {/* Right Sticky Column: Live Directory Preview */}
        <div style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} style={{ color: '#0066cc' }} /> Live Founder Directory Preview
          </div>

          {/* Live Card */}
          <div className="card classic-perk-card" style={{ background: 'var(--surface)', cursor: 'default', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
            <div className="cpc-header">
              <div className="cpc-brand">
                <div className="cpc-logo">
                  <IconComponent size={22} />
                </div>
                <div className="cpc-meta">
                  <h3 className="cpc-title">
                    {partner || 'Partner Name'}
                    {exclusive && (
                      <span className="cpc-excl-star">
                        <Sparkles size={11} />
                      </span>
                    )}
                  </h3>
                  <span className="cpc-cat">{currentCategory?.name}</span>
                </div>
              </div>
              <div className="icon-btn bookmark-btn">
                <Star size={14} />
              </div>
            </div>

            <div className="cpc-value-row">
              <span className="cpc-value">{valueLabel || `AED ${(aed || 0).toLocaleString()}`}</span>
            </div>

            <p className="cpc-desc">{short || 'Short perk description will appear here...'}</p>

            <div className="cpc-footer">
              <span className="tbadge tb-blue">
                <span className="bdot" />
                Available
              </span>
              <span className="cpc-claim-btn" style={{ pointerEvents: 'none' }}>
                Claim <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Verification Protocol Box */}
          <div style={{ background: 'var(--surface)', padding: 18, borderRadius: 16, border: '1px solid var(--border)', fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5, boxShadow: '0 6px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <ShieldCheck size={15} style={{ color: '#0066cc' }} /> Hub71 Verification Protocol
            </div>
            All registered partner offers are recorded in AED currency and automatically published across the Founder Directory, Admin Intelligence, and Partner Portal.
          </div>
        </div>
      </div>
    </div>
  )
}
