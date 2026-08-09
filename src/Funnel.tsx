import { Filter, TrendingUp } from 'lucide-react'

const TONES = ['var(--brand)', '#6366f1', 'var(--green)']

export default function Funnel({
  views,
  clicks,
  redemptions,
  note,
}: {
  views: number
  clicks: number
  redemptions: number
  note?: string
}) {
  const pct = (n: number) => (views ? Math.round((n / views) * 100) : 0)
  const fmt = (n: number) => n.toLocaleString('en-US')

  const steps = [
    { label: 'Total Views', v: views, p: 100, tone: TONES[0] },
    { label: 'Offer Clicks', v: clicks, p: pct(clicks), tone: TONES[1] },
    { label: 'Perk Claims', v: redemptions, p: pct(redemptions), tone: TONES[2] },
  ]

  const viewToClickRatio = views ? Math.round((clicks / views) * 100) : 0
  const clickToRedeemRatio = clicks ? Math.round((redemptions / clicks) * 100) : 0
  const overallRatio = pct(redemptions)

  return (
    <div className="card card-pad panel viz-pop">
      <div className="card-head">
        <div className="card-title">
          <Filter size={16} /> Conversion Funnel Pipeline
        </div>
        <span className="tbadge tb-blue">
          <TrendingUp size={12} /> {overallRatio}% Conversion
        </span>
      </div>

      <div className="funnel viz-bars">
        {steps.map((s) => (
          <div key={s.label} className="fnl-row">
            <span className="fnl-label">{s.label}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${s.p}%`,
                  background: `linear-gradient(90deg, ${s.tone}, color-mix(in srgb, ${s.tone} 65%, #ffffff))`,
                  boxShadow: `0 2px 8px color-mix(in srgb, ${s.tone} 30%, transparent)`,
                }}
              />
            </div>
            <span className="fnl-val">
              {fmt(s.v)} <em>{s.p}%</em>
            </span>
          </div>
        ))}
      </div>

      <div className="fnl-steps">
        <div className="fstep">
          <span className="fs-k">View → Click</span>
          <span className="fs-v">{viewToClickRatio}%</span>
        </div>
        <span className="fstep-div" />
        <div className="fstep">
          <span className="fs-k">Click → Redeem</span>
          <span className="fs-v">{clickToRedeemRatio}%</span>
        </div>
        <span className="fstep-div" />
        <div className="fstep">
          <span className="fs-k">Total Efficiency</span>
          <span className="fs-v" style={{ color: TONES[2] }}>
            {overallRatio}%
          </span>
        </div>
      </div>

      {note && <div className="fnl-note">{note}</div>}
    </div>
  )
}
