
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Search,
  UserRound,
  Monitor,
  Globe,
  Clock3,
  Activity,
} from "lucide-react";

const auditLogs = [
  {
    id: 1,
    date: "Oct 16, 2026",
    time: "10:24 AM",
    user: "John Doe",
    role: "Parent",
    action: "Logged In",
    module: "Authentication",
    description: "User logged in successfully.",
    ipAddress: "107.210.20.15",
    device: "Web (Chrome)",
  },
  {
    id: 2,
    date: "Oct 16, 2026",
    time: "10:24 AM",
    user: "John Doe",
    role: "Student",
    action: "Submitted",
    module: "Assignments",
    description: "Submitted assignment",
    ipAddress: "107.210.20.15",
    device: "Web (Chrome)",
  },
  {
    id: 3,
    date: "Oct 16, 2026",
    time: "10:24 AM",
    user: "John Doe",
    role: "Tutor",
    action: "Created",
    module: "Classes",
    description: "Created a new class",
    ipAddress: "107.210.20.15",
    device: "Web (Chrome)",
  },
  ...Array.from({ length: 7 }, (_, index) => ({
    id: index + 4,
    date: "Oct 16, 2026",
    time: "10:24 AM",
    user: "John Doe",
    role: "Parent",
    action: "Logged In",
    module: "Authentication",
    description: "User logged in successfully.",
    ipAddress: "107.210.20.15",
    device: "Web (Chrome)",
  })),
];

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [startDate, setStartDate] = useState("2026-10-01");
  const [endDate, setEndDate] = useState("2026-10-31");

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesRole =
        selectedRole === "All Roles" || log.role === selectedRole;

      const matchesSearch = Object.values(log)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const logDate = new Date(`${log.date} ${log.time}`);

      const fromDate = startDate
        ? new Date(`${startDate}T00:00:00`)
        : null;

      const toDate = endDate
        ? new Date(`${endDate}T23:59:59`)
        : null;

      const matchesDate =
        (!fromDate || logDate >= fromDate) &&
        (!toDate || logDate <= toDate);

      return matchesRole && matchesSearch && matchesDate;
    });
  }, [search, selectedRole, startDate, endDate]);

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-[#F5F7FC] px-3 py-5 sm:px-5 sm:py-6 lg:px-6">

      <div className="mx-auto w-full max-w-[1600px]">

        {/* HEADER */}
        <div className="mb-5">
          <h1 className="text-[20px] font-bold leading-7 tracking-[-0.5px] text-[#172033] sm:text-[22px]">
            Audit Logs
          </h1>

          <p className="mt-1 max-w-[600px] text-[12px] leading-[19px] text-[#8490A3] sm:text-[13px]">
            Track and monitor important activities across the platform for security and accountability.
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-center">

          {/* DATE RANGE */}
          <div className="flex h-[43px] min-w-0 items-center gap-2 rounded-[6px] border border-[#DCE1E9] bg-white px-3 lg:w-[260px]">

            <CalendarDays
              size={15}
              strokeWidth={1.7}
              className="shrink-0 text-[#68758A]"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              aria-label="Start date"
              className="min-w-0 flex-1 bg-transparent text-[11px] text-[#263246] outline-none"
            />

            <span className="shrink-0 text-[11px] text-[#9AA3B1]">
              –
            </span>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              aria-label="End date"
              className="min-w-0 flex-1 bg-transparent text-[11px] text-[#263246] outline-none"
            />
          </div>

          {/* ROLE FILTER */}
          <div className="relative min-w-0 lg:w-[155px]">

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-[43px] w-full appearance-none rounded-[6px] border border-[#DCE1E9] bg-white px-3 pr-9 text-[12px] font-medium text-[#263246] outline-none focus:border-[#A1AFC4]"
            >
              <option>All Roles</option>
              <option>Parent</option>
              <option>Student</option>
              <option>Tutor</option>
              <option>Admin</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8994A5]"
            />
          </div>

          {/* SEARCH */}
          <div className="relative min-w-0 sm:col-span-2 lg:col-span-1 lg:w-[280px]">

            <Search
              size={16}
              strokeWidth={1.7}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA5B5]"
            />

            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-[43px] w-full rounded-[6px] border border-[#DCE1E9] bg-white pl-9 pr-3 text-[12px] text-[#263246] outline-none placeholder:text-[#A0A9B8] focus:border-[#A1AFC4]"
            />
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] text-[#8993A3] sm:text-[12px]">
            Showing{" "}
            <span className="font-semibold text-[#344054]">
              {filteredLogs.length}
            </span>{" "}
            audit logs
          </p>
        </div>

        {/* ================================== */}
        {/* DESKTOP TABLE */}
        {/* ================================== */}

        <div className="hidden w-full overflow-hidden rounded-[3px] md:block">

          <div className="w-full overflow-x-auto">

            <table className="w-full table-fixed border-collapse text-left">

              <thead>
                <tr className="h-[42px] bg-[#E9EEF7]">

                  <th className="w-[14%] px-3 text-[11px] font-semibold text-[#344054]">
                    Date & Time
                  </th>

                  <th className="w-[12%] px-3 text-[11px] font-semibold text-[#344054]">
                    User
                  </th>

                  <th className="w-[9%] px-3 text-[11px] font-semibold text-[#344054]">
                    Role
                  </th>

                  <th className="w-[10%] px-3 text-[11px] font-semibold text-[#344054]">
                    Action
                  </th>

                  <th className="w-[13%] px-3 text-[11px] font-semibold text-[#344054]">
                    Module
                  </th>

                  <th className="w-[16%] px-3 text-[11px] font-semibold text-[#344054]">
                    Description
                  </th>

                  <th className="w-[13%] px-3 text-[11px] font-semibold text-[#344054]">
                    IP Address
                  </th>

                  <th className="w-[13%] px-3 text-[11px] font-semibold text-[#344054]">
                    Device
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (

                    <tr
                      key={log.id}
                      className="h-[49px] border-b border-[#E2E6ED] transition-colors hover:bg-white/60"
                    >

                      <td className="px-3 py-2">
                        <div className="flex flex-col gap-0.5 text-[10px] leading-[14px] text-[#8993A3]">
                          <span>{log.date}</span>
                          <span>{log.time}</span>
                        </div>
                      </td>

                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2 whitespace-nowrap">

                          <div className="h-[16px] w-[16px] shrink-0 rounded-full bg-[#D8D8D8]" />

                          <span className="text-[11px] font-medium text-[#252B36]">
                            {log.user}
                          </span>

                        </div>
                      </td>

                      <td className="px-3 py-2 text-[10px] text-[#929BAA]">
                        {log.role}
                      </td>

                      <td className="px-3 py-2 text-[10px] text-[#929BAA]">
                        {log.action}
                      </td>

                      <td className="px-3 py-2 text-[10px] text-[#929BAA]">
                        {log.module}
                      </td>

                      <td className="px-3 py-2">
                        <span className="block max-w-[150px] text-[10px] leading-[14px] text-[#929BAA]">
                          {log.description}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-[10px] text-[#929BAA]">
                        {log.ipAddress}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-[10px] text-[#929BAA]">
                        {log.device}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="h-[180px] text-center">
                      <p className="text-[13px] font-medium text-[#475467]">
                        No audit logs found
                      </p>
                      <p className="mt-1 text-[11px] text-[#98A2B3]">
                        Try adjusting your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* ================================== */}
        {/* MOBILE BLOCK LAYOUT */}
        {/* ================================== */}

        <div className="flex w-full flex-col gap-3 md:hidden">

          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (

              <article
                key={log.id}
                className="w-full min-w-0 overflow-hidden rounded-[8px] border border-[#E4E8EF] bg-white"
              >

                {/* CARD HEADER */}
                <div className="flex items-center justify-between gap-3 border-b border-[#EDF0F4] px-3 py-3 sm:px-4">

                  <div className="flex min-w-0 items-center gap-2.5">

                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#F0F1F4]">
                      <UserRound
                        size={17}
                        className="text-[#8791A2]"
                      />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-[12px] font-semibold text-[#252B36] sm:text-[13px]">
                        {log.user}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-[#929BAA]">
                        {log.role}
                      </p>

                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#F1F3F7] px-2.5 py-1 text-[10px] font-medium text-[#667085]">
                    {log.action}
                  </span>

                </div>

                {/* CARD CONTENT */}
                <div className="px-3 py-3 sm:px-4">

                  {/* DATE */}
                  <div className="mb-3 flex items-center gap-2">

                    <Clock3
                      size={13}
                      className="shrink-0 text-[#929BAA]"
                    />

                    <span className="text-[11px] text-[#929BAA]">
                      {log.date} · {log.time}
                    </span>

                  </div>

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4">

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] text-[#A0A8B5]">
                        Module
                      </p>

                      <p className="break-words text-[11px] font-medium text-[#475467]">
                        {log.module}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] text-[#A0A8B5]">
                        IP Address
                      </p>

                      <p className="break-all text-[11px] font-medium text-[#475467]">
                        {log.ipAddress}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] text-[#A0A8B5]">
                        Description
                      </p>

                      <p className="break-words text-[11px] leading-[17px] text-[#929BAA]">
                        {log.description}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] text-[#A0A8B5]">
                        Device
                      </p>

                      <div className="flex items-center gap-1.5">
                        <Monitor
                          size={12}
                          className="shrink-0 text-[#929BAA]"
                        />

                        <p className="break-words text-[11px] font-medium text-[#475467]">
                          {log.device}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

              </article>

            ))
          ) : (

            <div className="flex min-h-[180px] w-full flex-col items-center justify-center rounded-[8px] border border-[#E4E8EF] bg-white px-4 text-center">

              <Search
                size={23}
                className="mb-2 text-[#A7B0BF]"
              />

              <p className="text-[13px] font-medium text-[#475467]">
                No audit logs found
              </p>

              <p className="mt-1 text-[11px] text-[#98A2B3]">
                Try adjusting your search or filters.
              </p>

            </div>

          )}

        </div>

      </div>
    </section>
  );
}
