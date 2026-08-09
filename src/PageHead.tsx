import { ChevronRight } from 'lucide-react'

export default function PageHead({ crumbs, title, sub }: { crumbs: string[]; title: string; sub: string }) {
  return (
    <div className="pagehead">
      <div className="crumbs">
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <ChevronRight size={13} className="cr-sep" />}
            <span className={i === crumbs.length - 1 ? 'cr-cur' : ''}>{c}</span>
          </span>
        ))}
      </div>
      <h1>{title}</h1>
      <p>{sub}</p>
    </div>
  )
}
