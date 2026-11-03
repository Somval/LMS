import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { formatLinkedDate, initials, tutorsOf } from "./childrenData";

// Shows the first item; with more than one, it expands to list the rest.
function ListCell({ items, empty }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return <span className="text-slate-400">{empty}</span>;
  if (items.length === 1) return <span>{items[0]}</span>;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
      >
        <span>
          {items[0]}
          {!open && ` +${items.length - 1}`}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="mt-1 space-y-0.5 text-slate-500">
          {items.slice(1).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ChildrenOverviewTable({ kids = [] }) {
  const childrenData = kids.map((kid) => ({
    id: kid.studentId,
    name: kid.fullName,
    initials: initials(kid.fullName),
    subjects: kid.subjects.map((subject) => subject.subject),
    tutors: tutorsOf(kid),
    achievements: String(kid.overall.achievements),
    attendance:
      kid.overall.attendanceRate == null ? "—" : `${kid.overall.attendanceRate}%`,
    dateLinked: formatLinkedDate(kid.linkedAt),
    status: "Active",
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
      {/* Section Header */}
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
        Children Overview
      </h2>

      {/* Table Container Card with Background #EBF0F6 */}
      <div 
        style={{ backgroundColor: "#EBF0F6" }} 
        className="border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 sm:py-4 px-4 sm:px-6">Child</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Subjects</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Tutors</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Achievements</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Attendance</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Date Linked</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs sm:text-sm">
              {childrenData.map((child) => (
                <tr 
                  key={child.id}
                  className="hover:bg-slate-200/40 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Child Profile & Name */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs sm:text-sm font-bold text-indigo-700 ring-1 ring-slate-200 dark:ring-slate-700"
                      >
                        {child.initials}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {child.name}
                      </span>
                    </div>
                  </td>

                  {/* Subjects Dropdown Field */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <ListCell items={child.subjects} empty="None yet" />
                  </td>

                  {/* Tutors Dropdown Field */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <ListCell items={child.tutors} empty="Not assigned yet" />
                  </td>

                  {/* Achievements */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {child.achievements}
                  </td>

                  {/* Attendance */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {child.attendance}
                  </td>

                  {/* Date Linked */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {child.dateLinked}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      {child.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}