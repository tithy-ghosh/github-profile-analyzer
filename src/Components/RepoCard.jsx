const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Shell: '#89e051',
  Vue: '#41b883',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}

const RepoCard = ({ repo }) => {
  const lastUpdated = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year:
      new Date(repo.updated_at).getFullYear() !== new Date().getFullYear()
        ? 'numeric'
        : undefined,
  })

  const langColor = LANG_COLORS[repo.language] || '#8b8b8b'

  return (
    <a
      href={repo.html_url}
      target='_blank'
      rel='noreferrer'
      className='group flex flex-col
                 bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                 border border-gray-200/80 dark:border-[#21262d]
                 hover:border-blue-300 dark:hover:border-blue-500/40
                 rounded-2xl p-4
                 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5
                 transition-all duration-300 hover:-translate-y-0.5'>

      {/* Top row */}
      <div className='flex items-start justify-between gap-2 mb-2'>
        <div className='flex items-center gap-2 min-w-0'>
          {/* Repo icon */}
          <svg className='w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0'
            fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
              d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' />
          </svg>
          <h4 className='font-semibold text-sm text-blue-600 dark:text-blue-400
                         group-hover:text-blue-700 dark:group-hover:text-blue-300
                         truncate transition-colors duration-200'>
            {repo.name}
          </h4>
        </div>

        {/* Language badge */}
        {repo.language && (
          <span
            className='flex-shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium'
            style={{
              background: langColor + '18',
              color: langColor,
              border: `1px solid ${langColor}35`,
            }}>
            <span className='w-1.5 h-1.5 rounded-full flex-shrink-0'
              style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
      </div>

      {/* Description */}
      <p className='text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-1'>
        {repo.description || 'No description provided.'}
      </p>

      {/* Footer */}
      <div className='flex items-center justify-between gap-2 pt-3
                      border-t border-gray-100 dark:border-white/[0.05]'>
        <div className='flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500'>
          <span className='flex items-center gap-1 hover:text-yellow-500 transition-colors'>
            <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
          <span className='flex items-center gap-1'>
            <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
            </svg>
            {repo.forks_count.toLocaleString()}
          </span>
          {repo.open_issues_count > 0 && (
            <span className='flex items-center gap-1'>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              {repo.open_issues_count}
            </span>
          )}
        </div>

        <span className='text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap'>
          {lastUpdated}
        </span>
      </div>
    </a>
  )
}

export default RepoCard
