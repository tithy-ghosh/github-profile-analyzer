import React from 'react'

const ProfileCard = ({ user }) => {
    // Formate the joined date
const joined = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
});
// The 4 state boxes to display
const stats = [
    {label: 'Repos', value: user.public_repos},
    {label: 'Followers', value: user.followers},
    {label: 'Following', value: user.following},
    {label: 'Gists', value: user.public_gists}
]
  return (
    <div className='bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>
        {/* Top section - avatar + info */}
      <div className='flex items-start gap-4 mb-6'>
        {/* Avatar */}

        <img src={user.avatar_url} alt={user.name} className='w-20 h-20 rounded-full border-2 border-gray-200 dark:border-gray-700' />

        {/* Name, username, bio, location */}
        <div className='flex-1'>
            <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
                {user.name || user.login}
            </h2>
            {/* User links to github */}
            <a href={user.html_url}
            target='_blank'
            rel='noreferrer'
            className='text-blue-500 hover:underline text-sm'
            >@{user.login}</a>

            {/* Bio - only show if it exists */}
            {
                user.bio && ( <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>
                    {user.bio}
                </p>
           )}
           {/* Location , website, joindate */}
           <div className='felx flex-wrap gap-3 mt-2 text-xs text-gray-400'>
            {
                user.location && (
                    <span>📍 {user.location}</span>
                )
            }
            <br />
            {
                user.blog && (
                    
                    <a href={user.blog} target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                        🔗 Website
                    </a>
                )
            }
            <br />
             <span> Joined {joined}</span>
           </div>
           
        </div>
      </div>

      {/* Bottom section - 4 stats boxes */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {
            stats.map((stat) => (
                <div key={stat.level}
                className='bg-gray-200 dark:bg-gray-700 rounded-lg p-3 text-center'
                >
                    <p className='text-xl font-bold text-gray-800 dark:text-white'> {stat.value}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>{stat.level}</p>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default ProfileCard
