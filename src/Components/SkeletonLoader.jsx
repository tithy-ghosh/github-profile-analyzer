import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className='animate-pulse space-y-6'>

        {/* Profile card Skeleton */}
        <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6'>

            {/* Avatar + name skeleton */}
            <div className='flex items-start gap-4 mb-6'>
                <div className='w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700' />
                    <div className='flex-1 space-y-2 pt-2'>
                        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3'/>
                        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4' />
                        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3' />
                    </div>
            </div>
             {/* Stats skeleton -4 boxes */}
             <div className='grid grid-cols-4 gap-3'>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className='h-16 bg-gray-200 dark:bg-gray-700 rounded-lg'/>
                ))}
             </div>
        </div>
      {/* Chart skeleton - 2 side by side */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded-xl' />
        <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded-xl' />
      </div>
      {/* Repo cards skeleton - 4 boxes */}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {[...Array(4)].map((_, i) => (
            <div key={i} className='h-28 bg-gray-200 dark:bg-gray-700 rounded-xl'/>
        ))}
      </div>
    </div>
   
  );
};

export default SkeletonLoader
