import React from "react";
import Avatar from "../../components/Avatar";
import { timeAgo } from "../../StudentPortal/classFormat";

const RecentActivity = ({ items = [] }) => {
  const activities = items.map((a, i) => ({
    id: i,
    name: a.name,
    avatarUrl: a.avatarUrl,
    action: `${a.type === "QUIZ" ? "completed" : "submitted"} ${a.title}`,
    time: timeAgo(a.at),
  }));

  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl p-2">
          Recent Activity
        </h2>

        <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
          Latest activities from your students
        </p>
      </div>

      <div className="border-b border-slate-100" />

      {/* Activity Items */}
      <div className="divide-y divide-slate-100">
        {activities.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">No activity from your students yet.</p>
        )}
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex min-w-0 items-center gap-3 py-4 sm:gap-4"
          >
            {/* Avatar */}
            <Avatar name={item.name} avatarUrl={item.avatarUrl} className="h-10 w-10 rounded-full sm:h-11 sm:w-11 lg:h-12 lg:w-12" textClassName="text-sm" />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-semibold leading-5 text-slate-900 sm:text-base">
                {item.name}{" "}
                <span className="font-medium text-slate-500">
                  {item.action}
                </span>
              </p>

              <span className="mt-1 block text-xs font-medium text-slate-400 sm:text-sm">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;