import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className='min-h-[80vh] flex flex-col items-center justify-center px-4 text-center'>
    <p className='text-7xl font-black text-gray-200 dark:text-white/10 mb-4 select-none'>404</p>
    <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Page not found</h1>
    <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-sm'>
      The page you're looking for doesn't exist or was moved.
    </p>
    <Link to='/'
      className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                 bg-blue-600 hover:bg-blue-700 text-white
                 shadow-md shadow-blue-500/20 transition-all duration-200
                 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30'>
      ← Back to home
    </Link>
  </div>
)

export default NotFound
