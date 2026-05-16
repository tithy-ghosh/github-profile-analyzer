const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  Java:       "#b07219",
  CSS:        "#563d7c",
  HTML:       "#e34c26",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  "C++":      "#f34b7d",
  Ruby:       "#701516",
  Shell:      "#89e051",
  Vue:        "#41b883",
  PHP:        "#4F5D95",
};

const RepoCard = ({ repo }) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all"
    >
      {/* Top row — repo name + language badge */}
      <div className="flex justify-between items-start mb-2 gap-2">
        <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm truncate">
          {repo.name}
        </h4>

        {/* Language badge — only show if language exists */}
        {repo.language && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
            style={{
              background: (LANG_COLORS[repo.language] || "#888") + "22",
              color: LANG_COLORS[repo.language] || "#888",
              border: `1px solid ${(LANG_COLORS[repo.language] || "#888")}44`,
            }}
          >
            {repo.language}
          </span>
        )}
      </div>

      {/* Description — truncated to 2 lines */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
        {repo.description || "No description provided."}
      </p>

      {/* Bottom row — stars and forks */}
      <div className="flex gap-4 text-xs text-gray-400">
        <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
        <span>🍴 {repo.forks_count.toLocaleString()}</span>
        {repo.watchers_count > 0 && (
          <span>👁️ {repo.watchers_count.toLocaleString()}</span>
        )}
      </div>
    </a>
  );
};

export default RepoCard;