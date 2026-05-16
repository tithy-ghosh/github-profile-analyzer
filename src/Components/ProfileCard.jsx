import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from './Toast'

const ProfileCard = ({ user }) => {
  const navigate = useNavigate()

  const joined = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long',
  })

  const stats = [
    { label: 'Repositories', value: user.public_repos, icon: '📦' },
    { label: 'Followers',    value: user.followers,    icon: '👥' },
    { label: 'Following',    value: user.following,    icon: '➕' },
    { label: 'Gists',        value: user.public_gists, icon: '📝' },
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/users/${user.login}`)
      .then(() => toast.success('Profile link copied!'))
      .catch(() => toast.error('Failed to copy link'))
  }

  const formatNumber = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n

  return (
    <div className='bg-white/70 dark:bg-[#161b22] backdrop-blur-sm
                    border border-gray-200/80 dark:border-[#21262d]
                    rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>

      {/* Top section */}
      <div className='flex items-start gap-5 mb-6'>

        {/* Avatar */}
        <div className='relative flex-shrink-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-400/30 to-violet-400/20
                          rounded-full blur-lg scale-110' />
          <img src={user.avatar_url} alt={user.name || user.login}
            className='relative w-20 h-20 rounded-full ring-2 ring-white dark:ring-white/10
                       shadow-lg object-cover' />
          <div className='absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400
                          rounded-full border-2 border-white dark:border-[#161b22]' />
        </div>

        {/* Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2 flex-wrap'>
            <div className='min-w-0'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white truncate'>
                {user.name || user.login}
              </h2>
              <a href={user.html_url} target='_blank' rel='noreferrer'
                className='inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400
                           hover:text-blue-700 dark:hover:text-blue-300 transition-colors group'>
                <span>@{user.login}</span>
                <svg className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity'
                  fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                </svg>
              </a>
            </div>

            {/* Action buttons */}
            <div className='flex items-center gap-2 flex-shrink-0'>
              {/* Compare CTA */}
              <button
                onClick={() => navigate('/compare', { state: { prefill: user.login } })}
                title='Compare with another user'
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                           bg-blue-50 dark:bg-blue-500/10
                           border border-blue-200 dark:border-blue-500/20
                           text-blue-600 dark:text-blue-400
                           hover:bg-blue-100 dark:hover:bg-blue-500/20
                           hover:border-blue-300 dark:hover:border-blue-500/40
                           transition-all duration-200'>
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
                Compare
              </button>

              {/* Copy link */}
              <button onClick={copyLink} title='Copy profile link'
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium
                           bg-gray-100 dark:bg-white/[0.05]
                           border border-gray-200 dark:border-white/10
                           text-gray-500 dark:text-gray-400
                           hover:bg-gray-200 dark:hover:bg-white/10
                           transition-all duration-200'>
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2'>
              {user.bio}
            </p>
          )}

          {/* Meta */}
          <div className='flex flex-wrap gap-x-4 gap-y-1 mt-3'>
            {user.location && (
              <span className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400'>
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                {user.location}
              </span>
            )}
            {user.blog && (
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target='_blank' rel='noreferrer'
                className='flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400
                           hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
                </svg>
                Website
              </a>
            )}
            {user.twitter_username && (
              <a href={`https://twitter.com/${user.twitter_username}`}
                target='_blank' rel='noreferrer'
                className='flex items-center gap-1.5 text-xs text-sky-500 hover:text-sky-600 transition-colors'>
                <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
                @{user.twitter_username}
              </a>
            )}
            <span className='flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500'>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              Joined {joined}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
        {stats.map((stat) => (
          <div key={stat.label}
            className='bg-gray-50 dark:bg-white/[0.03]
                       hover:bg-blue-50 dark:hover:bg-blue-500/10
                       border border-gray-200/80 dark:border-white/[0.06]
                       hover:border-blue-200 dark:hover:border-blue-500/30
                       rounded-xl p-3 text-center
                       transition-all duration-200 cursor-default'>
            <div className='text-lg mb-0.5'>{stat.icon}</div>
            <p className='text-xl font-bold text-gray-900 dark:text-white'>
              {formatNumber(stat.value)}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard
