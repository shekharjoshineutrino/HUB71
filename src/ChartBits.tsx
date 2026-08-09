export function VizTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  // Calculate sum across payload
  const total = payload.reduce((acc: number, curr: any) => acc + (Number(curr.value) || 0), 0)

  return (
    <div className="viztip">
      <div className="viztip-h">{label}</div>
      {payload.map((p: any) => {
        const val = Number(p.value)
        const pct = total > 0 ? Math.round((val / total) * 100) : 0
        return (
          <div key={p.dataKey} className="viztip-row">
            <span
              className="viztip-dot"
              style={{
                background: p.color || p.fill,
                boxShadow: `0 0 8px ${p.color || p.fill}aa`,
              }}
            />
            <span className="viztip-k">{p.name}</span>
            <span className="viztip-v">
              {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toLocaleString('en-US')}
              {total > 0 && <em>{pct}%</em>}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function SliceTooltip({ active, payload, total }: any) {
  if (!active || !payload || !payload.length) return null
  const p = payload[0]
  const val = Number(p.value)
  const pct = total ? Math.round((val / total) * 100) : p.payload?.pct

  return (
    <div className="viztip">
      <div className="viztip-h">{p.name}</div>
      <div className="viztip-row" style={{ marginTop: 2 }}>
        <span
          className="viztip-dot"
          style={{
            background: p.payload?.fill || p.color || 'var(--brand)',
            boxShadow: `0 0 8px ${p.payload?.fill || p.color || 'var(--brand)'}aa`,
          }}
        />
        <span className="viztip-k">Share</span>
        <span className="viztip-v">
          {val.toLocaleString('en-US')} views {pct !== undefined && <em>({pct}%)</em>}
        </span>
      </div>
    </div>
  )
}

/** Legend that carries values & percentage indicators */
export function VizLegend({
  items,
}: {
  items: { name: string; color: string; value?: string; sub?: string }[]
}) {
  return (
    <div className="vizleg">
      {items.map((i) => (
        <span key={i.name} className="vizleg-i">
          <span
            className="vizleg-dot"
            style={{
              background: i.color,
              boxShadow: `0 0 6px ${i.color}88`,
            }}
          />
          {i.name}
          {i.value && <strong>{i.value}</strong>}
          {i.sub && <em style={{ fontSize: 11, color: 'var(--text-faint)', fontStyle: 'normal', marginLeft: 4 }}>({i.sub})</em>}
        </span>
      ))}
    </div>
  )
}
