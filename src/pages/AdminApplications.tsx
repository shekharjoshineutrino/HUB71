import { useState, useMemo } from 'react'
import { Check, X, Mail, Search, Sparkles, Building2, Calendar, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react'
import { applications, categoryById } from '../data'
import { CAT_ICON } from '../icons'
import PageHead from '../PageHead'

export default function AdminApplications() {
  const [q, setQ] = useState('')
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [status, setStatus] = useState<Record<string, 'approved' | 'rejected'>>({})

  const list = useMemo(() => {
    return applications.filter((a) => {
      const s = status[a.company] || 'pending'
      if (filterTab !== 'all' && s !== filterTab) return false
      if (q && !(a.company + ' ' + a.note + ' ' + a.contact).toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [q, filterTab, status])

  const pendingCount = applications.filter((a) => !status[a.company]).length
  const approvedCount = Object.values(status).filter((s) => s === 'approved').length
  const rejectedCount = Object.values(status).filter((s) => s === 'rejected').length

  return (
    <>
      <PageHead
        crumbs={['Hub71', 'Admin', 'Applications']}
        title="Partner Applications"
        sub="Review and onboard partner applications submitted via the Airtable registration form."
      />

      {/* Stats and Filter Header */}
      <div className="card" style={{ padding: '18px 22px', borderRadius: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          {/* Segmented Status Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <button
              className={'deck-tab' + (filterTab === 'all' ? ' active' : '')}
              onClick={() => setFilterTab('all')}
            >
              All Applications <span className="deck-tab-count">{applications.length}</span>
            </button>
            <button
              className={'deck-tab' + (filterTab === 'pending' ? ' active' : '')}
              onClick={() => setFilterTab('pending')}
            >
              <Clock size={13} /> Pending Review <span className="deck-tab-count">{pendingCount}</span>
            </button>
            <button
              className={'deck-tab' + (filterTab === 'approved' ? ' active' : '')}
              onClick={() => setFilterTab('approved')}
            >
              <CheckCircle2 size={13} /> Approved <span className="deck-tab-count">{approvedCount}</span>
            </button>
            <button
              className={'deck-tab' + (filterTab === 'rejected' ? ' active' : '')}
              onClick={() => setFilterTab('rejected')}
            >
              <XCircle size={13} /> Rejected <span className="deck-tab-count">{rejectedCount}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="search" style={{ minWidth: 230, height: 38 }}>
            <Search size={15} color="var(--text-faint)" />
            <input
              placeholder="Search partner or contact..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q && (
              <button
                onClick={() => setQ('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {list.length === 0 ? (
          <div className="card" style={{ padding: '50px 20px', textAlign: 'center', borderRadius: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--surface-2)', margin: '0 auto 12px', display: 'grid', placeItems: 'center', color: 'var(--text-faint)' }}>
              <Building2 size={22} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>No applications found</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              {q ? 'Try clearing your search query.' : 'No partner applications match the selected status filter.'}
            </div>
          </div>
        ) : (
          list.map((a) => {
            const cat = categoryById(a.cat)
            const g1 = cat?.g1 || '#0066cc'
            const Icon = CAT_ICON[cat?.icon || 'code'] || Building2
            const currentStatus = status[a.company]
            const initials = a.company.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

            return (
              <div key={a.company} className="app-review-card">
                <div className="app-brand-box">
                  <div
                    className="app-avatar"
                    style={{
                      background: `color-mix(in srgb, ${g1} 14%, var(--surface))`,
                      color: g1,
                      borderColor: `color-mix(in srgb, ${g1} 25%, transparent)`,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="app-info">
                    <div className="app-title-row">
                      <h3 className="app-company-name">{a.company}</h3>
                      <span className="app-cat-tag" style={{ color: g1, borderColor: `color-mix(in srgb, ${g1} 30%, transparent)` }}>
                        {cat?.name || 'General Tech'}
                      </span>
                    </div>

                    <p className="app-note">{a.note}</p>

                    <div className="app-meta-row">
                      <a
                        href={`mailto:${a.contact}`}
                        className="app-meta-item"
                        style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                      >
                        <Mail size={13} style={{ color: '#0066cc' }} /> {a.contact}
                      </a>
                      <span className="app-meta-item">
                        <Calendar size={13} /> Applied {a.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="app-action-group">
                  {currentStatus ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        className={'tbadge ' + (currentStatus === 'approved' ? 'tb-green' : 'tb-red')}
                        style={{ fontSize: 13, padding: '6px 14px', borderRadius: 980 }}
                      >
                        <i className="bdot" />
                        {currentStatus === 'approved' ? 'Approved & Onboarded' : 'Application Rejected'}
                      </span>
                      <button
                        className="clear-link"
                        onClick={() => {
                          const next = { ...status }
                          delete next[a.company]
                          setStatus(next)
                        }}
                        style={{ fontSize: 11.5 }}
                      >
                        Undo
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ height: 38, padding: '0 16px', fontSize: 13 }}
                        onClick={() => setStatus((p) => ({ ...p, [a.company]: 'rejected' }))}
                      >
                        <X size={14} /> Reject
                      </button>
                      <button
                        className="cpc-claim-btn"
                        style={{ height: 38, padding: '0 18px', fontSize: 13, gap: 6 }}
                        onClick={() => setStatus((p) => ({ ...p, [a.company]: 'approved' }))}
                      >
                        <Check size={15} /> Approve & Onboard
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}
