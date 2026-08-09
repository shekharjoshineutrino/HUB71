import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, MousePointerClick, MessageSquare, Wallet, Bell, AreaChart as AreaIco, LineChart as LineIco, BarChart3, PieChart as PieIco, Donut, TrendingUp, PieChart as PieHead, Trophy, Table2, CheckCircle2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import {
  ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { useTheme, chartColors, stillMode } from '../theme'
import { partnerIcon } from '../icons'
import { VizTooltip, SliceTooltip, VizLegend } from '../ChartBits'
import { monthly, offers, categories, categoryById, kpis, fmt, currentUser } from '../data'

type Trend = 'area' | 'line' | 'bar'
type CatView = 'bars' | 'donut' | 'pie'

function Metric({
  icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  delta?: string
  tone: string
}) {
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

function Seg<T extends string>({ value, onChange, opts }: { value: T; onChange: (v: T) => void; opts: { v: T; label: string; Icon: any }[] }) {
  return (
    <div className="seg">
      {opts.map(({ v, label, Icon }) => (
        <button key={v} className={value === v ? 'on' : ''} onClick={() => onChange(v)} title={label}>
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  )
}

export default function Admin() {
  const { theme } = useTheme()
  const c = chartColors(theme)
  const TONES = [c.s1, c.s2, c.s3, c.series[3]]
  const still = stillMode()
  const anim = { isAnimationActive: !still, animationDuration: 750, animationEasing: 'ease-out' as const }
  const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams()
  const [partner, setPartner] = useState(params.get('partner') || '')
  const [cat, setCat] = useState(params.get('cat') || '')
  const [trend, setTrend] = useState<Trend>((params.get('trend') as Trend) || 'area')
  const [catView, setCatView] = useState<CatView>((params.get('catview') as CatView) || 'bars')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [refreshKey, setRefreshKey] = useState(0)

  const filtered = useMemo(
    () => offers.filter((o) => (!partner || o.partner === partner) && (!cat || o.cat === cat)),
    [partner, cat, refreshKey],
  )
  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const pagedOffers = filtered.slice((page - 1) * pageSize, page * pageSize)
  const anyFilter = !!(partner || cat)
  const sum = (k: 'views' | 'clicks' | 'redemptions') => filtered.reduce((s, o) => s + o[k], 0)
  const V = anyFilter ? sum('views') : kpis.views
  const C = anyFilter ? sum('clicks') : kpis.clicks
  const Q = anyFilter ? sum('redemptions') : kpis.redemptions
  const val = anyFilter ? `AED ${fmt(filtered.reduce((s, o) => s + o.valueAED, 0))}` : kpis.valueRedeemed

  const top = [...filtered].sort((a, b) => b.redemptions - a.redemptions).slice(0, 6)
  const maxQ = top.length ? top[0].redemptions : 1

  const catData = useMemo(() => {
    const total = offers.reduce((s, o) => s + o.views, 0)
    return categories.map((k) => {
      const v = offers.filter((o) => o.cat === k.id).reduce((s, o) => s + o.views, 0)
      return { id: k.id, name: k.name, g1: k.g1, g2: k.g2, value: v, pct: Math.round((v / total) * 100) }
    }).sort((a, b) => b.value - a.value)
  }, [refreshKey])

  const catTotal = catData.reduce((t, k) => t + k.value, 0)

  return (
    <>
      <div className="greet">
        <div>
          <h1 className="greet-title">Good morning, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="greet-sub">Here's how offer views, clicks, and founder queries are performing.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/admin/register-offer"
            className="cpc-claim-btn"
            style={{ height: 38, padding: '0 16px', fontSize: 13, gap: 6, textDecoration: 'none' }}
          >
            <Plus size={15} /> Register Partner Offer
          </Link>
          <button className="icon-btn" style={{ position: 'relative' }} aria-label="Notifications">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>
        </div>
      </div>

      <div className="admin-filters" style={{ marginBottom: 16 }}>
        <select className="select" value={partner} onChange={(e) => setPartner(e.target.value)}>
          <option value="">All partners</option>
          {offers.map((o) => <option key={o.id} value={o.partner}>{o.partner}</option>)}
        </select>
        <select className="select" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <select className="select">
          <option>Cohort 18 (current)</option>
          <option>Cohort 17</option>
          <option>All cohorts</option>
        </select>
      </div>

      <div className="grid metrics">
        <Metric tone={TONES[0]} icon={<Eye size={18} />} label="Offer views" value={fmt(V)} delta={anyFilter ? undefined : '+15%'} />
        <Metric tone={TONES[1]} icon={<MousePointerClick size={18} />} label="Clicks" value={fmt(C)} delta={anyFilter ? undefined : '+12%'} />
        <Metric tone={TONES[2]} icon={<MessageSquare size={18} />} label="Queries Submitted" value={fmt(Q)} delta={anyFilter ? undefined : '+18%'} />
        <Metric tone={TONES[3]} icon={<Wallet size={18} />} label="Perks Value Requested" value={val} delta={anyFilter ? undefined : '+14%'} />
      </div>

      <div className="section-gap">
        <div className="card card-pad viz-pop">
          <div className="card-head">
            <div className="card-title"><TrendingUp size={15} /> Views, clicks & queries submitted</div>
            <Seg value={trend} onChange={(v) => setTrend(v)} opts={[
              { v: 'area', label: 'Area', Icon: AreaIco },
              { v: 'line', label: 'Line', Icon: LineIco },
              { v: 'bar', label: 'Bar', Icon: BarChart3 },
            ]} />
          </div>
          <VizLegend items={[
            { name: 'Views', color: TONES[0], value: fmt(monthly[monthly.length - 1].views) },
            { name: 'Clicks', color: TONES[1], value: fmt(monthly[monthly.length - 1].clicks) },
            { name: 'Queries', color: TONES[2], value: fmt(monthly[monthly.length - 1].redemptions) },
          ]} />
          <ResponsiveContainer width="100%" height={230} key={trend}>
            <ComposedChart data={monthly} margin={{ left: -14, right: 8, top: 10 }} barGap={2}>
              <defs>
                <linearGradient id="av" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TONES[0]} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={TONES[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={c.grid} strokeWidth={1} vertical={false} />
              <XAxis dataKey="month" stroke={c.axis} tickLine={false} axisLine={false} dy={6} tick={{ fontSize: 11 }} />
              <YAxis stroke={c.axis} tickLine={false} axisLine={false} width={46} tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v} />
              <Tooltip content={<VizTooltip />} cursor={{ stroke: c.axis, strokeWidth: 1, strokeOpacity: 0.45 }} />

              {trend === 'area' && <>
                <Area type="monotone" dataKey="views" name="Views" stroke={TONES[0]} strokeWidth={2} fill="url(#av)" {...anim} activeDot={{ r: 4, strokeWidth: 2, stroke: c.tooltip }} />
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

      <div className="grid two-col section-gap">
        <div className="card card-pad viz-pop">
          <div className="card-head">
            <div className="card-title"><PieHead size={15} /> Views by category</div>
            <Seg value={catView} onChange={(v) => setCatView(v)} opts={[
              { v: 'bars', label: 'Bars', Icon: BarChart3 },
              { v: 'donut', label: 'Donut', Icon: Donut },
              { v: 'pie', label: 'Pie', Icon: PieIco },
            ]} />
          </div>

          {catView === 'bars' ? (
            <div className="rows viz-bars">
              {catData.map((k) => (
                <div key={k.id} className="ins-row">
                  <span className="ins-dot" style={{ background: k.g1 }} />
                  <span className="ins-name">{k.name}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: k.pct + '%', background: TONES[0] }} /></div>
                  <span className="ins-pct">{fmt(k.value)} <em>{k.pct}%</em></span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={196} key={catView}>
                <PieChart>
                  <Pie
                    data={catData} dataKey="value" nameKey="name"
                    innerRadius={catView === 'donut' ? 52 : 0} outerRadius={84}
                    paddingAngle={catView === 'donut' ? 2 : 0}
                    stroke={c.tooltip} strokeWidth={2} {...anim}
                  >
                    {catData.map((_, i) => <Cell key={i} fill={c.series[i % c.series.length]} />)}
                  </Pie>
                  <Tooltip content={<SliceTooltip total={catTotal} />} />
                </PieChart>
              </ResponsiveContainer>
              <VizLegend items={catData.map((k, i) => ({ name: k.name, color: c.series[i % c.series.length], value: k.pct + '%' }))} />
            </>
          )}
        </div>

        <div className="card card-pad">
          <div className="card-head"><div className="card-title"><Trophy size={15} /> Top partners by queries submitted</div><div className="card-note">queries · views</div></div>
          <div className="rows viz-bars">
            {top.map((o) => (
              <div key={o.id} className="row">
                <div className="avatar" style={{ width: 32, height: 32, fontSize: 11, background: `color-mix(in srgb, ${categoryById(o.cat)?.g1} 15%, var(--surface))`, color: categoryById(o.cat)?.g1 }}>{(() => { const I = partnerIcon(o.icon); return <I size={15} /> })()}</div>
                <span className="r-name" style={{ width: 116 }}>{o.partner}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${(o.redemptions / maxQ) * 100}%`, background: TONES[0] }} /></div>
                <span className="r-sub" style={{ width: 70, textAlign: 'right' }}>{o.redemptions} · {o.views}</span>
              </div>
            ))}
            {top.length === 0 && <div className="empty" style={{ padding: 30 }}>No partners match.</div>}
          </div>
        </div>
      </div>

      <div className="card card-pad section-gap">
        <div className="card-head">
          <div className="card-title"><Table2 size={15} /> Per-partner engagement</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="card-note">Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} partners</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-faint)', fontWeight: 600 }}>Per page:</span>
              <select
                className="select"
                style={{ padding: '2px 24px 2px 8px', height: 28, fontSize: 12, borderRadius: 8 }}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setPage(1)
                }}
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={18}>All</option>
              </select>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Partner</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Views</th>
              <th style={{ textAlign: 'right' }}>Clicks</th>
              <th style={{ textAlign: 'right' }}>Queries Submitted</th>
            </tr>
          </thead>
          <tbody>
            {pagedOffers.map((o) => (
              <tr key={o.id}>
                <td style={{ fontWeight: 600, color: 'var(--text)' }}>{o.partner}</td>
                <td style={{ color: 'var(--text-muted)' }}>{categoryById(o.cat)?.name}</td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{o.views.toLocaleString()}</td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>{o.clicks.toLocaleString()}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--brand-text)' }}>{o.redemptions.toLocaleString()}</td>
              </tr>
            ))}
            {pagedOffers.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                  No partners match current filter selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Pagination Bar */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                className="btn btn-ghost btn-sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                style={{ padding: '6px 12px', borderRadius: 10, fontSize: 12.5, fontWeight: 600, opacity: page <= 1 ? 0.35 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={14} /> Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'inline-grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    border: page === p ? '1px solid #0066cc' : '1px solid var(--border)',
                    background: page === p ? '#0066cc' : 'var(--surface-2)',
                    color: page === p ? '#ffffff' : 'var(--text)',
                    transition: 'all 0.15s ease',
                    boxShadow: page === p ? '0 2px 8px rgba(0, 102, 204, 0.3)' : 'none',
                  }}
                >
                  {p}
                </button>
              ))}

              <button
                className="btn btn-ghost btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                style={{ padding: '6px 12px', borderRadius: 10, fontSize: 12.5, fontWeight: 600, opacity: page >= totalPages ? 0.35 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function uppercaseText(val: string): 'uppercase' { return 'uppercase' }
