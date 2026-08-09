import { useState } from 'react'
import {
  X, Sparkles, Building2, Globe, Mail, DollarSign, Layers, Rocket,
  CheckCircle2, ArrowRight, Star, ShieldCheck, Plus, Trash2, Coins,
} from 'lucide-react'
import { Offer, categories, types, lifecycles, addOffer } from './data'
import { partnerIcon } from './icons'

const AVAILABLE_ICONS = [
  { id: 'sparkles', label: 'AI / Innovation' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'server', label: 'Infrastructure' },
  { id: 'shield', label: 'Security' },
  { id: 'code', label: 'Developer' },
  { id: 'git-branch', label: 'Code Repo' },
  { id: 'key', label: 'Auth & Access' },
  { id: 'wallet', label: 'Fintech / Banking' },
  { id: 'credit-card', label: 'Cards / Payments' },
  { id: 'scale', label: 'Legal / Advisory' },
  { id: 'megaphone', label: 'Marketing' },
  { id: 'mail', label: 'Email / Comms' },
  { id: 'users', label: 'HR / Payroll' },
  { id: 'notebook', label: 'Docs / Workspace' },
  { id: 'table', label: 'Database / No-Code' },
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

export default function RegisterOfferModal({
  isOpen,
  onClose,
  isAdmin = false,
  partnerName = '',
  onSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  isAdmin?: boolean
  partnerName?: string
  onSuccess?: (offer: Offer) => void
}) {
  const [partner, setPartner] = useState(partnerName || (isAdmin ? '' : 'Google Cloud'))
  const [website, setWebsite] = useState(isAdmin ? '' : 'cloud.google.com/startup')
  const [hq, setHq] = useState(isAdmin ? 'Abu Dhabi, UAE' : 'Mountain View, US')
  const [founded, setFounded] = useState('2020')
  const [contact, setContact] = useState(isAdmin ? '' : 'Jordan Reyes')
  const [icon, setIcon] = useState('sparkles')

  // Offer fields in AED
  const [aed, setAed] = useState(185000)
  const [valueLabel, setValueLabel] = useState('AED 185,000 in credits')
  const [cat, setCat] = useState('build')
  const [type, setType] = useState<'Software' | 'Service' | 'Both'>('Software')
  const [lifecycle, setLifecycle] = useState('Product')
  const [short, setShort] = useState('Cloud compute, dedicated technical support, and founder onboarding.')
  const [about, setAbout] = useState('Access scalable cloud compute, storage, and developer APIs to accelerate your startup roadmap.')
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

  if (!isOpen) return null

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
    if (onSuccess) onSuccess(newOffer)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 1200)
  }

  const IconComponent = partnerIcon(icon)
  const currentCategory = categories.find((c) => c.id === cat) || categories[0]

  return (
    <div className="frail-scrim" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200, padding: 16 }}>
      <div
        className="card reg-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 960,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 24,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          animation: 'vizFadeUp 0.25s cubic-bezier(0.2,0.7,0.3,1)',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Building2 size={18} style={{ color: '#0066cc' }} />
              <h2 style={{ fontSize: 16.5, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                {isAdmin ? 'Register New Partner Perk Offer' : `Register Perk Offer for ${partner}`}
              </h2>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
              {isAdmin
                ? 'Onboard and publish a new partner offer to the Hub71 founder directory on behalf of a partner.'
                : 'Publish a new startup perk offer to all founders in the Hub71 ecosystem.'}
            </p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={17} />
          </button>
        </div>

        {/* Modal Body: Split Form + Live Card Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0, overflow: 'hidden', flex: 1 }}>
          {/* Left: Scrollable Minimalist Form */}
          <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Section 1: Partner Information */}
            <div className="reg-section">
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Building2 size={13} /> 1. Partner Profile & Contact
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">
                    Partner / Company Name *
                    <HelpTooltip text="Official registered entity or brand name." />
                  </label>
                  {isAdmin ? (
                    <input
                      className="input"
                      required
                      placeholder="e.g. Supabase, Datadog, Loom"
                      value={partner}
                      onChange={(e) => setPartner(e.target.value)}
                    />
                  ) : (
                    <input className="input" disabled value={partner} style={{ opacity: 0.8 }} />
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Partner Website URL *
                    <HelpTooltip text="Link to partner homepage or dedicated startup portal." />
                  </label>
                  <input
                    className="input"
                    required
                    placeholder="e.g. supabase.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Headquarters / Location
                    <HelpTooltip text="Primary office or operational hub location." />
                  </label>
                  <input
                    className="input"
                    placeholder="e.g. Abu Dhabi, UAE"
                    value={hq}
                    onChange={(e) => setHq(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Partner Representative Contact *
                    <HelpTooltip text="Lead representative handling founder access requests." />
                  </label>
                  <input
                    className="input"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              {/* Logo / Icon Selector */}
              <div className="form-group" style={{ marginTop: 10 }}>
                <label className="form-label">
                  Brand Icon
                  <HelpTooltip text="Choose a symbol that best represents your tech stack or domain." />
                </label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
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
                          width: 34,
                          height: 34,
                          borderRadius: 9,
                          border: active ? '1px solid #0066cc' : '1px solid var(--border)',
                          background: active ? 'color-mix(in srgb, #0066cc 15%, var(--surface))' : 'var(--surface-2)',
                          color: active ? '#0066cc' : 'var(--text)',
                        }}
                        title={ico.label}
                      >
                        <I size={15} />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Section 2: Offer Specifications in AED */}
            <div className="reg-section">
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Coins size={13} /> 2. Offer Value & Classification (AED)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">
                    Offer Headline / Value Label *
                    <HelpTooltip text="Prominent headline shown on the perk card (e.g. AED 185,000 in credits, 90% off year one)." />
                  </label>
                  <input
                    className="input"
                    required
                    placeholder="e.g. AED 185,000 in platform credits"
                    value={valueLabel}
                    onChange={(e) => setValueLabel(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Estimated Value (AED) *
                    <HelpTooltip text="Total estimated value in UAE Dirham (AED) for program valuation and analytics." />
                  </label>
                  <input
                    type="number"
                    className="input"
                    required
                    placeholder="e.g. 185000"
                    value={aed}
                    onChange={(e) => handleAedChange(Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 10 }}>
                <div className="form-group">
                  <label className="form-label">
                    Category *
                    <HelpTooltip text="Primary business domain for directory filtering." />
                  </label>
                  <select className="select" style={{ width: '100%' }} value={cat} onChange={(e) => setCat(e.target.value)}>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Offer Type *
                    <HelpTooltip text="Specify whether this offer is Software, Advisory service, or Both." />
                  </label>
                  <select className="select" style={{ width: '100%' }} value={type} onChange={(e) => setType(e.target.value as any)}>
                    {types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Target Stage *
                    <HelpTooltip text="Startup maturity level best suited to redeem this perk." />
                  </label>
                  <select className="select" style={{ width: '100%' }} value={lifecycle} onChange={(e) => setLifecycle(e.target.value)}>
                    {lifecycles.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Perk Descriptions & Benefits */}
            <div className="reg-section">
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={13} /> 3. Perk Content & Eligibility
              </div>

              <div className="form-group">
                <label className="form-label">
                  Short Summary (Visible on Card) *
                  <HelpTooltip text="1-2 concise sentences summarizing the value proposition." />
                </label>
                <input
                  className="input"
                  required
                  placeholder="e.g. Cloud compute, database storage, and AI infrastructure."
                  value={short}
                  onChange={(e) => setShort(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginTop: 10 }}>
                <label className="form-label">
                  About the Offer & Solution *
                  <HelpTooltip text="In-depth details shown in the Quick Claim Drawer." />
                </label>
                <textarea
                  className="textarea"
                  rows={2}
                  required
                  placeholder="Detailed description of what the platform provides..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
                <div className="form-group">
                  <label className="form-label">
                    Why Founders Need This
                    <HelpTooltip text="Key ROI, cost-savings, or operational benefit." />
                  </label>
                  <textarea
                    className="textarea"
                    rows={2}
                    placeholder="Key benefits and founder ROI..."
                    value={why}
                    onChange={(e) => setWhy(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Target Audience / Eligibility
                    <HelpTooltip text="Prerequisites or funding limits (e.g. under $3M raised)." />
                  </label>
                  <textarea
                    className="textarea"
                    rows={2}
                    placeholder="e.g. Hub71 startups with under $5M raised..."
                    value={whoFor}
                    onChange={(e) => setWhoFor(e.target.value)}
                  />
                </div>
              </div>

              {/* What's Included Bullets */}
              <div className="form-group" style={{ marginTop: 10 }}>
                <label className="form-label">
                  What's Included (Key Deliverables)
                  <HelpTooltip text="Bullet points outlining credits, duration, features, and support." />
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {included.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#0066cc', fontWeight: 800 }}>•</span>
                      <span style={{ fontSize: 13, color: 'var(--text)', flex: 1 }}>{inc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIncluded(i)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', padding: 2 }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <input
                      className="input"
                      placeholder="Add deliverable, e.g. 1 year free premium support..."
                      value={newInc}
                      onChange={(e) => setNewInc(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddIncluded(); } }}
                    />
                    <button type="button" className="btn btn-ghost btn-sm" onClick={handleAddIncluded}>
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Hub71 Exclusivity Checkbox */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  marginTop: 12,
                  cursor: 'pointer',
                }}
                onClick={() => setExclusive(!exclusive)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Star size={16} fill={exclusive ? '#ff9500' : 'none'} color="#ff9500" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      Exclusive to Hub71 Startups
                      <HelpTooltip text="Marks the perk as a specially negotiated Hub71-only offer." />
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Special negotiated terms for Abu Dhabi founders</div>
                  </div>
                </div>
                <span className={'switch' + (exclusive ? ' on' : '')} />
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, marginTop: 10, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="cpc-claim-btn" style={{ height: 42, padding: '0 22px', fontSize: 13 }}>
                {submitted ? <CheckCircle2 size={16} /> : <ArrowRight size={15} />}
                <span>{submitted ? 'Published to Hub71!' : 'Publish Partner Offer'}</span>
              </button>
            </div>
          </form>

          {/* Right: Live Preview Panel */}
          <div style={{ background: 'var(--surface-2)', borderLeft: '1px solid var(--border)', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={13} style={{ color: '#0066cc' }} /> Live Founder Directory Preview
            </div>

            {/* Live Card */}
            <div className="card classic-perk-card" style={{ background: 'var(--surface)', cursor: 'default' }}>
              <div className="cpc-header">
                <div className="cpc-brand">
                  <div className="cpc-logo">
                    <IconComponent size={20} />
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

            <div style={{ background: 'var(--surface)', padding: 14, borderRadius: 14, border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={14} style={{ color: '#0066cc' }} /> Hub71 Verification Protocol
              </div>
              All registered offers are recorded in AED currency and automatically published across the Founder Directory, Admin Intelligence, and Partner Portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
