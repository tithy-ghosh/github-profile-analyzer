import { useParams, Link } from "react-router-dom";
import { getUser, getRepos, getEvents } from "../utils/github";
import useFetch from "../hooks/useFetch";
import ProfileCard from "../components/ProfileCard";
import LanguageChart from "../components/LanguageChart";
import ActivityChart from "../components/ActivityChart";
import RepoCard from "../components/RepoCard";
import SkeletonLoader from "../components/SkeletonLoader";

const Profile = () => {
  const { username } = useParams();

  const { data: user,   loading: uLoading, error } = useFetch(getUser,   username);
  const { data: repos,  loading: rLoading }         = useFetch(getRepos,  username);
  const { data: events, loading: eLoading }         = useFetch(getEvents, username);

  const loading = uLoading || rLoading || eLoading;

  // Top 6 repos sorted by stars
  const topRepos = repos
    ? [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
    : [];

  // Error page
  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <p className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          User not found
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          <strong>{username}</strong> doesn't exist on GitHub
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Go back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Back link */}
      <Link
        to="/"
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 mb-6 inline-block transition-colors"
      >
        ← Back to search
      </Link>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-6">

          {/* 1. Profile card */}
          {user && <ProfileCard user={user} />}

          {/* 2. Charts side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos  && <LanguageChart repos={repos} />}
            {events && <ActivityChart events={events} />}
          </div>

          {/* 3. Top repos */}
          {topRepos.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                Top repositories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Profile;