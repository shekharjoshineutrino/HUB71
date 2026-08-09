import { useState, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  ArrowLeft, Building2, Globe, Mail, Coins, Sparkles, CheckCircle2,
  ArrowRight, Star, ShieldCheck, Plus, Trash2, Check, Upload,
  UserRound, Briefcase, MapPin, Calendar, FileText, Send, X, Image as ImageIcon,
} from 'lucide-react'
import { Offer, categories, types, lifecycles, addOffer, currentPartner } from '../data'

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

  // Section 1: Partner Organization
  const [partner, setPartner] = useState(defaultPartner)
  const [website, setWebsite] = useState(isAdmin ? '' : currentPartner.website || 'cloud.google.com/startup')
  const [hq, setHq] = useState(isAdmin ? 'Abu Dhabi, UAE' : 'Mountain View, US')
  const [founded, setFounded] = useState('2020')
  const [contact, setContact] = useState(isAdmin ? '' : currentPartner.contact || 'Jordan Reyes')
  const [contactEmail, setContactEmail] = useState(isAdmin ? '' : 'jordan.reyes@google.com')
  const [contactRole, setContactRole] = useState('Head of Global Startup Ecosystem')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Section 2: Offer Valuation & Classification in AED
  const [valueLabel, setValueLabel] = useState('AED 185,000 in platform credits')
  const [aed, setAed] = useState(185000)
  const [cat, setCat] = useState('ai')
  const [type, setType] = useState<'Software' | 'Service' | 'Both'>('Software')
  const [lifecycle, setLifecycle] = useState('Product')

  // Section 3: Perk Content & Deliverables
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

  // Section 4: Redemption & Exclusivity
  const [redemption, setRedemption] = useState<'apply' | 'instant' | 'booking'>('apply')
  const [redemptionUrl, setRedemptionUrl] = useState('https://cloud.google.com/startup/hub71')
  const [exclusive, setExclusive] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoUrl(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

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
      icon: cat === 'ai' ? 'sparkles' : cat === 'cloud' ? 'cloud' : 'server',
      logoUrl: logoUrl || undefined,
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
      redemptionUrl,
      status: 'available',
      claimed: 0,
      contact: contact || 'Hub71 Partner Team',
      contactEmail: contactEmail || 'partner@hub71.com',
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

  const backRoute = isAdmin ? '/admin' : '/partner'

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px 80px' }}>
      {/* Top Header & Actions */}
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
            marginBottom: 14,
            textDecoration: 'none',
            transition: 'color 0.15s ease',
          }}
        >
          <ArrowLeft size={15} /> Back to {isAdmin ? 'Admin Console' : 'Partner Portal'}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: 'var(--text)', letterSpacing: '-0.5px' }}>
              {isAdmin ? 'Partner & Offer Onboarding' : `Submit Perk Offer for ${partner}`}
            </h1>
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: '4px 0 0' }}>
              Register and onboard a partner offer to the Hub71 ecosystem.
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

      {/* Spacious Single-Column Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Section 1: Partner Organization & Contact */}
        <div className="card" style={{ padding: '32px 34px', borderRadius: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'color-mix(in srgb, #0066cc 12%, var(--surface))', color: '#0066cc', display: 'grid', placeItems: 'center' }}>
              <Building2 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                1. Partner Profile & Contact Information
              </h2>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Entity details and primary ecosystem contact</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Partner / Company Name *
                <HelpTooltip text="Official registered company or brand name." />
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
          </div>

          {/* Logo / Brand Icon Upload Box */}
          <div className="form-group" style={{ marginTop: 20 }}>
            <label className="form-label" style={{ fontSize: 13, marginBottom: 8 }}>
              Partner Logo / Brand Asset *
              <HelpTooltip text="Upload PNG, SVG, or JPG image logo for the founder directory card." />
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0])
                }
              }}
            />

            {logoUrl ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', overflow: 'hidden', padding: 6 }}>
                  <img src={logoUrl} alt="Logo preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)' }}>Logo Uploaded Successfully</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Visible on the founder directory perk card and claim drawers</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Logo
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setLogoUrl(null)}
                    aria-label="Remove logo"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragging ? '2px dashed #0066cc' : '2px dashed var(--border)',
                  borderRadius: 16,
                  padding: '24px 20px',
                  textAlign: 'center',
                  background: isDragging ? 'color-mix(in srgb, #0066cc 8%, var(--surface))' : 'var(--surface-2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface)', margin: '0 auto 10px', display: 'grid', placeItems: 'center', color: 'var(--brand)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <Upload size={20} />
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)' }}>
                  Click to upload logo or drag & drop
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  SVG, PNG, JPG (recommended 200x200px or transparent background)
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Primary Contact Name *
                <HelpTooltip text="Lead representative handling founder access requests and approvals." />
              </label>
              <input
                className="input"
                required
                style={{ height: 42, fontSize: 14 }}
                placeholder="e.g. Sarah Jenkins"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Primary Contact Email *
                <HelpTooltip text="Official partner email for Hub71 query notifications and introductions." />
              </label>
              <input
                type="email"
                className="input"
                required
                style={{ height: 42, fontSize: 14 }}
                placeholder="e.g. sarah.jenkins@partner.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Designation / Role
                <HelpTooltip text="Contact role title, e.g. Head of Startups, Partnership Director." />
              </label>
              <input
                className="input"
                style={{ height: 42, fontSize: 14 }}
                placeholder="e.g. Head of Global Startups"
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
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
                placeholder="e.g. Abu Dhabi, UAE / San Francisco, US"
                value={hq}
                onChange={(e) => setHq(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Offer Valuation & Classification */}
        <div className="card" style={{ padding: '32px 34px', borderRadius: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'color-mix(in srgb, #10b981 12%, var(--surface))', color: '#10b981', display: 'grid', placeItems: 'center' }}>
              <Coins size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                2. Perk Valuation & Classification (AED)
              </h2>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Financial terms, category, and target maturity stage</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Offer Title / Headline Label *
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 20 }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Primary Category *
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

        {/* Section 3: Perk Content & Deliverables */}
        <div className="card" style={{ padding: '32px 34px', borderRadius: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'color-mix(in srgb, #8b5cf6 12%, var(--surface))', color: '#8b5cf6', display: 'grid', placeItems: 'center' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                3. Perk Content, Benefits & Eligibility
              </h2>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Descriptive content shown to founders in the perk catalog</div>
            </div>
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

          <div className="form-group" style={{ marginTop: 18 }}>
            <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
              Detailed Offer Description & Overview *
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 18 }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Why Hub71 Founders Need This
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
                Eligibility & Requirements *
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
          <div className="form-group" style={{ marginTop: 20 }}>
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
        </div>

        {/* Section 4: Redemption Protocol & Exclusivity */}
        <div className="card" style={{ padding: '32px 34px', borderRadius: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'color-mix(in srgb, #f59e0b 12%, var(--surface))', color: '#f59e0b', display: 'grid', placeItems: 'center' }}>
              <Send size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                4. Redemption Protocol & Exclusivity
              </h2>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>How founders claim the offer and special ecosystem agreements</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Redemption Method *
                <HelpTooltip text="Specify whether founders apply, receive instant codes, or book a consultation." />
              </label>
              <select
                className="select"
                style={{ width: '100%', height: 42, fontSize: 13.5 }}
                value={redemption}
                onChange={(e) => setRedemption(e.target.value as any)}
              >
                <option value="apply">Apply & Request Access (Reviewed by Partner)</option>
                <option value="instant">Instant Code / Direct Access Link</option>
                <option value="booking">Book Advisory Session / Consultation</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: 13, marginBottom: 6 }}>
                Redemption URL or Instructions *
                <HelpTooltip text="Direct landing page or promo code link for Hub71 founders." />
              </label>
              <input
                className="input"
                required
                style={{ height: 42, fontSize: 14 }}
                placeholder="e.g. https://partner.com/startups/hub71"
                value={redemptionUrl}
                onChange={(e) => setRedemptionUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Exclusivity Toggle Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 22px',
              borderRadius: 14,
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              marginTop: 20,
              cursor: 'pointer',
            }}
            onClick={() => setExclusive(!exclusive)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Star size={20} fill={exclusive ? '#ff9500' : 'none'} color="#ff9500" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Exclusive to Hub71 Startups
                  <HelpTooltip text="Marks the perk as a specially negotiated Hub71-only offer." />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Special negotiated commercial terms for Abu Dhabi ecosystem founders</div>
              </div>
            </div>
            <span className={'switch' + (exclusive ? ' on' : '')} />
          </div>
        </div>

        {/* Bottom Submission Action Deck */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, paddingTop: 10 }}>
          <Link to={backRoute} className="btn btn-ghost" style={{ height: 46, padding: '0 24px', fontSize: 14 }}>
            Cancel
          </Link>
          <button type="submit" className="cpc-claim-btn" style={{ height: 46, padding: '0 32px', fontSize: 14.5 }}>
            {submitted ? <CheckCircle2 size={17} /> : <ArrowRight size={17} />}
            <span>{submitted ? 'Published to Hub71!' : 'Publish Partner Offer'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
