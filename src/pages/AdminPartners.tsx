import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Plus, MoreVertical, ArrowDown, Download } from 'lucide-react'
import { offers, categoryById } from '../data'
import { partnerIcon } from '../icons'
import PageHead from '../PageHead'

const PER = 8

export default function AdminPartners() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [desc, setDesc] = useState(true)

  const list = useMemo(() => {
    const f = offers.filter((o) => o.partner.toLowerCase().includes(q.toLowerCase()))
    return [...f].sort((a, b) => (desc ? b.views - a.views : a.views - b.views))
  }, [q, desc])

  const pages = Math.max(1, Math.ceil(list.length / PER))
  const cur = Math.min(page, pages)
  const rows = list.slice((cur - 1) * PER, cur * PER)

  return (
    <>
      <PageHead crumbs={['Hub71', 'Admin', 'Partners']} title="Partners" sub="Manage onboarded partners and review their engagement." />

      <div className="card tbl-card">
        <div className="tbl-head">
          <span className="tbl-title">All partners <span className="tbl-count">{list.length}</span></span>
          <div className="tbl-actions">
            <div className="search" style={{ minWidth: 210, height: 36 }}>
              <Search size={16} color="var(--text-faint)" />
              <input placeholder="Search" value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} />
            </div>
            <button className="btn btn-ghost btn-sm"><SlidersHorizontal size={14} /> Filters</button>
            <button className="btn btn-ghost btn-sm"><Download size={14} /> Export</button>
            <button className="btn btn-primary btn-sm"><Plus size={14} /> Add partner</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table2">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Category</th>
                <th>Status</th>
                <th className="num sortable" onClick={() => setDesc((d) => !d)}>
                  Views <ArrowDown size={12} className="sort-i" style={{ transform: desc ? 'none' : 'rotate(180deg)' }} />
                </th>
                <th className="num">Clicks</th>
                <th className="num">Redeems</th>
                <th style={{ width: 44 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => {
                const cat = categoryById(o.cat)
                const cg = cat?.g1 || '#2260e6'
                const I = partnerIcon(o.icon)
                return (
                  <tr key={o.id}>
                    <td>
                      <div className="cell-id">
                        <div className="avatar" style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', color: cg }}><I size={16} /></div>
                        <div style={{ minWidth: 0 }}>
                          <div className="ci-name">{o.partner}</div>
                          <div className="ci-sub">{o.website}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tbadge tb-neutral"><i className="bdot" style={{ background: cg }} /> {cat?.name}</span>
                    </td>
                    <td>
                      <span className="tbadge tb-green"><i className="bdot" /> Active</span>
                      {o.exclusive && <span className="tbadge tb-amber" style={{ marginLeft: 6 }}>Exclusive</span>}
                    </td>
                    <td className="num">{o.views.toLocaleString()}</td>
                    <td className="num">{o.clicks.toLocaleString()}</td>
                    <td className="num">{o.redemptions.toLocaleString()}</td>
                    <td><button className="kebab" aria-label="Row actions"><MoreVertical size={15} /></button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="tbl-foot">
          <span className="tf-info">Showing {(cur - 1) * PER + 1}–{Math.min(cur * PER, list.length)} of {list.length}</span>
          <div className="pager">
            <button onClick={() => setPage(Math.max(1, cur - 1))}>Prev</button>
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} className={cur === i + 1 ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(Math.min(pages, cur + 1))}>Next</button>
          </div>
        </div>
      </div>
    </>
  )
}
