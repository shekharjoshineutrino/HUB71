import { useState } from 'react'
import { Bell, Building2, UserRound } from 'lucide-react'
import { currentUser } from '../data'
import PageHead from '../PageHead'

function Toggle({ label, on, set }: { label: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <div className="toggle-row" onClick={() => set(!on)} style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <span className="tr-label">{label}</span>
      <span className={'switch' + (on ? ' on' : '')} />
    </div>
  )
}

export default function AdminSettings() {
  const [apps, setApps] = useState(true)
  const [digest, setDigest] = useState(true)
  const [alerts, setAlerts] = useState(false)

  return (
    <>
      <PageHead crumbs={['Hub71', 'Admin', 'Settings']} title="Settings" sub="Manage your profile, notifications, and programme settings." />
      <div className="grid two-col section-gap">
        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 8 }}><Bell size={15} /> Notifications</div>
          <Toggle label="New partner applications" on={apps} set={setApps} />
          <Toggle label="Weekly analytics digest" on={digest} set={setDigest} />
          <div className="toggle-row" onClick={() => setAlerts(!alerts)} style={{ cursor: 'pointer', padding: '10px 0' }}>
            <span className="tr-label">Redemption alerts</span>
            <span className={'switch' + (alerts ? ' on' : '')} />
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 8 }}><Building2 size={15} /> Programme</div>
          <div className="kv"><span className="k">Current cohort</span><span className="v">Cohort 18</span></div>
          <div className="kv"><span className="k">Perks live</span><span className="v">100</span></div>
          <div className="kv"><span className="k">Airtable base</span><span className="v" style={{ color: 'var(--green)' }}>Connected</span></div>
          <div className="kv"><span className="k">Data residency</span><span className="v">UAE</span></div>
        </div>
      </div>

      <div className="card card-pad section-gap" style={{ maxWidth: 520 }}>
        <div className="card-title" style={{ marginBottom: 12 }}><UserRound size={15} /> Your profile</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 12 }}>
          <div className="avatar lg">{currentUser.initials}</div>
          <div><div style={{ fontWeight: 600, fontSize: 15 }}>{currentUser.name}</div><div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{currentUser.role}</div></div>
        </div>
        <div className="kv"><span className="k">Email</span><span className="v">{currentUser.email}</span></div>
        <div className="kv"><span className="k">Access</span><span className="v">Programme admin</span></div>
      </div>
    </>
  )
}
