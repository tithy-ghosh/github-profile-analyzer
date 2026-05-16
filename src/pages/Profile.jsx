import { useParams, Link } from 'react-router-dom'
import { getUser, getRepos, getEvents } from '../utils/github'
import useFetch from '../hooks/useFetch'
import LanguageChart from '../Components/LanguageChart'
import ActivityChart from '../Components/ActivityChart'
import RepoCard from '../Components/RepoCard'
import SkeletonLoader from '../Components/SkeletonLoader'
import { useNavigate } from 'react-router-dom'
import { toast } from '../Components/Toast'

// ── Inline stat pill ──────────────────────────────────────
const Stat = ({ label, value }) => {
  const fmt = n => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n
  return (
    <div className='text-center px-4 py-3
                    bg-gray-50 dark:bg-white/[0.03]
                    border border-gray-200/80 dark:border-white/[0.06]
                    rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10
                    hover:border-blue-200 dark:hover:border-blue-500/30
                    transition-all duration-200 cursor-default'>
      <p className='text-lg font-bold text-gray-900 dark:text-white leading-none'>{fmt(value)}</p>
      <p className='text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium'>{label}</p>
    </div>
  )
}

// ── Meta row item ─────────────────────────────────────────
const MetaItem = ({ icon, children, href }) => {
  const cls = 'flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
  const content = <><span className='text-gray-400 dark:text-gray-500 flex-shrink-0'>{icon}</span>{children}</>
  return href
    ? <a href={href} target='_blank' rel='noreferrer' className={cls}>{content}</a>
    : <span className={cls}>{content}</span>
}

// ── Profile sidebar ───────────────────────────────────────
const ProfileSidebar = ({ user }) => {
  const navigate = useNavigate()
  const joined = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/users/${user.login}`)
      .then(() => toast.success('Profile link copied!'))
      .catch(() => toast.error('Failed to copy'))
  }

  return (
    <aside className='w-full md:w-64 lg:w-72 flex-shrink-0'>
      <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                      border border-gray-200/80 dark:border-[#21262d]
                      rounded-2xl overflow-hidden shadow-sm'>

        {/* Avatar banner */}
        <div className='h-20 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent
                        dark:from-blue-500/10 dark:via-violet-500/5' />

        <div className='px-5 pb-5'>
          {/* Avatar — overlaps banner */}
          <div className='relative -mt-10 mb-3'>
            <div className='absolute inset-0 -mt-10 w-[72px] h-[72px] bg-gradient-to-br
                            from-blue-400/40 to-violet-400/20 rounded-full blur-lg' />
            <img src={user.avatar_url} alt={user.name || user.login}
              className='relative w-[72px] h-[72px] rounded-full
                         ring-4 ring-white dark:ring-[#161b22]
                         shadow-lg object-cover' />
            <div className='absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400
                            rounded-full border-2 border-white dark:border-[#161b22]' />
          </div>

          {/* Name + username */}
          <h1 className='text-lg font-bold text-gray-900 dark:text-white leading-tight'>
            {user.name || user.login}
          </h1>
          <a href={user.html_url} target='_blank' rel='noreferrer'
            className='text-sm text-blue-600 dark:text-blue-400 hover:underline'>
            @{user.login}
          </a>

          {/* Bio */}
          {user.bio && (
            <p className='text-xs text-gray-600 dark:text-gray-400 mt-3 leading-relaxed'>
              {user.bio}
            </p>
          )}

          {/* Action buttons */}
          <div className='flex gap-2 mt-4'>
            <button onClick={() => navigate('/compare', { state: { prefill: user.login } })}
              className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                         text-xs font-semibold
                         bg-blue-600 hover:bg-blue-700 text-white
                         shadow-sm shadow-blue-500/20
                         transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
              </svg>
              Compare
            </button>
            <button onClick={copyLink}
              className='flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl
                         text-xs font-medium
                         bg-gray-100 dark:bg-white/[0.05]
                         border border-gray-200 dark:border-white/10
                         text-gray-600 dark:text-gray-400
                         hover:bg-gray-200 dark:hover:bg-white/10
                         transition-all duration-200'>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
              </svg>
              Share
            </button>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-100 dark:border-white/[0.06] my-4' />

          {/* Meta info */}
          <div className='space-y-2'>
            {user.company && (
              <MetaItem icon={
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                </svg>
              }>{user.company}</MetaItem>
            )}
            {user.location && (
              <MetaItem icon={
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              }>{user.location}</MetaItem>
            )}
            {user.blog && (
              <MetaItem
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                icon={
                  <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                      d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                  </svg>
                }>
                {user.blog.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </MetaItem>
            )}
            {user.twitter_username && (
              <MetaItem
                href={`https://twitter.com/${user.twitter_username}`}
                icon={
                  <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                }>
                @{user.twitter_username}
              </MetaItem>
            )}
            <MetaItem icon={
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            }>Joined {joined}</MetaItem>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-100 dark:border-white/[0.06] my-4' />

          {/* Stats */}
          <div className='grid grid-cols-2 gap-2'>
            <Stat label='Repos'     value={user.public_repos} />
            <Stat label='Followers' value={user.followers} />
            <Stat label='Following' value={user.following} />
            <Stat label='Gists'     value={user.public_gists} />
          </div>
        </div>
      </div>
    </aside>
  )
}

