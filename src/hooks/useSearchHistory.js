import { useEffect, useState } from 'react';

const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('githubSearchHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
  }, []);

  // Add a search to history
  const addSearch = (username) => {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed) return;

    // Remove duplicate if exists, then add to beginning
    const updated = [
      trimmed,
      ...history.filter(item => item !== trimmed)
    ].slice(0, 10); // Keep only last 10 searches

    setHistory(updated);
    localStorage.setItem('githubSearchHistory', JSON.stringify(updated));
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('githubSearchHistory');
  };

  return { history, addSearch, clearHistory };
};

export default useSearchHistory;