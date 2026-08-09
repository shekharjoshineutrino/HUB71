import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Check, Star, Users, Building2, Globe, MapPin, Calendar, ShieldCheck, ArrowRight, ExternalLink, Send } from 'lucide-react'
import { Offer, categoryById, cohortSize } from './data'
import { partnerIcon } from './icons'

export default function QuickClaimDrawer({
  offer,
  close,
}: {
  offer: Offer | null
  close: () => void
}) {
  const nav = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('team@falcon.ai')
  const [note, setNote] = useState('')

  if (!offer) return null

  const cat = categoryById(offer.cat)
  const g1 = cat?.g1 || 'var(--brand)'
  const Icon = partnerIcon(offer.icon)
  const pct = Math.round((offer.claimed / cohortSize) * 100)
  const initials = offer.contact.split(' ').map((w) => w[0]).join('').slice(0, 2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <div className="drawer-overlay" onClick={close} />
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div className="ohero-logo" style={{ color: g1, width: 44, height: 44, borderRadius: 12 }}>
            <Icon size={22} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 className="drawer-title">{offer.partner}</h2>
              {offer.exclusive && (
                <span className="tbadge tb-amber">
                  <Star size={10} /> Exclusive
                </span>
              )}
            </div>
            <div className="perk2-cat" style={{ marginTop: 2 }}>
              <i className="cdot" style={{ background: g1 }} /> {cat?.name} · {offer.type}
            </div>
          </div>
          <button className="icon-btn" onClick={close} aria-label="Close drawer">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Offer Value Banner */}
          <div className="drawer-banner" style={{ background: `linear-gradient(135deg, ${g1}, color-mix(in srgb, ${g1} 60%, #1e293b))` }}>
            <div className="db-value">{offer.valueLabel}</div>
            <div className="db-desc">{offer.short}</div>
          </div>

          {/* Progress bar */}
          <div className="perk2-prog" style={{ marginTop: 16, marginBottom: 16 }}>
            <div className="pp-head">
              <span className="pp-k">
                <Users size={12} /> {offer.claimed} of {cohortSize} startups claimed
              </span>
              <span className="pp-v">{pct}%</span>
            </div>
            <div className="pp-track">
              <div className="pp-fill" style={{ width: `${pct}%`, background: g1 }} />
            </div>
          </div>

          {/* Key Details */}
          <div className="drawer-sec">
            <div className="oblock-h">What's Included</div>
            <ul className="inc-list">
              {offer.included.map((item, idx) => (
                <li key={idx}>
                  <Check size={15} style={{ color: 'var(--green)' }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="drawer-sec">
            <div className="oblock-h">About the Offer</div>
            <p className="offer-p">{offer.about}</p>
          </div>

          {/* Request Form */}
          <div className="drawer-sec" style={{ background: 'var(--surface-2)', padding: 16, borderRadius: 14, border: '1px solid var(--border)' }}>
            <div className="ar-head">
              <Send size={15} color="var(--brand)" /> Request Perk Access
            </div>

            {submitted ? (
              <div className="access-reveal">
                <div className="ar-head" style={{ color: 'var(--green)' }}>
                  <Check size={18} /> Access Request Sent!
                </div>
                <p className="rc-note-p">
                  Your query has been recorded and transmitted to <strong>{offer.partner}</strong>. They will reach out to <strong>{email}</strong> directly.
                </p>
                <button
                  className="btn btn-ghost btn-sm btn-block"
                  style={{ marginTop: 12 }}
                  onClick={() => setSubmitted(false)}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Work Email</label>
                  <input
                    type="email"
                    className="input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Note to Partner (Optional)</label>
                  <textarea
                    className="textarea"
                    rows={3}
                    placeholder={`Hi ${offer.partner} team, we'd like to redeem the ${offer.valueLabel} perk for Falcon AI.`}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-hero btn-block" style={{ marginTop: 12 }}>
                  Submit Access Request <ArrowRight size={15} />
                </button>
              </form>
            )}

            <div className="note-box" style={{ marginTop: 12 }}>
              <ShieldCheck size={14} /> Hub71 records this request for analytics without storing your private correspondence.
            </div>
          </div>

          {/* Partner Info */}
          <div className="drawer-sec" style={{ marginTop: 16 }}>
            <div className="oblock-h" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
              Partner Contact
            </div>
            <div style={{ padding: '12px 14px', borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `color-mix(in srgb, ${g1} 14%, var(--surface))`,
                    color: g1,
                    border: `1px solid color-mix(in srgb, ${g1} 28%, transparent)`,
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: '0.5px',
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {offer.contact}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                    {offer.partner} Representative
                  </div>
                </div>
              </div>

              <button
                className="btn btn-ghost btn-sm"
                style={{ borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, flexShrink: 0 }}
                onClick={() => {
                  close()
                  nav(`/founder/offer/${offer.id}`)
                }}
              >
                Full details <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
