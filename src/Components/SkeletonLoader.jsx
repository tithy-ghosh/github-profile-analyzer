import React from 'react'

const Shimmer = ({ className }) => (
  <div className={`relative overflow-hidden rounded-lg bg-gray-200/80 dark:bg-white/[0.06] ${className}`}>
    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]
                    bg-gradient-to-r from-transparent via-white/40 dark:via-white/[0.06] to-transparent' />
  </div>
)

const SkeletonLoader = () => {
  return (
    <div className='space-y-5'>

      {/* Profile card skeleton */}
      <div className='bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.08]
                      rounded-2xl p-6'>
        <div className='flex items-start gap-5 mb-6'>
          <Shimmer className='w-20 h-20 !rounded-full flex-shrink-0' />
          <div className='flex-1 space-y-2.5 pt-1'>
            <Shimmer className='h-4 w-1/3' />
            <Shimmer className='h-3 w-1/4' />
            <Shimmer className='h-3 w-2/3' />
            <Shimmer className='h-3 w-1/2' />
          </div>
        </div>
        <div className='grid grid-cols-4 gap-3'>
          {[...Array(4)].map((_, i) => (
            <Shimmer key={i} className='h-16 !rounded-xl' />
          ))}
        </div>
      </div>

      {/* Charts skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.08]
                        rounded-2xl p-5'>
          <Shimmer className='h-4 w-1/3 mb-1' />
          <Shimmer className='h-3 w-1/2 mb-5' />
          <div className='flex items-center gap-4'>
            <Shimmer className='w-[130px] h-[130px] !rounded-full flex-shrink-0' />
            <div className='flex-1 space-y-3'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='space-y-1'>
                  <div className='flex justify-between'>
                    <Shimmer className='h-2.5 w-16' />
                    <Shimmer className='h-2.5 w-8' />
                  </div>
                  <Shimmer className='h-1.5 w-full' style={{ width: `${60 + i * 8}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.08]
                        rounded-2xl p-5'>
          <div className='flex justify-between mb-4'>
            <div className='space-y-1.5'>
              <Shimmer className='h-4 w-28' />
              <Shimmer className='h-3 w-36' />
            </div>
            <Shimmer className='h-6 w-20 !rounded-full' />
          </div>
          <div className='flex items-end gap-1.5 h-[160px]'>
            {[...Array(14)].map((_, i) => (
              <Shimmer
                key={i}
                className='flex-1 !rounded-t-md !rounded-b-none'
                style={{ height: `${20 + Math.random() * 80}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Repo cards skeleton */}
      <div>
        <Shimmer className='h-4 w-36 mb-4' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[...Array(6)].map((_, i) => (
            <div key={i}
              className='bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.08]
                         rounded-2xl p-4 space-y-3'>
              <div className='flex justify-between'>
                <Shimmer className='h-4 w-1/2' />
                <Shimmer className='h-5 w-16 !rounded-full' />
              </div>
              <Shimmer className='h-3 w-full' />
              <Shimmer className='h-3 w-3/4' />
              <div className='flex justify-between pt-1'>
                <div className='flex gap-3'>
                  <Shimmer className='h-3 w-8' />
                  <Shimmer className='h-3 w-8' />
                </div>
                <Shimmer className='h-3 w-16' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
