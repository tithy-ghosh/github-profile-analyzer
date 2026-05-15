import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { getEvents, getRepos, getUser } from '../utils/github';

const Profile = () => {
  const  {username} = useParams();
  const { data : user, loading: userLoading, error: userError } = useFetch (getUser, username);
  const { data: repos, loading: reposLoading } = useFetch (getRepos, username);
  const{ data: events, loading: eventsLoading } = useFetch (getEvents, username);
  const loading = userLoading || reposLoading || eventsLoading;
  if(loading){
    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center'>
            <p className='text-gray-500  dark:text-gray-400'>Loading</p>
        </div>
    )
  }
  if (userError){
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center gap-4'>
        <p className='text-6xl'>404</p>
        <p className='text-gray-500 dark:text-gray-400'>No Github user found for <strong>{username}</strong></p>
        <Link to ="/" className='text-blue-500 hover:underline'> ← Back to Search</Link>
    </div>
  }
    return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
           <Link to ="/" className='text-blue-500 hover:underline text-sm mb-6 inline-block'> ← Back to Search</Link> 
           <p >Components will go here in next step</p>
        </div>      
    </div>
  )
}

export default Profile
