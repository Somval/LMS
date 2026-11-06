
import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Avatar from "../../components/Avatar";
import { STATUS_LABEL, formatClock, formatDate, formatRange } from "./attendanceData";

const statusStyles = {
  Present: "bg-[#DDF7E7] text-[#16B85D]",
  Absent: "bg-[#FFE0E0] text-[#FF4141]",
  Late: "bg-[#E9ECEF] text-[#7B838D]",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex h-[18px] w-[65px] items-center justify-center rounded-[2px] text-[9px] font-medium leading-none ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AttendanceHistory({
  records = [],
  truncated = false,
  loading = false,
  error = "",
  hasCourses = true,
}) {
  const [search, setSearch] = useState("");

  // One row per student per class, shaped for the table.
  const rows = useMemo(
    () =>
      records.map((r) => ({
        id: r.id,
        student: r.student.user.fullName,
        avatarUrl: r.student.user.avatarUrl,
        date: formatDate(r.class.startsAt),
        time: formatRange(r.class.startsAt, r.class.endsAt),
        // The database keeps when attendance was marked, not when the student joined.
        markedAt: formatClock(r.markedAt),
        status: STATUS_LABEL[r.status],
        className: r.class.title,
      })),
    [records]
  );

  const filteredAttendance = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((record) =>
      [
        record.student,
        record.date,
        record.time,
        record.markedAt,
        record.status,
        record.className,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search, rows]);

  return (
    <section className="min-h-full w-full bg-[#F4F7FD] p-0">
      <div className="w-full overflow-hidden rounded-[7px] bg-white">
        {/* Title and search */}
        <div className="flex min-h-[57px] flex-col justify-center gap-3 px-[9px] py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
          <h2 className="shrink-0 text-[15px] font-semibold leading-5 tracking-[-0.2px] text-[#101010]">
            Attendance History
          </h2>

          <div className="relative w-full sm:w-[255px] sm:shrink-0">
            <Search
              size={16}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-[11px] top-1/2 -translate-y-1/2 text-[#98A1AD]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students..."
              aria-label="Search attendance history"
              className="h-[36px] w-full rounded-[7px] border border-[#E7EAF0] bg-[#F5F7FA] pl-[35px] pr-3 text-[10px] font-normal text-[#344054] outline-none transition placeholder:text-[#98A1AD] focus:border-[#B9C9E7] focus:bg-white focus:ring-2 focus:ring-[#EAF0FB]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-[7px] pb-0">
          <table className="w-full min-w-[650px] table-fixed border-separate border-spacing-0 text-left">
            <colgroup>
              <col className="w-[5.5%]" />
              <col className="w-[17.5%]" />
              <col className="w-[14%]" />
              <col className="w-[16.5%]" />
              <col className="w-[16%]" />
              <col className="w-[15.5%]" />
              <col className="w-[15%]" />
            </colgroup>

            <thead>
              <tr className="h-[35px] bg-[#EEF3FB] text-[#506984]">
                <th className="rounded-l-[3px] px-2 text-center text-[11px] font-medium">
                  #
                </th>
                <th className="px-2 text-[11px] font-medium">Student</th>
                <th className="px-2 text-[11px] font-medium">Date</th>
                <th className="px-2 text-[11px] font-medium">Time</th>
                <th className="px-2 text-[11px] font-medium">Marked At</th>
                <th className="px-2 text-[11px] font-medium">Status</th>
                <th className="rounded-r-[3px] px-2 text-[11px] font-medium">
                  Class
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((record, index) => (
                <tr
                  key={record.id}
                  className="h-[56.5px] bg-white transition-colors hover:bg-[#FAFBFD]"
                >
                  {/* Row number */}
                  <td className="border-b border-[#EDF0F3] px-2 text-center align-middle text-[13px] font-normal text-[#303943]">
                    {index + 1}
                  </td>

                  {/* Student */}
                  <td className="border-b border-[#EDF0F3] px-2 align-middle">
                    <div className="flex items-center gap-[11px]">
                      <Avatar
                        name={record.student}
                        avatarUrl={record.avatarUrl}
                        className="h-6 w-6 rounded-full"
                        textClassName="text-[8px]"
                      />

                      <span className="max-w-[90px] text-[9px] font-medium leading-[12px] text-[#171717]">
                        {record.student.split(" ")[0]}
                        <br />
                        {record.student.split(" ").slice(1).join(" ")}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap border-b border-[#EDF0F3] px-2 align-middle text-[9px] font-normal text-[#566477]">
                    {record.date}
                  </td>

                  {/* Time */}
                  <td className="whitespace-nowrap border-b border-[#EDF0F3] px-2 align-middle text-[9px] font-normal text-[#566477]">
                    {record.time}
                  </td>

                  {/* Joined at */}
                  <td className="whitespace-nowrap border-b border-[#EDF0F3] px-2 align-middle text-[9px] font-normal text-[#566477]">
                    {record.markedAt}
                  </td>

                  {/* Status */}
                  <td className="border-b border-[#EDF0F3] px-2 align-middle">
                    <StatusBadge status={record.status} />
                  </td>

                  {/* Class */}
                  <td className="whitespace-nowrap border-b border-[#EDF0F3] px-2 align-middle text-[9px] font-normal text-[#667386]">
                    {record.className}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Loading, error and empty states */}
          {loading && (
            <p className="py-10 text-center text-[11px] text-[#98A1AD]">Loading attendance…</p>
          )}

          {!loading && error && (
            <p role="alert" className="py-10 text-center text-[11px] font-medium text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && filteredAttendance.length === 0 && (
            <div className="flex min-h-[150px] flex-col items-center justify-center gap-2 text-center">
              <Search size={22} className="text-[#A0A9B6]" />

              <p className="text-[12px] font-medium text-[#344054]">
                No attendance records found
              </p>

              <p className="text-[11px] text-[#98A1AD]">
                {!hasCourses
                  ? "Courses you teach will show up here once they are assigned to you."
                  : rows.length === 0
                  ? "Nothing has been marked for this course in this period."
                  : "Try searching with a different name, date, or status."}
              </p>
            </div>
          )}

          {truncated && !loading && (
            <p className="py-3 text-center text-[10px] text-[#98A1AD]">
              Showing the most recent {rows.length} records. Choose a shorter period to see the rest.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
