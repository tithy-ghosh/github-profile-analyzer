import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  CSS: '#563d7c',
  HTML: '#e34c26',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  Shell: '#89e051',
  Vue: '#41b883',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}
const DEFAULT_COLOR = '#6366f1'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0].payload
    return (
      <div className='bg-gray-900 dark:bg-gray-800 border border-white/10 rounded-xl px-3 py-2 shadow-xl'>
        <p className='text-xs font-semibold text-white'>{name}</p>
        <p className='text-xs text-gray-400 mt-0.5'>
          {value} repos · {percent}%
        </p>
      </div>
    )
  }
  return null
}

const LanguageChart = ({ repos }) => {
  const languageCount = {}
  repos
    .filter((repo) => repo.language)
    .forEach((repo) => {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
    })

  const total = Object.values(languageCount).reduce((sum, c) => sum + c, 0)

  const data = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({
      name,
      value,
      percent: Math.round((value / total) * 100),
    }))

  if (!data.length) {
    return (
      <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                      border border-gray-200/80 dark:border-[#21262d]
                      rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]'>
        <div className='text-3xl mb-2'>🗂️</div>
        <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>No languages found</p>
      </div>
    )
  }

  return (
    <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                    border border-gray-200/80 dark:border-[#21262d]
                    rounded-2xl p-5 shadow-sm'>

      {/* Header */}
      <div className='mb-4'>
        <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>Top Languages</h3>
        <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>
          Based on {total} public repositories
        </p>
      </div>

      <div className='flex items-center gap-4'>
        {/* Donut chart */}
        <div className='flex-shrink-0'>
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={40}
                outerRadius={60}
                paddingAngle={3}
                dataKey='value'
                strokeWidth={0}>
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={LANG_COLORS[entry.name] || DEFAULT_COLOR}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Language list */}
        <div className='flex-1 space-y-2 min-w-0'>
          {data.map((entry) => {
            const color = LANG_COLORS[entry.name] || DEFAULT_COLOR
            return (
              <div key={entry.name} className='flex items-center gap-2'>
                {/* Progress bar */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-0.5'>
                    <span className='text-xs font-medium text-gray-700 dark:text-gray-300 truncate'>
                      {entry.name}
                    </span>
                    <span className='text-xs text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0'>
                      {entry.percent}%
                    </span>
                  </div>
                  <div className='h-1.5 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden'>
                    <div
                      className='h-full rounded-full transition-all duration-700'
                      style={{
                        width: `${entry.percent}%`,
                        background: color,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LanguageChart
