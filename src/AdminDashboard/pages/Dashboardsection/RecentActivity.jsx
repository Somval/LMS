
import React from "react";
import { ArrowRight } from "lucide-react";

const activities = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    activity: "Completed an assignment",
    time: "10 min ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Student",
    activity: "Completed an assignment",
    time: "10 min ago",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Student",
    activity: "Completed an assignment",
    time: "10 min ago",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Student",
    activity: "Completed an assignment",
    time: "10 min ago",
  },
];

export default function RecentActivity() {
  const handleViewAll = () => {
    // Connect this to your activity history route.
    console.log("View all recent activities");
  };

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-[9px] border border-[#EEF0F4] bg-white">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-3 pb-3 pt-3 sm:px-4 sm:pb-3.5 sm:pt-4">
        <div className="min-w-0">
          <h2 className="font-[Inter] text-[12px] font-semibold leading-[1.4] text-[#171923] sm:text-[13px]">
            Recent Activity
          </h2>

          <p className="mt-0.5 font-[Inter] text-[9px] leading-[1.5] text-[#9297A5] sm:text-[10px]">
            Latest actions across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="inline-flex shrink-0 items-center gap-1 rounded-sm font-[Inter] text-[9px] font-medium text-[#159A42] transition-colors hover:text-[#107832] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] sm:text-[10px]"
        >
          View All
          <ArrowRight size={11} strokeWidth={1.8} />
        </button>
      </div>

      {/* Activity Table */}
      <div className="w-full">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="h-[25px] bg-[#F0F2F5]">
              <th
                scope="col"
                className="w-[34%] px-2.5 font-[Inter] text-[9px] font-semibold text-[#343B45] sm:px-3 sm:text-[10px]"
              >
                User
              </th>

              <th
                scope="col"
                className="w-[43%] px-1.5 font-[Inter] text-[9px] font-semibold text-[#343B45] sm:px-2 sm:text-[10px]"
              >
                Activity
              </th>

              <th
                scope="col"
                className="w-[23%] px-2 font-[Inter] text-[9px] font-semibold text-[#343B45] sm:px-3 sm:text-[10px]"
              >
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr
                key={item.id}
                className="h-[40px] border-b border-[#F0F1F4] last:border-b-0 transition-colors hover:bg-[#FAFBFC] sm:h-[43px]"
              >
                {/* User */}
                <td className="px-2.5 py-1.5 sm:px-3">
                  <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                    <div
                      className="flex h-[20px] w-[20px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] sm:h-[23px] sm:w-[23px]"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-full w-full"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                          fill="#D9D9D9"
                        />
                        <path
                          d="M4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21"
                          fill="#D9D9D9"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-[Inter] text-[8px] font-semibold leading-[1.35] text-[#252833] sm:text-[9px]">
                        {item.name}
                      </p>

                      <p className="mt-0.5 truncate font-[Inter] text-[7px] leading-[1.2] text-[#9297A5] sm:text-[8px]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Activity Description */}
                <td className="px-1.5 py-1.5 sm:px-2">
                  <p className="truncate font-[Inter] text-[8px] leading-[1.4] text-[#252833] sm:text-[9px]">
                    {item.activity}
                  </p>
                </td>

                {/* Time */}
                <td className="px-2 py-1.5 sm:px-3">
                  <p className="whitespace-nowrap font-[Inter] text-[7px] leading-[1.4] text-[#657084] sm:text-[8px]">
                    {item.time}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
