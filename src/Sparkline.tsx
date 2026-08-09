import { ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function Sparkline({
  data,
  color = 'var(--brand)',
  height = 32,
}: {
  data: number[]
  color?: string
  height?: number
}) {
  const chartData = data.map((val, i) => ({ i, val }))
  const gradientId = `spark-${Math.random().toString(36).substring(2, 9)}`

  return (
    <div className="sparkline-wrap" style={{ height, width: 84, flexShrink: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="val"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
