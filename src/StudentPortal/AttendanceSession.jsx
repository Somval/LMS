import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";

const sessions = [
  {
    id: 1,
    date: "Aug 18, 2025",
    subject: "Mathematics",
    time: (
      <>
        4:00 PM –
        <br />
        5:00 PM
      </>
    ),
    joinedAt: "3:58 PM",
    timeSpent: "58 min",
    status: "Attended",
  },
  {
    id: 2,
    date: "Aug 18, 2025",
    subject: "English Language",
    time: (
      <>
        5:30 PM –
        <br />
        6:30 PM
      </>
    ),
    joinedAt: "5:28 PM",
    timeSpent: "59 min",
    status: "Attended",
  },
  {
    id: 3,
    date: "Aug 19, 2025",
    subject: "Science",
    time: (
      <>
        4:00 PM –
        <br />
        5:00 PM
      </>
    ),
    joinedAt: "—",
    timeSpent: "—",
    status: "Missed",
  },
  {
    id: 4,
    date: "Aug 19, 2025",
    subject: "Mathematics",
    time: (
      <>
        5:30 PM –
        <br />
        6:30 PM
      </>
    ),
    joinedAt: "5:34 PM",
    timeSpent: "54 min",
    status: "Attended",
  },
  {
    id: 5,
    date: "Aug 20, 2025",
    subject: "English Language",
    time: (
      <>
        4:00 PM –
        <br />
        5:00 PM
      </>
    ),
    joinedAt: "4:01 PM",
    timeSpent: "57 min",
    status: "Attended",
  },
  {
    id: 6,
    date: "Aug 20, 2025",
    subject: "Science",
    time: (
      <>
        5:30 PM –
        <br />
        6:30 PM
      </>
    ),
    joinedAt: "5:29 PM",
    timeSpent: "60 min",
    status: "Attended",
  },
  {
    id: 7,
    date: "Aug 21, 2025",
    subject: "Mathematics",
    time: (
      <>
        4:00 PM –
        <br />
        5:00 PM
      </>
    ),
    joinedAt: "—",
    timeSpent: "—",
    status: "Missed",
  },
  {
    id: 8,
    date: "Aug 21, 2025",
    subject: "English Language",
    time: (
      <>
        5:30 PM –
        <br />
        6:30 PM
      </>
    ),
    joinedAt: "5:27 PM",
    timeSpent: "60 min",
    status: "Attended",
  },
  {
    id: 9,
    date: "Aug 22, 2025",
    subject: "Science",
    time: (
      <>
        4:00 PM –
        <br />
        5:00 PM
      </>
    ),
    joinedAt: "4:03 PM",
    timeSpent: "55 min",
    status: "Attended",
  },
  {
    id: 10,
    date: "Aug 22, 2025",
    subject: "Mathematics",
    time: (
      <>
        5:30 PM –
        <br />
        6:30 PM
      </>
    ),
    joinedAt: "5:30 PM",
    timeSpent: "58 min",
    status: "Attended",
  },
  {
    id: 11,
    date: "Aug 23, 2025",
    subject: "English Language",
    time: (
      <>
        10:00 AM –
        <br />
        11:00 AM
      </>
    ),
    joinedAt: "—",
    timeSpent: "—",
    status: "Missed",
  },
  {
    id: 12,
    date: "Aug 23, 2025",
    subject: "Science",
    time: (
      <>
        11:30 AM –
        <br />
        12:30 PM
      </>
    ),
    joinedAt: "11:28 AM",
    timeSpent: "59 min",
    status: "Attended",
  },
];

