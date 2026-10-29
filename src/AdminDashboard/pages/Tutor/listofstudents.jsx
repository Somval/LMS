import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { tutorData } from "./tutorData";

export default function TutorTable({ onViewDetails }) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleViewDetails = (tutor) => {
    if (onViewDetails) {
      onViewDetails(tutor);
      return;
    }

    navigate(`/admin/tutors/${tutor.id}`);
  };

  const filteredTutors = useMemo(() => {
    return tutorData.filter((tutor) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        (tutor.name && tutor.name.toLowerCase().includes(search)) ||
        (tutor.id && tutor.id.toLowerCase().includes(search)) ||
        (tutor.emailOrId && tutor.emailOrId.toLowerCase().includes(search));

      const matchesLevel = selectedLevel
        ? tutor.level?.toLowerCase() === selectedLevel.toLowerCase()
        : true;

      const matchesStatus = selectedStatus
        ? tutor.status?.toLowerCase() === selectedStatus.toLowerCase()
        : true;

      const matchesSubject = selectedSubject
        ? tutor.subjects?.some((subject) =>
            subject.toLowerCase().includes(selectedSubject.toLowerCase())
          )
        : true;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesStatus &&
        matchesSubject
      );
    });
  }, [searchTerm, selectedLevel, selectedStatus, selectedSubject]);

  const statusClasses = (status) =>
    status === "Active"
      ? "bg-[#E2F5D8] text-[#1E7212]"
      : "bg-[#FDE2E2] text-[#E53E3E]";

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6 font-['Inter']">
      {/* Search and filters */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <div className="relative flex items-center">
          <svg
            className="absolute left-3.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tutor name or ID..."
            aria-label="Search tutors"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <FilterSelect
          label="Level"
          value={selectedLevel}
          onChange={setSelectedLevel}
          options={["Year 4", "Year 5"]}
        />

        <FilterSelect
          label="Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={["Active", "Pending"]}
        />

        <FilterSelect
          label="Subjects"
          value={selectedSubject}
          onChange={setSelectedSubject}
          options={["Mathematics", "English"]}
        />
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#EEF2F6] text-[13px] font-semibold text-slate-600">
              <th className="rounded-l-lg px-4 py-3.5">Tutor</th>
              <th className="px-4 py-3.5">Subjects</th>
              <th className="px-4 py-3.5">Level</th>
              <th className="px-4 py-3.5">Assigned Students</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="rounded-r-lg px-4 py-3.5 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredTutors.length > 0 ? (
              filteredTutors.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <TutorAvatar name={row.name} />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {row.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {row.emailOrId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-700">
                    {row.subjects?.join(", ")}
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-700">
                    {row.level}
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-700">
                    {row.assignedStudents}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewDetails(row)}
                        className="rounded-md border border-[#8B93A7] px-4 py-1.5 text-xs font-semibold text-[#4A5568] transition-colors hover:bg-gray-100"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        aria-label={`More options for ${row.name}`}
                        className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                      >
                        <MoreVerticalIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-sm text-gray-400"
                >
                  No tutors found matching your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile tutor cards */}
      <div className="block space-y-3 md:hidden">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200"
            >
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex min-w-0 items-center gap-3">
                  <TutorAvatar name={row.name} />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {row.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-400">
                      {row.emailOrId}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(
                    row.status
                  )}`}
                >
                  {row.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 py-4">
                <div className="min-w-0">
                  <span className="mb-1 block text-xs text-gray-400">
                    Subjects
                  </span>
                  <span className="break-words text-xs font-medium text-slate-800">
                    {row.subjects?.join(", ")}
                  </span>
                </div>

                <div>
                  <span className="mb-1 block text-xs text-gray-400">
                    Level
                  </span>
                  <span className="text-xs font-medium text-slate-800">
                    {row.level}
                  </span>
                </div>

                <div>
                  <span className="mb-1 block text-xs text-gray-400">
                    Students
                  </span>
                  <span className="text-xs font-medium text-slate-800">
                    {row.assignedStudents}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                <button
                  type="button"
                  onClick={() => handleViewDetails(row)}
                  className="w-full rounded-md border border-[#8B93A7] px-4 py-2 text-xs font-semibold text-[#4A5568] transition-colors hover:bg-gray-100"
                >
                  View Profile
                </button>

                <button
                  type="button"
                  aria-label={`More options for ${row.name}`}
                  className="rounded-md border border-gray-200 p-2 text-gray-400 hover:bg-gray-50"
                >
                  <MoreVerticalIcon />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
            No tutors found matching your search or filters.
          </div>
        )}
      </div>

      {/* Pagination footer */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 pt-2 text-xs font-medium text-slate-500 sm:flex-row sm:text-sm">
        <p>
          Showing {filteredTutors.length > 0 ? 1 : 0}–
          {filteredTutors.length} of {filteredTutors.length} filtered entries
          <span className="text-gray-400">
            {" "}
            ({tutorData.length} total tutors)
          </span>
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100/80 text-gray-400"
          >
            ‹
          </button>

          <button
            type="button"
            aria-current="page"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-[#B4C8FF] font-semibold text-[#1E40AF]"
          >
            1
          </button>

          <button
            type="button"
            aria-label="Next page"
            disabled
            className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100/80 text-gray-400"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Filter by ${label}`}
        className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">{label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDownIcon />
    </div>
  );
}

function TutorAvatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
    : "T";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8EEFF] text-sm font-semibold text-[#3456A5]">
      {initials}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function MoreVerticalIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}