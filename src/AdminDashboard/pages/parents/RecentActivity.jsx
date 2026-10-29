
import React, { useEffect, useState } from "react";
import { X, Activity, Clock3 } from "lucide-react";

const initialActivities = [
  {
    id: 1,
    activity: "Renewed Monthly subscription",
    date: "5 Oct 2026",
  },
  {
    id: 2,
    activity: "Renewed Monthly subscription",
    date: "5 Oct 2026",
  },
  {
    id: 3,
    activity: "Renewed Monthly subscription",
    date: "5 Oct 2026",
  },
  {
    id: 4,
    activity: "Renewed Monthly subscription",
    date: "5 Oct 2026",
  },
];

function ActivityTable({ activities }) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[4px] border border-[#E5E9EF]">
      <div className="w-full overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[380px] table-fixed border-collapse text-left sm:min-w-0">
          <colgroup>
            <col className="w-[12%] sm:w-[16%]" />
            <col className="w-[58%] sm:w-[64%]" />
            <col className="w-[30%] sm:w-[20%]" />
          </colgroup>

          <thead>
            <tr className="h-[38px] bg-[#EEF3FB] text-[#737D88] sm:h-[42px]">
              <th className="px-2 text-[10px] font-medium sm:px-3 sm:text-[12px]">
                #
              </th>

              <th className="px-2 text-[10px] font-medium sm:px-3 sm:text-[12px]">
                Activity
              </th>

              <th className="px-2 text-[10px] font-medium sm:px-3 sm:text-[12px]">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {activities.length > 0 ? (
              activities.map((item, index) => (
                <tr
                  key={item.id}
                  className="h-[38px] border-t border-[#E6E9EE] bg-white transition-colors hover:bg-[#FAFBFD] sm:h-[40px]"
                >
                  <td className="px-2 py-2 text-[10px] font-normal text-[#737D88] sm:px-3 sm:text-[12px]">
                    {index + 1}
                  </td>

                  <td className="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 text-[10px] font-normal text-[#737D88] sm:px-3 sm:text-[12px]">
                    {item.activity}
                  </td>

                  <td className="whitespace-nowrap px-2 py-2 text-[10px] font-normal text-[#737D88] sm:px-3 sm:text-[12px]">
                    {item.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-3 py-10 text-center text-xs text-[#737D88]"
                >
                  No recent activity available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RecentActivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities] = useState(initialActivities);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Recent Activity Card */}
      <section className="flex min-h-[230px] w-full min-w-0 flex-col rounded-[6px] bg-white p-3 sm:min-h-[260px] sm:p-5">
        {/* Header */}
        <header className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
          <h2 className="text-[13px] font-semibold leading-5 text-[#111111] sm:text-[15px]">
            Recent Activity
          </h2>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex h-[28px] shrink-0 items-center justify-center rounded-[3px] border border-[#16C65A] bg-white px-3 text-[10px] font-medium leading-none text-[#16C65A] transition-colors hover:bg-[#EFFFF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C65A] focus-visible:ring-offset-2 sm:h-[30px] sm:min-w-[110px] sm:px-4 sm:text-[11px]"
          >
            View All Activity
          </button>
        </header>

        {/* Recent Activity Table */}
        <div className="w-full min-w-0 flex-1">
          <ActivityTable activities={activities.slice(0, 4)} />
        </div>
      </section>

      {/* View All Activity Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[2px] sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="recent-activity-modal-title"
            className="my-auto flex max-h-[calc(100dvh-24px)] w-full max-w-[680px] min-w-0 flex-col overflow-hidden rounded-xl border border-[#E5E9EF] bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]"
          >
            {/* Modal Header */}
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E5E9EF] px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E5F7EB] text-[#159A42] sm:h-10 sm:w-10">
                  <Activity size={20} />
                </div>

                <div className="min-w-0">
                  <h3
                    id="recent-activity-modal-title"
                    className="text-sm font-semibold text-[#111827] sm:text-lg"
                  >
                    All Activity
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-[#737D88] sm:text-xs">
                    Review your recent account activity.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close activity history"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#737D88] transition hover:bg-[#F3F5F9] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
              >
                <X size={19} />
              </button>
            </header>

            {/* Activity Summary */}
            <div className="flex shrink-0 items-center gap-2.5 border-b border-[#E5E9EF] bg-[#FAFBFD] px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
              <Clock3 size={17} className="shrink-0 text-[#159A42]" />

              <p className="text-xs text-[#737D88] sm:text-sm">
                Total activities:{" "}
                <span className="font-semibold text-[#111827]">
                  {activities.length}
                </span>
              </p>
            </div>

            {/* Scrollable Activity Table */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6">
              <ActivityTable activities={activities} />
            </div>

            {/* Modal Footer */}
            <footer className="flex shrink-0 justify-end border-t border-[#E5E9EF] bg-[#FAFBFD] px-4 py-3 sm:px-6 sm:py-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#159A42] px-5 text-xs font-medium text-white transition hover:bg-[#128238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 sm:h-10 sm:text-sm"
              >
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
