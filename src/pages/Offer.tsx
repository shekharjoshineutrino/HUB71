import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Globe, MapPin, Calendar, Check, ShieldCheck, Info, Lightbulb, UserRound,
  PackageCheck, Send, Users, Building2, Star, ArrowRight, Share2, Bookmark,
} from 'lucide-react'
import { offerById, categoryById, offers, cohortSize } from '../data'
import { partnerIcon } from '../icons'

const STATUS: Record<string, { label: string; cls: string }> = {
  available: { label: 'Available', cls: 'tb-blue' },
  requested: { label: 'Requested', cls: 'tb-amber' },
  redeemed: { label: 'Redeemed', cls: 'tb-green' },
}

function Block({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="oblock">
      <div className="oblock-h"><Icon size={13} /> {label}</div>
      {children}
    </div>
  )
}

export default function Offer() {
  const { offerId } = useParams()
  const nav = useNavigate()
  const o = offerById(offerId || '')
  const preDone = typeof location !== 'undefined' && new URLSearchParams(location.search).get('done') === '1'
  const [done, setDone] = useState(preDone)
  if (!o) return <div className="card empty">Offer not found.</div>

  const cat = categoryById(o.cat)!
  const Icon = partnerIcon(o.icon)
  const st = STATUS[o.status] || STATUS.available
  const pct = Math.round((o.claimed / cohortSize) * 100)
  const initials = o.contact.split(' ').map((w) => w[0]).join('').slice(0, 2)
  const similar = offers.filter((x) => x.cat === o.cat && x.id !== o.id).slice(0, 3)

  return (
    <>
      <button className="back-link" onClick={() => nav('/founder')}><ArrowLeft size={16} /> All perks</button>

      <div className="offer-page section-gap">
        <div className="offer-main">
          <div className="card ohero">
            <div className="ohero-top">
              <div className="ohero-logo" style={{ color: cat.g1 }}><Icon size={26} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ohero-titlerow">
                  <h1 className="ohero-name">{o.partner}</h1>
                  <span className={'tbadge ' + st.cls}>{st.label}</span>
                  {o.exclusive && <span className="tbadge tb-amber"><Star size={10} /> Hub71 exclusive</span>}
                </div>
                <div className="ohero-meta">
                  <span className="perk2-cat" style={{ ['--cg' as any]: cat.g1, marginTop: 0 }}><i className="cdot" /> {cat.name}</span>
                  <span className="ohero-dot">·</span>
                  <span>{o.type}</span>
                  <span className="ohero-dot">·</span>
                  <span>{o.lifecycle} stage</span>
                </div>
              </div>
              <div className="ohero-actions">
                <button className="icon-btn" aria-label="Save"><Bookmark size={16} /></button>
                <button className="icon-btn" aria-label="Share"><Share2 size={16} /></button>
              </div>
            </div>

            <div className="ohero-prog">
              <div className="pp-head">
                <span className="pp-k"><Users size={11} /> {o.claimed} of {cohortSize} startups in your cohort claimed this</span>
                <span className="pp-v">{pct}%</span>
              </div>
              <div className="pp-track"><div className="pp-fill" style={{ width: pct + '%', background: cat.g1 }} /></div>
            </div>
          </div>

          <div className="card card-pad section-gap">
            <Block label="What it is" icon={Info}><p className="offer-p">{o.about}</p></Block>
            <Block label="Why use it" icon={Lightbulb}><p className="offer-p">{o.why}</p></Block>
            <Block label="Who it's for" icon={UserRound}><p className="offer-p">{o.whoFor}</p></Block>
            <Block label="What's included" icon={PackageCheck}>
              <ul className="inc-list">{o.included.map((it, i) => <li key={i}><Check size={16} /> {it}</li>)}</ul>
            </Block>
            <Block label="How to redeem" icon={Send}>
              <p className="offer-p">Submit your work email and a short note. Your query is sent to {o.partner}, and Hub71 records it for analytics — no waiting on email back-and-forth.</p>
            </Block>
          </div>

          {similar.length > 0 && (
            <div className="card card-pad section-gap">
              <div className="card-head"><div className="card-title">More in {cat.name}</div></div>
              <div className="simlist">
                {similar.map((x) => {
                  const XI = partnerIcon(x.icon)
                  return (
                    <div key={x.id} className="simrow" onClick={() => nav(`/founder/offer/${x.id}`)}>
                      <div className="avatar" style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', color: cat.g1 }}><XI size={15} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="ci-name">{x.partner}</div>
                        <div className="ci-sub">{x.valueLabel}</div>
                      </div>
                      <ArrowRight size={15} color="var(--text-faint)" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <aside className="offer-side">
          <div className="redeem-card">
            <div className="rc-value">{o.valueLabel}</div>
            <div className="section-label" style={{ marginTop: 6 }}>Request this perk</div>

            {done ? (
              <div className="access-reveal">
                <div className="ar-head"><Check size={16} color="var(--green)" /> Query sent</div>
                <p className="rc-note-p">Your query for the {o.partner} offer has been sent. {o.partner} has your email and will reach out directly. Hub71 has recorded this query for analytics.</p>
              </div>
            ) : (
              <>
                <div className="field"><label>Work email</label><input defaultValue="team@falcon.ai" /></div>
                <div className="field"><label>What do you need? (short description)</label><textarea rows={3} defaultValue={`We’d like to redeem the ${o.partner} offer for our team.`} /></div>
                <button className="btn btn-hero btn-block" onClick={() => setDone(true)}>Send query to {o.partner.split(' ')[0]}</button>
              </>
            )}

            <div className="note-box" style={{ marginTop: 12 }}><ShieldCheck size={15} /> Hub71 records that a query was sent — who, to which partner. It doesn’t track the conversation after.</div>
          </div>

          <div className="card card-pad side-card">
            <div className="card-title" style={{ marginBottom: 11 }}><Building2 size={15} /> About the partner</div>
            <div className="kv"><span className="k">Website</span><a className="v link" href={`https://${o.website}`} target="_blank" rel="noreferrer"><Globe size={13} /> {o.website}</a></div>
            <div className="kv"><span className="k">Headquarters</span><span className="v"><MapPin size={12} style={{ verticalAlign: -1, marginRight: 4 }} />{o.hq}</span></div>
            <div className="kv"><span className="k">Founded</span><span className="v"><Calendar size={12} style={{ verticalAlign: -1, marginRight: 4 }} />{o.founded}</span></div>
            <div className="contact-row">
              <span className="pf-av" style={{ width: 30, height: 30, fontSize: 11, background: `color-mix(in srgb, ${cat.g1} 15%, var(--surface))`, color: cat.g1 }}>{initials}</span>
              <div style={{ minWidth: 0 }}>
                <div className="ci-name">{o.contact}</div>
                <div className="ci-sub">Partner contact</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
