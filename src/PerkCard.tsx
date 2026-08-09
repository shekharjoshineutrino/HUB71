import { useNavigate } from 'react-router-dom'
import { ArrowRight, Bookmark, Sparkles } from 'lucide-react'
import { Offer, categoryById } from './data'
import { partnerIcon } from './icons'

const STATUS: Record<string, { label: string; cls: string }> = {
  available: { label: 'Available', cls: 'tb-blue' },
  requested: { label: 'Requested', cls: 'tb-amber' },
  redeemed: { label: 'Redeemed', cls: 'tb-green' },
}

export default function PerkCard({
  o,
  isSaved,
  onToggleSave,
  onQuickClaim,
}: {
  o: Offer
  showCat?: boolean
  isSaved?: boolean
  onToggleSave?: (id: string) => void
  onQuickClaim?: (o: Offer) => void
}) {
  const nav = useNavigate()
  const cat = categoryById(o.cat)
  const Icon = partnerIcon(o.icon)
  const st = STATUS[o.status] || STATUS.available

  const handleCardClick = () => {
    if (onQuickClaim) onQuickClaim(o)
    else nav(`/founder/offer/${o.id}`)
  }

  return (
    <div className="card classic-perk-card" onClick={handleCardClick}>
      {/* Top Header: Partner Logo + Title + Category + Bookmark */}
      <div className="cpc-header">
        <div className="cpc-brand">
          <div className="cpc-logo">
            {o.logoUrl ? (
              <img src={o.logoUrl} alt={o.partner} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }} />
            ) : (
              <Icon size={20} />
            )}
          </div>
          <div className="cpc-meta">
            <h3 className="cpc-title">
              {o.partner}
              {o.exclusive && (
                <span className="cpc-excl-star" title="Hub71 Exclusive Perk">
                  <Sparkles size={11} />
                </span>
              )}
            </h3>
            <span className="cpc-cat">{cat?.name}</span>
          </div>
        </div>

        <button
          className={'icon-btn bookmark-btn' + (isSaved ? ' saved' : '')}
          onClick={(e) => {
            e.stopPropagation()
            if (onToggleSave) onToggleSave(o.id)
          }}
          title={isSaved ? 'Remove from saved' : 'Save perk'}
          aria-label="Save perk"
        >
          <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content-Focused Value Callout */}
      <div className="cpc-value-row">
        <span className="cpc-value">{o.valueLabel}</span>
      </div>

      {/* 2-Line Muted Description */}
      <p className="cpc-desc">{o.short}</p>

      {/* Classic Minimal Footer: Status (Left) + Claim Pill (Right) */}
      <div className="cpc-footer">
        <span className={'tbadge ' + st.cls}>
          <span className="bdot" />
          {st.label}
        </span>

        <button className="cpc-claim-btn" onClick={handleCardClick}>
          {o.status === 'redeemed' ? 'Access' : 'Claim'} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}
