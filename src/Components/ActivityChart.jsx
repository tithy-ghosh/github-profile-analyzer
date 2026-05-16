import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ActivityChart = ({ events }) => {

  // Step 1 — Filter only meaningful event types
  const meaningful = events.filter((e) =>
    ["PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"].includes(e.type)
  );

  // Step 2 — Group events by date
  const counts = {};
  meaningful.forEach((e) => {
    const date = e.created_at.slice(0, 10); // "2024-03-15"
    counts[date] = (counts[date] || 0) + 1;
  });

  // Step 3 — Build chart data for last 14 days
  const data = Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0])) // sort by date ascending
    .slice(-14) // take only last 14 days
    .map(([date, count]) => ({
      date: date.slice(5), // show only "MM-DD" not full date
      count,
    }));

  // Step 4 — Count total events for the summary line
  const totalEvents = meaningful.length;

  // Show message if no activity found
  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
          Recent activity
        </h3>
        <p className="text-sm text-gray-400">
          No recent public activity found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">

      {/* Header with total count */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Recent activity
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {totalEvents} events in last 90 days
        </span>
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#f9fafb",
              fontSize: "12px",
            }}
            formatter={(value) => [`${value} events`, "Activity"]}
          />
          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]} // rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Event type legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-400">
        <span>📦 Push</span>
        <span>🔀 Pull Request</span>
        <span>🐛 Issues</span>
        <span>🌿 Create</span>
      </div>

    </div>
  );
};

export default ActivityChart;