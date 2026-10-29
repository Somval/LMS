import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      name: "Olivia Brown",
      action: "submitted Algebra Practice",
      time: "12 min ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Daniel Carter",
      action: "completed Mathematics Quiz",
      time: "28 min ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Sophia Williams",
      action: "submitted Geometry Assignment",
      time: "45 min ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "Ethan Johnson",
      action: "joined Year 1 Mathematics",
      time: "1 hr ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    
  ];

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
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex min-w-0 items-center gap-3 py-4 sm:gap-4"
          >
            {/* Avatar */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <img
                src={item.avatar}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

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