// ── Main Profile page ─────────────────────────────────────
const Profile = () => {
  const { username } = useParams()

  const { data: user,   loading: uLoading, error: uError } = useFetch(getUser,   username)
  const { data: repos,  loading: rLoading }                = useFetch(getRepos,  username)
  const { data: events, loading: eLoading }                = useFetch(getEvents, username)

  const topRepos = repos
    ? [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
    : []

  const isLoading = uLoading || rLoading || eLoading

  // ── Rate limit ──
  if (uError?.includes('API rate limit')) {
    return (
      <div className='max-w-lg mx-auto px-4 py-20 text-center'>
        <div className='bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-8'>
          <p className='text-3xl mb-3'>⏱️</p>
          <h2 className='text-lg font-semibold text-amber-900 dark:text-amber-200 mb-2'>Rate limit reached</h2>
          <p className='text-sm text-amber-700 dark:text-amber-300/80 mb-5'>GitHub API rate limit exceeded. Please wait a moment.</p>
          <Link to='/' className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-amber-500 hover:bg-amber-600 text-white transition-colors'>← Back to search</Link>
        </div>
      </div>
    )
  }

  // ── Not found ──
  if (uError) {
    return (
      <div className='max-w-lg mx-auto px-4 py-20 text-center'>
        <div className='bg-white/70 dark:bg-[#161b22] border border-gray-200/80 dark:border-[#21262d] rounded-2xl p-10 shadow-sm'>
          <p className='text-5xl mb-4'>🔍</p>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>User not found</h2>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-6'>
            <span className='font-semibold text-gray-700 dark:text-gray-300'>@{username}</span> doesn't exist on GitHub.
          </p>
          <Link to='/' className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/30 transition-all hover:-translate-y-0.5'>← Back to search</Link>
        </div>
      </div>
    )
  }

  // ── Loading ──
  if (isLoading) {
    return (
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-8'>
        <div className='h-4 w-28 bg-gray-200 dark:bg-white/[0.06] rounded-lg animate-pulse mb-6' />
        <SkeletonLoader />
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 py-8'>

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

      {/* ── Two-column layout ── */}
      <div className='flex flex-col md:flex-row gap-6 items-start'>

        {/* Left: sidebar */}
        {user && <ProfileSidebar user={user} />}

        {/* Right: content */}
        <div className='flex-1 min-w-0 space-y-5'>

          {/* Charts row */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {repos && repos.length > 0
              ? <LanguageChart repos={repos} />
              : <div className='bg-white/70 dark:bg-[#161b22] border border-gray-200/80 dark:border-[#21262d] rounded-2xl p-6 flex items-center justify-center min-h-[200px]'>
                  <p className='text-sm text-gray-400'>No repositories found</p>
                </div>
            }
            {events && events.length > 0
              ? <ActivityChart events={events} />
              : <div className='bg-white/70 dark:bg-[#161b22] border border-gray-200/80 dark:border-[#21262d] rounded-2xl p-6 flex items-center justify-center min-h-[200px]'>
                  <p className='text-sm text-gray-400'>No recent activity</p>
                </div>
            }
          </div>

          {/* Top repos */}
          {topRepos.length > 0 && (
            <div>
              <div className='flex items-center justify-between mb-3'>
                <div>
                  <h2 className='text-sm font-semibold text-gray-900 dark:text-white'>Top Repositories</h2>
                  <p className='text-xs text-gray-400 dark:text-gray-500 mt-0.5'>
                    Sorted by stars · {topRepos.length} of {repos?.length}
                  </p>
                </div>
                <a href={`https://github.com/${username}?tab=repositories`}
                  target='_blank' rel='noreferrer'
                  className='flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400
                             hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
                  View all
                  <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                  </svg>
                </a>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {topRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile
