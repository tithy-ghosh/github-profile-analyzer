import { useEffect, useState } from 'react'

// ── Minimal toast system ──────────────────────────────────
// Usage: import { toast } from './Toast'
// toast.success('Copied!') / toast.error('Failed')

const listeners = []
let id = 0

export const toast = {
  success: (msg) => emit({ id: ++id, msg, type: 'success' }),
  error:   (msg) => emit({ id: ++id, msg, type: 'error' }),
  info:    (msg) => emit({ id: ++id, msg, type: 'info' }),
}

function emit(t) {
  listeners.forEach(fn => fn(t))
}

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (t) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3000)
    }
    listeners.push(handler)
    return () => listeners.splice(listeners.indexOf(handler), 1)
  }, [])

  if (!toasts.length) return null

  return (
    <div className='fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none'>
      {toasts.map(t => (
        <div key={t.id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
                      pointer-events-auto animate-fade-in backdrop-blur-sm
                      ${t.type === 'success' ? 'bg-emerald-600 text-white' :
                        t.type === 'error'   ? 'bg-red-600 text-white' :
                                               'bg-gray-900 dark:bg-[#21262d] text-white border border-white/10'}`}>
          {t.type === 'success' && (
            <svg className='w-4 h-4 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          )}
          {t.type === 'error' && (
            <svg className='w-4 h-4 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          )}
          {t.msg}
        </div>
      ))}
    </div>
  )
}
