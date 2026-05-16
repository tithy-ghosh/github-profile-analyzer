import { useEffect, useState, useCallback } from 'react'

const useFetch = (fetchFn, username) => {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Stable string key so the effect only re-runs when username actually changes
  useEffect(() => {
    if (!username) { setLoading(false); return }

    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)

    fetchFn(username)
      .then(res => { if (!cancelled) setData(res.data) })
      .catch(err => {
        if (cancelled) return
        if (err.response?.status === 403) {
          const remaining = err.response.headers['x-ratelimit-remaining']
          const reset     = err.response.headers['x-ratelimit-reset']
          if (remaining === '0') {
            const resetTime = new Date(parseInt(reset) * 1000)
            setError(`API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`)
          } else {
            setError(err.response?.data?.message || 'Access forbidden')
          }
        } else if (err.response?.status === 404) {
          setError('User not found')
        } else if (err.response?.status === 401) {
          setError('Invalid GitHub token')
        } else if (err.message === 'Network Error') {
          setError('Network error — check your connection')
        } else {
          setError(err.response?.data?.message || 'Something went wrong')
        }
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [username]) // intentionally omit fetchFn — it's a stable module-level function

  return { data, loading, error }
}

export default useFetch
