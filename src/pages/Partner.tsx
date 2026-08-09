import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, MousePointerClick, MessageSquare, AreaChart as AreaIco, LineChart as LineIco, BarChart3, Globe, Mail, CalendarDays, UserRound, TrendingUp, Inbox, SlidersHorizontal, Download, CheckCircle2, MoreVertical, Plus } from 'lucide-react'
import { ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme, chartColors, stillMode } from '../theme'
import { partnerMonthly, partnerRedemptions, currentPartner, categoryById, offerById, offers } from '../data'
import { partnerIcon } from '../icons'
import { VizTooltip, VizLegend } from '../ChartBits'

type Trend = 'area' | 'line' | 'bar'

function Metric({ icon, label, value, delta, tone }: { icon: React.ReactNode; label: string; value: string; delta?: string; tone: string }) {
  return (
    <div className="card metric">
      <div className="m-top">
        <div className="m-ico" style={{ background: `color-mix(in srgb, ${tone} 14%, var(--surface))`, color: tone }}>{icon}</div>
        {delta && <span className="delta up" style={{ color: tone, background: `color-mix(in srgb, ${tone} 12%, var(--surface))`, borderColor: `color-mix(in srgb, ${tone} 25%, transparent)` }}>{delta}</span>}
      </div>
      <div className="m-label">{label}</div>
      <div className="m-value">{value}</div>
    </div>
  )
}

