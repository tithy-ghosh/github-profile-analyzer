import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
const Lang_COLORS = {
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
    "C++": '#f34b7d',
    Shell: '#89e051',
    Vue: '#41b883',
};
// Fallback color for languages not in the above list
const DEFAULT_COLOR = '#8884d8';
const LanguageChart = ({ repos }) => {
    // Count how many repos use each language
    const languageCount = {};
    repos
     .filter((repo) => repo.language)
     .forEach((repo) => {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
     });

    //  Calculate total for percentage
    const total = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
    // Build chart data array, sorted by count, top 7 only

    const data = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({
        name,
        value,
        percent: Math.round((value / total) * 100)
    }));

    // Don't render chart if no languages
    if(!data.length){
        return (
            <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-700 p-6'>
                <p className='text-base text-gray-400'>No languages found</p>
            </div>
        );
    }
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
      <h3 className='text-base font-semibold text-gray-800 dark:text-white mb-4'>Top Languages</h3>

      {/* Responsive container makes the chart fit any screen size */}
      <ResponsiveContainer width='100%' height={220}>
        <PieChart>
           <Pie data={data}
           cx='50%'
           cy='50%'
           innerRadius={55}
           outerRadius={85}
           paddingAngle={3}
           dataKey='value'>
            {/* Each slice gets its language color */}
            {
                data.map((entry) => (
                    <Cell key={entry.name} fill={Lang_COLORS[entry.name] || DEFAULT_COLOR} />
                ))
            }
           </Pie>
           {/* Tooltip shows on hover */}
           <Tooltip formatter={(value, name) => [`${value} repos`, name]} />
            {/* Legend shows language names and colors */}
            <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Percentage list below the chart */}
      <div className='mt-3 space-y-1'>
        {
            data.map((entry) => (
                <div key={entry.name} className='flex items-center justify-between text-xs'>
                    <div className="flex items-center gap-2">
                      <span className='w-2.5 h-2.5 rounded-full inline-block' style={{ background: Lang_COLORS[entry.name] || DEFAULT_COLOR }}/> 
                      <span className='text-gray-600 dark:text-gray-400'>{entry.name}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-500 font-medium">{entry.percent}%</span>
                </div>
            ))
        }

      </div>
    </div>
  )
}

export default LanguageChart
