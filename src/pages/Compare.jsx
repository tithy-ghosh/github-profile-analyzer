import { useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { getUser, getRepos } from '../utils/github'
import useFetch from '../hooks/useFetch'
import useSearchHistory from '../hooks/useSearchHistory'

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', CSS: '#563d7c', HTML: '#e34c26', Go: '#00ADD8',
  Rust: '#dea584', 'C++': '#f34b7d', Ruby: '#701516', Shell: '#89e051',
  Vue: '#41b883', Swift: '#F05138', Kotlin: '#A97BFF',
}

const getTopLanguage = (repos) => {
  const langs = {}
  repos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1 })
  const top = Object.entries(langs).sort((a, b) => b[1] - a[1])[0]
  return top ? top[0] : 'N/A'
}

const formatNum = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n

// ── Input field with history dropdown ────────────────────
const UserInput = ({ label, value, onChange, history, placeholder }) => {
  const [open, setOpen] = useState(false)
  const filtered = history.filter(h => h !== value && h.toLowerCase().includes(value.toLowerCase())).slice(0, 5)

  return (
    <div className='flex-1 relative'>
      <label className='block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5'>
        {label}
      </label>
      <input
        type='text'
        value={value}
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className='w-full px-3.5 py-2.5 rounded-xl text-sm
                   bg-gray-50 dark:bg-white/[0.04]
                   border border-gray-200 dark:border-white/10
                   text-gray-900 dark:text-white
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400
                   transition-all duration-200'
      />
      {/* History dropdown */}
      {open && filtered.length > 0 && (
        <div className='absolute top-full left-0 right-0 mt-1 z-20
                        bg-white dark:bg-[#1c2128]
                        border border-gray-200 dark:border-[#30363d]
                        rounded-xl shadow-lg overflow-hidden'>
          {filtered.map(h => (
            <button
              key={h}
              onMouseDown={() => { onChange(h); setOpen(false) }}
              className='w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left
                         text-gray-700 dark:text-gray-300
                         hover:bg-blue-50 dark:hover:bg-blue-500/10
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors duration-150'>
              <svg className='w-3.5 h-3.5 text-gray-400 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Result card for one user ──────────────────────────────
const UserCard = ({ user, repos, isWinner, metrics }) => {
  const topLang = repos ? getTopLanguage(repos) : 'N/A'
  const avgStars = repos?.length
    ? (repos.reduce((s, r) => s + r.stargazers_count, 0) / repos.length).toFixed(1)
    : '0'
  const langColor = LANG_COLORS[topLang] || '#6366f1'

  return (
    <div className={`relative bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                     border rounded-2xl p-6 transition-all duration-300
                     ${isWinner
                       ? 'border-blue-400/60 dark:border-blue-500/40 shadow-lg shadow-blue-500/10'
                       : 'border-gray-200/80 dark:border-[#21262d]'}`}>

      {isWinner && (
        <div className='absolute -top-3 left-1/2 -translate-x-1/2
                        px-3 py-0.5 rounded-full text-xs font-semibold
                        bg-blue-600 text-white shadow-md'>
          Leading
        </div>
      )}

      <div className='text-center mb-5'>
        <div className='relative inline-block mb-3'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-400/30 to-violet-400/20 rounded-full blur-lg scale-110' />
          <img src={user.avatar_url} alt={user.login}
            className='relative w-20 h-20 rounded-full ring-2 ring-white dark:ring-white/10 object-cover' />
        </div>
        <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{user.name || user.login}</h3>
        <a href={user.html_url} target='_blank' rel='noreferrer'
          className='text-sm text-blue-600 dark:text-blue-400 hover:underline'>
          @{user.login}
        </a>
        {user.bio && (
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed'>
            {user.bio}
          </p>
        )}
      </div>

      <div className='grid grid-cols-2 gap-2 mb-4'>
        {[
          { label: 'Followers', value: formatNum(user.followers), highlight: metrics?.followers },
          { label: 'Repos',     value: user.public_repos,         highlight: metrics?.repos },
          { label: 'Avg Stars', value: avgStars,                  highlight: metrics?.avgStars },
          { label: 'Gists',     value: user.public_gists,         highlight: metrics?.gists },
        ].map(({ label, value, highlight }) => (
          <div key={label}
            className={`rounded-xl p-3 text-center border transition-colors
              ${highlight
                ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30'
                : 'bg-gray-50 dark:bg-white/[0.03] border-gray-200/80 dark:border-white/[0.06]'}`}>
            <p className={`text-lg font-bold ${highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
              {value}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>{label}</p>
          </div>
        ))}
      </div>

      <div className='space-y-2 pt-3 border-t border-gray-100 dark:border-white/[0.06]'>
        <div className='flex items-center justify-between text-xs'>
          <span className='text-gray-500 dark:text-gray-400'>Top Language</span>
          <span className='flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200'>
            <span className='w-2 h-2 rounded-full' style={{ background: langColor }} />
            {topLang}
          </span>
        </div>
        <div className='flex items-center justify-between text-xs'>
          <span className='text-gray-500 dark:text-gray-400'>Member since</span>
          <span className='font-medium text-gray-800 dark:text-gray-200'>
            {new Date(user.created_at).getFullYear()}
          </span>
        </div>
        {user.location && (
          <div className='flex items-center justify-between text-xs'>
            <span className='text-gray-500 dark:text-gray-400'>Location</span>
            <span className='font-medium text-gray-800 dark:text-gray-200 truncate ml-4'>{user.location}</span>
          </div>
        )}
        <div className='flex items-center justify-between text-xs'>
          <span className='text-gray-500 dark:text-gray-400'>Following</span>
          <span className='font-medium text-gray-800 dark:text-gray-200'>{user.following}</span>
        </div>
      </div>
    </div>
  )
}

// ── Professional Analysis / Verdict ──────────────────────
const Verdict = ({ user1, user2, repos1, repos2, winners }) => {
  const name1 = user1.name || user1.login
  const name2 = user2.name || user2.login

  const score1 = Object.values(winners).filter(v => v === 1).length
  const score2 = Object.values(winners).filter(v => v === 2).length

  const totalStars1 = repos1?.reduce((s, r) => s + r.stargazers_count, 0) || 0
  const totalStars2 = repos2?.reduce((s, r) => s + r.stargazers_count, 0) || 0
  const avg1 = repos1?.length ? totalStars1 / repos1.length : 0
  const avg2 = repos2?.length ? totalStars2 / repos2.length : 0
  const yearsActive1 = new Date().getFullYear() - new Date(user1.created_at).getFullYear() || 1
  const yearsActive2 = new Date().getFullYear() - new Date(user2.created_at).getFullYear() || 1
  const lang1 = repos1 ? getTopLanguage(repos1) : 'N/A'
  const lang2 = repos2 ? getTopLanguage(repos2) : 'N/A'

  const isTie = score1 === score2
  const leader = isTie ? null : score1 > score2 ? user1 : user2
  const trailer = isTie ? null : score1 > score2 ? user2 : user1

  // Build insight sentences per user
  const buildInsights = (u, repos, otherU, otherRepos, yearsActive) => {
    const lines = []
    const totalStars = repos?.reduce((s, r) => s + r.stargazers_count, 0) || 0
    const avg = repos?.length ? totalStars / repos.length : 0
    const lang = repos ? getTopLanguage(repos) : 'N/A'
    const topRepo = repos?.length
      ? [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0]
      : null

    if (u.followers > 1000)
      lines.push(`Significant community presence with ${(u.followers/1000).toFixed(1)}k followers.`)
    else
      lines.push(`A focused developer with ${u.followers} followers.`)

    if (avg > 50)
      lines.push(`Repositories average ${avg.toFixed(0)} stars — indicating high-impact, widely-used work.`)
    else if (avg > 10)
      lines.push(`Solid repository quality with an average of ${avg.toFixed(1)} stars per repo.`)
    else
      lines.push(`${u.public_repos} public repositories with an average of ${avg.toFixed(1)} stars each.`)

    if (lang !== 'N/A')
      lines.push(`Primary stack is ${lang}.`)

    if (topRepo && topRepo.stargazers_count > 100)
      lines.push(`Most starred project: ${topRepo.name} (${topRepo.stargazers_count.toLocaleString()} ★).`)

    lines.push(`Active on GitHub for ${yearsActive} year${yearsActive !== 1 ? 's' : ''}.`)

    return lines
  }

  const insights1 = buildInsights(user1, repos1, user2, repos2, yearsActive1)
  const insights2 = buildInsights(user2, repos2, user1, repos1, yearsActive2)

  // Overall summary paragraph
  const summaryParts = []
  if (isTie) {
    summaryParts.push(`${name1} and ${name2} are closely matched across all measured dimensions.`)
  } else {
    const margin = Math.abs(score1 - score2)
    const leaderName = leader.name || leader.login
    const trailerName = trailer.name || trailer.login
    if (margin >= 3)
      summaryParts.push(`${leaderName} holds a clear advantage over ${trailerName} across the majority of metrics.`)
    else if (margin === 2)
      summaryParts.push(`${leaderName} leads ${trailerName} in most categories, though the gap is not decisive.`)
    else
      summaryParts.push(`${leaderName} and ${trailerName} are competitive, with ${leaderName} holding a narrow edge.`)
  }

  if (totalStars1 !== totalStars2) {
    const moreStars = totalStars1 > totalStars2 ? name1 : name2
    const diff = Math.abs(totalStars1 - totalStars2)
    summaryParts.push(`${moreStars} has accumulated ${diff >= 1000 ? (diff/1000).toFixed(1)+'k' : diff} more stars in total.`)
  }

  if (lang1 === lang2 && lang1 !== 'N/A')
    summaryParts.push(`Both developers primarily work in ${lang1}.`)
  else if (lang1 !== 'N/A' && lang2 !== 'N/A')
    summaryParts.push(`Their primary languages differ — ${name1} favours ${lang1} while ${name2} works mainly in ${lang2}.`)

  return (
    <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                    border border-gray-200/80 dark:border-[#21262d]
                    rounded-2xl overflow-hidden shadow-sm'>

      {/* Section header */}
      <div className='px-6 py-4 border-b border-gray-100 dark:border-white/[0.06]'>
        <p className='text-[10px] font-semibold tracking-[0.12em] uppercase
                      text-gray-400 dark:text-gray-500 mb-0.5'>
          Analysis
        </p>
        <h3 className='text-base font-semibold text-gray-900 dark:text-white'>
          Comparative Assessment
        </h3>
      </div>

      <div className='p-6 space-y-6'>

        {/* ── Summary paragraph ── */}
        <div>
          <p className='text-[10px] font-semibold tracking-[0.12em] uppercase
                        text-gray-400 dark:text-gray-500 mb-2'>
            Summary
          </p>
          <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed'>
            {summaryParts.join(' ')}
          </p>
        </div>

        {/* ── Individual profile insights ── */}
        <div className='border-t border-gray-100 dark:border-white/[0.06] pt-5'>
          <p className='text-[10px] font-semibold tracking-[0.12em] uppercase
                        text-gray-400 dark:text-gray-500 mb-3'>
            Profile Insights
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {[
              { user: user1, insights: insights1, isLeader: !isTie && leader?.login === user1.login },
              { user: user2, insights: insights2, isLeader: !isTie && leader?.login === user2.login },
            ].map(({ user, insights, isLeader }) => (
              <div key={user.login}
                className='rounded-xl p-4
                           bg-gray-50/80 dark:bg-white/[0.02]
                           border border-gray-200/60 dark:border-white/[0.05]'>
                {/* User header */}
                <div className='flex items-center gap-3 mb-3 pb-3
                                border-b border-gray-200/60 dark:border-white/[0.05]'>
                  <img src={user.avatar_url} alt={user.login}
                    className='w-8 h-8 rounded-full object-cover ring-1 ring-white dark:ring-white/10 flex-shrink-0' />
                  <div className='min-w-0'>
                    <p className='text-xs font-semibold text-gray-900 dark:text-white truncate'>
                      {user.name || user.login}
                    </p>
                    <p className='text-[10px] text-gray-400 dark:text-gray-500'>@{user.login}</p>
                  </div>
                  {isLeader && (
                    <div className='ml-auto flex-shrink-0
                                    text-[10px] font-semibold tracking-wide uppercase
                                    text-blue-600 dark:text-blue-400
                                    bg-blue-50 dark:bg-blue-500/10
                                    border border-blue-200 dark:border-blue-500/20
                                    px-2 py-0.5 rounded-md'>
                      Leads
                    </div>
                  )}
                </div>
                {/* Insight lines */}
                <ul className='space-y-2'>
                  {insights.map((line, i) => (
                    <li key={i} className='flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
                      <span className='w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0 mt-1.5' />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


const Compare = () => {
  const { user1: paramUser1, user2: paramUser2 } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { history } = useSearchHistory()

  // Pre-fill from ProfileCard "Compare" button via router state
  const prefill = location.state?.prefill || ''

  const [u1, setU1] = useState(paramUser1 || prefill)
  const [u2, setU2] = useState(paramUser2 || '')
  const [error, setError] = useState('')

  // Only fetch when both params exist in the URL
  const { data: userData1, loading: l1, error: e1 } = useFetch(getUser, paramUser1)
  const { data: reposData1, loading: rl1 }           = useFetch(getRepos, paramUser1)
  const { data: userData2, loading: l2, error: e2 } = useFetch(getUser, paramUser2)
  const { data: reposData2, loading: rl2 }           = useFetch(getRepos, paramUser2)

  const loading = l1 || l2 || rl1 || rl2
  const hasResults = !!(paramUser1 && paramUser2)

  const handleCompare = () => {
    const a = u1.trim(), b = u2.trim()
    if (!a || !b) { setError('Please enter both usernames'); return }
    if (a === b)  { setError('Please enter two different usernames'); return }
    setError('')
    navigate(`/compare/${a}/${b}`)
  }

  // Winners per metric
  const winners = userData1 && userData2 ? {
    followers: userData1.followers >= userData2.followers ? 1 : 2,
    repos:     userData1.public_repos >= userData2.public_repos ? 1 : 2,
    gists:     userData1.public_gists >= userData2.public_gists ? 1 : 2,
    avgStars:  reposData1 && reposData2
      ? ((reposData1.reduce((s, r) => s + r.stargazers_count, 0) / (reposData1.length || 1)) >=
         (reposData2.reduce((s, r) => s + r.stargazers_count, 0) / (reposData2.length || 1)) ? 1 : 2)
      : 0,
  } : {}

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 py-8'>

      {/* Back */}
      <Link to='/'
        className='inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
                   hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 group'>
        <svg className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform'
          fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
        Back to search
      </Link>

      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Compare Profiles</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          Head-to-head stats for any two GitHub users
        </p>
      </div>

      {/* ── Input form — always visible ── */}
      <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                      border border-gray-200/80 dark:border-[#21262d]
                      rounded-2xl p-5 mb-6 shadow-sm'>

        {/* Inputs + button row */}
        <div className='flex flex-col sm:flex-row items-stretch sm:items-end gap-3'>
          <UserInput
            label='First user'
            value={u1}
            onChange={v => { setU1(v); setError('') }}
            history={history}
            placeholder='e.g. torvalds'
          />

          {/* "vs" divider */}
          <div className='flex sm:flex-col items-center justify-center gap-2 sm:gap-0 sm:pb-0.5 sm:flex-shrink-0'>
            <div className='flex-1 sm:flex-none h-px sm:h-0 sm:w-px bg-gray-200 dark:bg-white/10' />
            <div className='w-8 h-8 rounded-full flex-shrink-0
                            bg-gray-100 dark:bg-white/[0.06]
                            border border-gray-200 dark:border-white/10
                            flex items-center justify-center
                            text-xs font-bold text-gray-400'>
              vs
            </div>
            <div className='flex-1 sm:flex-none h-px sm:h-0 sm:w-px bg-gray-200 dark:bg-white/10' />
          </div>

          <UserInput
            label='Second user'
            value={u2}
            onChange={v => { setU2(v); setError('') }}
            history={history}
            placeholder='e.g. gaearon'
          />

          {/* Compare button — aligns to bottom of inputs on sm+ */}
          <button
            onClick={handleCompare}
            className='w-full sm:w-auto sm:flex-shrink-0 px-6 py-2.5 rounded-xl
                       font-semibold text-sm text-white
                       bg-blue-600 hover:bg-blue-700
                       shadow-md shadow-blue-500/20
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'>
            Compare
          </button>
        </div>

        {error && (
          <p className='mt-3 text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5'>
            <svg className='w-3.5 h-3.5 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
            </svg>
            {error}
          </p>
        )}

        {/* Search history quick-pick */}
        {history.length > 0 && (
          <div className='mt-4 pt-4 border-t border-gray-100 dark:border-white/[0.06]'>
            <p className='text-xs text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1.5'>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              From your search history — click to fill a slot
            </p>
            <div className='flex flex-wrap gap-2'>
              {history.slice(0, 8).map(h => (
                <button key={h}
                  onClick={() => {
                    if (!u1 || u1 === paramUser1) { setU1(h); setError('') }
                    else if (!u2 || u2 === paramUser2) { setU2(h); setError('') }
                    else { setU2(h); setError('') }
                  }}
                  className='flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium
                             bg-gray-50 dark:bg-white/[0.04]
                             border border-gray-200 dark:border-white/[0.08]
                             text-gray-600 dark:text-gray-400
                             hover:border-blue-300 dark:hover:border-blue-500/40
                             hover:text-blue-600 dark:hover:text-blue-400
                             hover:bg-blue-50 dark:hover:bg-blue-500/10
                             transition-all duration-200'>
                  <svg className='w-3 h-3 opacity-60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── No results yet — empty state ── */}
      {!hasResults && (
        <div className='text-center py-16 text-gray-400 dark:text-gray-500'>
          <svg className='w-12 h-12 mx-auto mb-3 opacity-30' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
          </svg>
          <p className='text-sm font-medium'>Enter two GitHub usernames above to compare</p>
        </div>
      )}

      {/* ── Error state ── */}
      {hasResults && (e1 || e2) && (
        <div className='bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20
                        rounded-2xl p-5 mb-6'>
          <p className='text-sm font-medium text-red-700 dark:text-red-300'>
            {e1 && <span><strong>@{paramUser1}</strong>: {e1}. </span>}
            {e2 && <span><strong>@{paramUser2}</strong>: {e2}.</span>}
          </p>
        </div>
      )}

      {/* ── Loading skeletons ── */}
      {hasResults && loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {[0, 1].map(i => (
            <div key={i} className='bg-white/70 dark:bg-[#161b22] border border-gray-200/80 dark:border-[#21262d]
                                    rounded-2xl p-6 animate-pulse'>
              <div className='flex flex-col items-center gap-3 mb-5'>
                <div className='w-20 h-20 rounded-full bg-gray-200 dark:bg-white/[0.06]' />
                <div className='h-4 w-32 bg-gray-200 dark:bg-white/[0.06] rounded' />
                <div className='h-3 w-24 bg-gray-200 dark:bg-white/[0.06] rounded' />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className='h-16 bg-gray-200 dark:bg-white/[0.06] rounded-xl' />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Results ── */}
      {hasResults && !loading && userData1 && userData2 && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-6'>
            <UserCard
              user={userData1} repos={reposData1}
              isWinner={Object.values(winners).filter(v => v === 1).length > Object.values(winners).filter(v => v === 2).length}
              metrics={{ followers: winners.followers === 1, repos: winners.repos === 1, avgStars: winners.avgStars === 1, gists: winners.gists === 1 }}
            />
            <UserCard
              user={userData2} repos={reposData2}
              isWinner={Object.values(winners).filter(v => v === 2).length > Object.values(winners).filter(v => v === 1).length}
              metrics={{ followers: winners.followers === 2, repos: winners.repos === 2, avgStars: winners.avgStars === 2, gists: winners.gists === 2 }}
            />
          </div>

          {/* Verdict */}
          <Verdict
            user1={userData1} user2={userData2}
            repos1={reposData1} repos2={reposData2}
            winners={winners}
          />

          {/* Full table */}
          <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                          border border-gray-200/80 dark:border-[#21262d]
                          rounded-2xl overflow-hidden shadow-sm mt-6'>
            <div className='px-4 sm:px-5 py-3.5 border-b border-gray-100 dark:border-white/[0.06]'>
              <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>Full comparison</h3>
            </div>
            <table className='w-full table-fixed'>
              <thead>
                <tr className='bg-gray-50/80 dark:bg-white/[0.02]'>
                  <th className='w-1/3 px-3 sm:px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Metric</th>
                  <th className='w-1/3 px-3 sm:px-5 py-3 text-left text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider truncate'>@{paramUser1}</th>
                  <th className='w-1/3 px-3 sm:px-5 py-3 text-left text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider truncate'>@{paramUser2}</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 dark:divide-white/[0.04]'>
                {[
                  { label: 'Followers',      v1: userData1.followers.toLocaleString(),  v2: userData2.followers.toLocaleString(),  win: winners.followers },
                  { label: 'Following',      v1: userData1.following,                   v2: userData2.following },
                  { label: 'Public Repos',   v1: userData1.public_repos,                v2: userData2.public_repos,                win: winners.repos },
                  { label: 'Public Gists',   v1: userData1.public_gists,                v2: userData2.public_gists,                win: winners.gists },
                  { label: 'Avg Stars',      v1: reposData1?.length ? (reposData1.reduce((s,r)=>s+r.stargazers_count,0)/reposData1.length).toFixed(1) : '—', v2: reposData2?.length ? (reposData2.reduce((s,r)=>s+r.stargazers_count,0)/reposData2.length).toFixed(1) : '—', win: winners.avgStars },
                  { label: 'Language',       v1: reposData1 ? getTopLanguage(reposData1) : '—', v2: reposData2 ? getTopLanguage(reposData2) : '—' },
                  { label: 'Since',          v1: new Date(userData1.created_at).getFullYear(), v2: new Date(userData2.created_at).getFullYear() },
                  { label: 'Company',        v1: userData1.company  || '—', v2: userData2.company  || '—' },
                  { label: 'Location',       v1: userData1.location || '—', v2: userData2.location || '—' },
                  { label: 'Hireable',       v1: userData1.hireable ? 'Yes' : '—', v2: userData2.hireable ? 'Yes' : '—' },
                ].map(({ label, v1, v2, win }) => (
                  <tr key={label} className='hover:bg-gray-50/60 dark:hover:bg-white/[0.02] transition-colors'>
                    <td className='px-3 sm:px-5 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 truncate'>{label}</td>
                    <td className={`px-3 sm:px-5 py-3 text-xs font-semibold truncate ${win === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {win === 1 && <span className='mr-1'>🏆</span>}{v1}
                    </td>
                    <td className={`px-3 sm:px-5 py-3 text-xs font-semibold truncate ${win === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {win === 2 && <span className='mr-1'>🏆</span>}{v2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Compare