export default function Partner() {
  const { theme } = useTheme()
  const c = chartColors(theme)
  const TONES = [c.s1, c.s2, c.s3, c.series[3]]
  const still = stillMode()
  const anim = { isAnimationActive: !still, animationDuration: 750, animationEasing: 'ease-out' as const }
  const [trend, setTrend] = useState<Trend>('area')

  const opts: { v: Trend; label: string; Icon: any }[] = [
    { v: 'area', label: 'Area', Icon: AreaIco },
    { v: 'line', label: 'Line', Icon: LineIco },
    { v: 'bar', label: 'Bar', Icon: BarChart3 },
  ]

  const p = currentPartner
  const pcat = categoryById(p.cat)
  const pcg = pcat?.g1 || '#2260e6'

  return (
    <>
      <div className="card partner-hero">
        <div className="ph-main">
          <div className="avatar xl" style={{ background: `linear-gradient(135deg, ${pcat?.g1}, ${pcat?.g2})`, color: '#fff', boxShadow: `0 8px 20px ${pcg}44` }}>
            {(() => { const I = partnerIcon(offerById(p.id)?.icon); return <I size={26} /> })()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="ph-top">
              <h1 className="ph-name">{p.name}</h1>
              <span className="status responded">{p.status}</span>
              <span className="badge" style={{ background: `color-mix(in srgb, ${pcg} 12%, var(--surface))`, color: pcg, borderColor: 'transparent' }}>{p.tier}</span>
            </div>
            <div className="ph-meta">
              <span className="badge">{pcat?.name}</span>
              <span><Globe size={12} /> {p.website}</span>
              <span><Mail size={12} /> {p.contact}</span>
              <span><CalendarDays size={12} /> Partner since {p.since}</span>
              <span><UserRound size={12} /> Hub71 contact: {p.manager}</span>
            </div>
          </div>
        </div>
        <div className="ph-side" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="ph-stat"><span className="ph-k">Offers live</span><span className="ph-v">{p.offersLive}</span></div>
            <div className="ph-div" />
            <div className="ph-stat"><span className="ph-k">Offer value</span><span className="ph-v" style={{ color: pcg }}>{p.valueLabel}</span></div>
          </div>
          <Link
            to="/partner/register-offer"
            className="cpc-claim-btn"
            style={{ height: 36, padding: '0 16px', fontSize: 12.5, gap: 6, textDecoration: 'none' }}
          >
            <Plus size={14} /> Submit New Perk Offer
          </Link>
        </div>
      </div>

      <div className="grid metrics section-gap">
        <Metric tone={TONES[0]} icon={<Eye size={18} />} label="Offer views (30d)" value="214" delta="+20%" />
        <Metric tone={TONES[1]} icon={<MousePointerClick size={18} />} label="Clicks" value="96" delta="+9%" />
        <Metric tone={TONES[2]} icon={<MessageSquare size={18} />} label="Queries Submitted" value="14" delta="+8%" />
        <Metric tone={TONES[3]} icon={<CheckCircle2 size={18} />} label="Click-to-Query Rate" value="14.5%" />
      </div>

      <div className="section-gap">
        <div className="card card-pad viz-pop">
          <div className="card-head">
            <div className="card-title"><TrendingUp size={15} /> Engagement over time</div>
            <div className="seg">
              {opts.map(({ v, label, Icon }) => (
                <button key={v} className={trend === v ? 'on' : ''} onClick={() => setTrend(v)}><Icon size={13} /> {label}</button>
              ))}
            </div>
          </div>
          <VizLegend items={[
            { name: 'Views', color: TONES[0], value: '214' },
            { name: 'Clicks', color: TONES[1], value: '96' },
            { name: 'Queries', color: TONES[2], value: '14' },
          ]} />
          <ResponsiveContainer width="100%" height={220} key={trend}>
            <ComposedChart data={partnerMonthly} margin={{ left: -16, right: 8, top: 10 }} barGap={2}>
              <defs>
                <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TONES[0]} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={TONES[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={c.grid} strokeWidth={1} vertical={false} />
              <XAxis dataKey="month" stroke={c.axis} tickLine={false} axisLine={false} dy={6} tick={{ fontSize: 11 }} />
              <YAxis stroke={c.axis} tickLine={false} axisLine={false} width={40} tick={{ fontSize: 11 }} />
              <Tooltip content={<VizTooltip />} cursor={{ stroke: c.axis, strokeWidth: 1, strokeOpacity: 0.45 }} />

              {trend === 'area' && <>
                <Area type="monotone" dataKey="views" name="Views" stroke={TONES[0]} strokeWidth={2} fill="url(#pv)" {...anim} activeDot={{ r: 4, strokeWidth: 2, stroke: c.tooltip }} />
                <Line type="monotone" dataKey="clicks" name="Clicks" stroke={TONES[1]} strokeWidth={2} dot={false} {...anim} activeDot={{ r: 4, strokeWidth: 2, stroke: c.tooltip }} />
                <Line type="monotone" dataKey="redemptions" name="Queries" stroke={TONES[2]} strokeWidth={2} dot={false} {...anim} activeDot={{ r: 4, strokeWidth: 2, stroke: c.tooltip }} />
              </>}
              {trend === 'line' && ['views', 'clicks', 'redemptions'].map((k, i) => (
                <Line key={k} type="monotone" dataKey={k} name={k === 'redemptions' ? 'Queries' : k[0].toUpperCase() + k.slice(1)} stroke={TONES[i]} strokeWidth={2} dot={false} {...anim} activeDot={{ r: 4, strokeWidth: 2, stroke: c.tooltip }} />
              ))}
              {trend === 'bar' && ['views', 'clicks', 'redemptions'].map((k, i) => (
                <Bar key={k} dataKey={k} name={k === 'redemptions' ? 'Queries' : k[0].toUpperCase() + k.slice(1)} fill={TONES[i]} radius={[4, 4, 0, 0]} maxBarSize={14} {...anim} />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card tbl-card section-gap">
        <div className="tbl-head">
          <span className="tbl-title"><Inbox size={15} /> Queries received <span className="tbl-count">{partnerRedemptions.length}</span></span>
          <div className="tbl-actions">
            <button className="btn btn-ghost btn-sm"><SlidersHorizontal size={14} /> Filters</button>
            <button className="btn btn-primary btn-sm"><Download size={14} /> Export</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table2">
            <thead>
              <tr><th>Startup</th><th>Offer</th><th>Date</th><th>Status</th><th style={{ width: 44 }}></th></tr>
            </thead>
            <tbody>
              {partnerRedemptions.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div className="cell-id">
                      <div className="avatar" style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--brand-text)', fontSize: 11 }}>
                        {r.founder.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="ci-name">{r.founder}</div>
                        <div className="ci-sub">{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{r.offer}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                  <td><span className="tbadge tb-blue"><i className="bdot" /> Query sent</span></td>
                  <td><button className="kebab" aria-label="Row actions"><MoreVertical size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tbl-foot">
          <span className="tf-info">Showing 1–{partnerRedemptions.length} of {partnerRedemptions.length}</span>
          <div className="pager"><button>Prev</button><button className="on">1</button><button>Next</button></div>
        </div>
      </div>
    </>
  )
}
