import React from 'react'
import { Link, useFetcher, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { getEvents, getRepos, getUser } from '../utils/github';
import SkeletonLoader from '../Components/SkeletonLoader';
import ProfileCard from '../Components/ProfileCard';
const Profile = () => {
  // Get username from URL 
  const { username } = useParams();

  // Fetch user data using custom hook
  const { data: user, loading: uloading, error } = useFetch(getUser, username);
  const{ data: repos, loading: rloading } = useFetch(getRepos, username);
  const { data: events, loading: eloading } = useFetch(getEvents, username);
  // Show loading state

  const loading = uloading || rloading || eloading;

  // Show error message if user not found

  if(error){
    return (
      <div className='max-w-2xl mx-auto px-4 py-20 text-center'>
        <p className="text-6xl mb-4">😕</p>
        <p className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>User not found</p>
        <p className='text-gray-500 dark:text-gray-400 mb-6'><strong>{username}</strong>doesn't exist on Github</p>
        <Link to='/' className='px-5 py-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors'>Go back to search</Link>
      </div>
    )
  }
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>

            {/* Back to Search link */}
            <Link to='/' className='text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 mb-6 inline-block transition-colors'>← Back to search</Link>

            {/* Show skeleton while loading, real content when done */}
            {
              loading ? (<SkeletonLoader /> ) : (
                <div className='space-y-6'>
                  {/* Profile card */}
                  {
                    user && <ProfileCard user={user} />
                  }
                </div>
              )
            }
    </div>
  )
}

export default Profile
