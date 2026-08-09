import { useState } from 'react'
import { Check, X, Mail } from 'lucide-react'
import { applications, categoryById } from '../data'
import { CAT_ICON } from '../icons'
import PageHead from '../PageHead'

export default function AdminApplications() {
  const [status, setStatus] = useState<Record<string, 'approved' | 'rejected'>>({})
  return (
    <>
      <PageHead crumbs={['Hub71', 'Admin', 'Applications']} title="Applications" sub="Partner applications submitted via the Airtable form, ready for review and onboarding." />
      <div className="perk-list section-gap">
        {applications.map((a) => {
          const cat = categoryById(a.cat)
          const s = status[a.company]
          return (
            <div key={a.company} className="card app-row">
              <div className="avatar" style={{ background: `color-mix(in srgb, ${cat?.g1} 15%, var(--surface))`, color: cat?.g1 }}>{(() => { const I = CAT_ICON[cat?.icon || 'code']; return <I size={17} /> })()}</div>
              <div className="pr-main">
                <div className="pr-name">{a.company} <span className="badge">{cat?.name}</span></div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 }}>{a.note}</div>
                <div className="app-meta"><Mail size={12} /> {a.contact} · applied {a.date}</div>
              </div>
              {s ? (
                <span className={'tbadge ' + (s === 'approved' ? 'tb-green' : 'tb-red')}><i className="bdot" /> {s === 'approved' ? 'Approved' : 'Rejected'}</span>
              ) : (
                <div className="app-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => setStatus((p) => ({ ...p, [a.company]: 'rejected' }))}><X size={14} /> Reject</button>
                  <button className="btn btn-hero btn-sm" onClick={() => setStatus((p) => ({ ...p, [a.company]: 'approved' }))}><Check size={14} /> Approve</button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
