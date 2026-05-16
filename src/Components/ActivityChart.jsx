import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts'

const EVENT_LABELS = {
  PushEvent: { label: 'Push', color: '#3b82f6', icon: '📦' },
  PullRequestEvent: { label: 'Pull Request', color: '#8b5cf6', icon: '🔀' },
  IssuesEvent: { label: 'Issue', color: '#f59e0b', icon: '🐛' },
  CreateEvent: { label: 'Create', color: '#10b981', icon: '🌿' },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-gray-900 dark:bg-gray-800 border border-white/10 rounded-xl px-3 py-2 shadow-xl'>
        <p className='text-xs text-gray-400 mb-1'>{label}</p>
        <p className='text-sm font-semibold text-white'>
          {payload[0].value} <span className='text-gray-400 font-normal'>events</span>
        </p>
      </div>
    )
  }
  return null
}

const ActivityChart = ({ events }) => {
  const meaningful = events.filter((e) => Object.keys(EVENT_LABELS).includes(e.type))

  const counts = {}
  meaningful.forEach((e) => {
    const date = e.created_at.slice(0, 10)
    counts[date] = (counts[date] || 0) + 1
  })

  const data = Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([date, count]) => ({
      date: date.slice(5),
      count,
    }))

  const maxCount = Math.max(...data.map((d) => d.count), 1)
  const totalEvents = meaningful.length

  // Event type breakdown
  const typeCounts = {}
  meaningful.forEach((e) => {
    typeCounts[e.type] = (typeCounts[e.type] || 0) + 1
  })

  if (!data.length) {
    return (
      <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                      border border-gray-200/80 dark:border-[#21262d]
                      rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]'>
        <div className='text-3xl mb-2'>📭</div>
        <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>No recent activity</p>
        <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>No public events in the last 90 days</p>
      </div>
    )
  }

  return (
    <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                    border border-gray-200/80 dark:border-[#21262d]
                    rounded-2xl p-5 shadow-sm'>

      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
            Recent Activity
          </h3>
          <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>
            Last 14 days of public events
          </p>
        </div>
        <div className='flex items-center gap-1.5 px-2.5 py-1 rounded-full
                        bg-blue-50 dark:bg-blue-500/10
                        border border-blue-100 dark:border-blue-500/20'>
          <div className='w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse' />
          <span className='text-xs font-medium text-blue-600 dark:text-blue-400'>
            {totalEvents} events
          </span>
        </div>
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width='100%' height={160}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='currentColor'
            className='text-gray-100 dark:text-white/5' opacity={1} vertical={false} />
          <XAxis
            dataKey='date'
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.06)' }} />
          <Bar dataKey='count' radius={[4, 4, 0, 0]} maxBarSize={28}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.count === maxCount ? '#3b82f6' : '#93c5fd'}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Event type breakdown */}
      <div className='mt-4 grid grid-cols-2 gap-2'>
        {Object.entries(EVENT_LABELS).map(([type, { label, color, icon }]) => (
          typeCounts[type] ? (
            <div key={type}
              className='flex items-center justify-between px-2.5 py-1.5 rounded-lg
                         bg-gray-50 dark:bg-white/[0.03]
                         border border-gray-100 dark:border-white/[0.05]'>
              <span className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                <span className='text-sm'>{icon}</span>
                {label}
              </span>
              <span className='text-xs font-semibold' style={{ color }}>
                {typeCounts[type]}
              </span>
            </div>
          ) : null
        ))}
      </div>
    </div>
  )
}

export default ActivityChart