const StatusBadge = ({ status }) => {
  const attended = status === "Attended";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-medium
        ${
          attended
            ? "bg-emerald-100 text-emerald-600"
            : "bg-rose-100 text-rose-500"
        }
      `}
    >
      {attended ? (
        <CheckCircle2
          className="h-3 w-3"
          strokeWidth={2.5}
        />
      ) : (
        <XCircle
          className="h-3 w-3"
          strokeWidth={2.5}
        />
      )}

      {status}
    </span>
  );
};

const SessionAttendance = () => {
  const [selectedFilter, setSelectedFilter] = useState("This Week");
  const [isOpen, setIsOpen] = useState(false);

  const parseDate = (dateString) => {
    return new Date(dateString);
  };

  const latestSessionDate = useMemo(() => {
    return sessions.reduce((latest, session) => {
      const currentDate = parseDate(session.date);

      return currentDate > latest ? currentDate : latest;
    }, parseDate(sessions[0].date));
  }, []);

  const getStartOfWeek = (date) => {
    const result = new Date(date);
    const day = result.getDay();

    const difference = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + difference);
    result.setHours(0, 0, 0, 0);

    return result;
  };

  const getEndOfWeek = (date) => {
    const result = getStartOfWeek(date);

    result.setDate(result.getDate() + 6);
    result.setHours(23, 59, 59, 999);

    return result;
  };

  const filteredSessions = useMemo(() => {
    if (selectedFilter === "All Sessions") {
      return sessions;
    }

    const currentWeekStart = getStartOfWeek(latestSessionDate);
    const currentWeekEnd = getEndOfWeek(latestSessionDate);

    if (selectedFilter === "This Week") {
      return sessions.filter((session) => {
        const sessionDate = parseDate(session.date);

        return (
          sessionDate >= currentWeekStart &&
          sessionDate <= currentWeekEnd
        );
      });
    }

    if (selectedFilter === "Last Week") {
      const lastWeekStart = new Date(currentWeekStart);
      lastWeekStart.setDate(lastWeekStart.getDate() - 7);

      const lastWeekEnd = new Date(currentWeekStart);
      lastWeekEnd.setMilliseconds(-1);

      return sessions.filter((session) => {
        const sessionDate = parseDate(session.date);

        return (
          sessionDate >= lastWeekStart &&
          sessionDate <= lastWeekEnd
        );
      });
    }

    return sessions;
  }, [selectedFilter, latestSessionDate]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  return (
    <section className="w-full bg-slate-50 p-4 sm:p-6">
      <div className="w-full rounded-xl border border-slate-100 bg-white px-5 py-4 sm:px-6 sm:py-5">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Session Attendance
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Track your class attendance and learning time.
            </p>
          </div>

          {/* Time Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="
                flex
                h-8
                items-center
                gap-5
                rounded-md
                border
                border-slate-200
                bg-white
                px-3
                text-xs
                font-medium
                text-slate-600
                transition-colors
                hover:bg-slate-50
              "
              aria-expanded={isOpen}
            >
              <span>{selectedFilter}</span>

              <ChevronDown
                className={`
                  h-3.5
                  w-3.5
                  text-slate-400
                  transition-transform
                  duration-200
                  ${isOpen ? "rotate-180" : ""}
                `}
                strokeWidth={1.8}
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-10
                  z-20
                  w-32
                  overflow-hidden
                  rounded-lg
                  bg-white
                  shadow-lg
                  ring-1
                  ring-slate-100
                "
              >
                {[
                  "This Week",
                  "Last Week",
                  "All Sessions",
                ].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilterChange(filter)}
                    className={`
                      block
                      w-full
                      px-3
                      py-2.5
                      text-left
                      text-xs
                      transition-colors
                      ${
                        selectedFilter === filter
                          ? "bg-indigo-50 font-medium text-indigo-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }
                    `}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Attendance Table */}
        <div className="w-full overflow-hidden rounded-md border border-slate-200">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">

              {/* Table Header */}
              <thead>
                <tr className="h-[50px] bg-indigo-50/80">
                  <th className="px-2.5 text-left text-xs font-medium text-slate-500">
                    Date
                  </th>

                  <th className="px-2.5 text-left text-xs font-medium text-slate-500">
                    Subject
                  </th>

                  <th className="px-2.5 text-left text-xs font-medium text-slate-500">
                    Time
                  </th>

                  <th className="px-2.5 text-left text-xs font-medium text-slate-500">
                    Joined At
                  </th>

                  <th className="px-2.5 text-left text-xs font-medium text-slate-500">
                    Time Spent
                  </th>

                  <th className="px-2.5 text-right text-xs font-medium text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <tr
                      key={session.id}
                      className="
                        h-[61px]
                        border-t
                        border-slate-100
                        bg-white
                        transition-colors
                        hover:bg-slate-50/70
                      "
                    >
                      {/* Date */}
                      <td className="px-2.5">
                        <span className="whitespace-nowrap text-[10px] font-semibold text-slate-900">
                          {session.date}
                        </span>
                      </td>

                      {/* Subject */}
                      <td className="px-2.5">
                        <span className="whitespace-nowrap text-[10px] font-medium text-slate-900">
                          {session.subject}
                        </span>
                      </td>

                      {/* Time */}
                      <td className="px-2.5">
                        <span className="whitespace-nowrap text-[9px] leading-[13px] text-slate-600">
                          {session.time}
                        </span>
                      </td>

                      {/* Joined At */}
                      <td className="px-2.5">
                        <span className="whitespace-nowrap text-[9px] text-slate-600">
                          {session.joinedAt}
                        </span>
                      </td>

                      {/* Time Spent */}
                      <td className="px-2.5">
                        <span className="whitespace-nowrap text-[9px] text-slate-600">
                          {session.timeSpent}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-2.5 text-right">
                        <StatusBadge status={session.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="h-32 text-center text-xs text-slate-400"
                    >
                      No sessions found for this period.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionAttendance;