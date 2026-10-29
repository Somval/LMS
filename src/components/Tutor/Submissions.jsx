
import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

const initialSubmissions = [
  {
    id: 1,
    student: 'Olivia Johnson',
    status: 'Submitted',
    submittedOn: 'Sep 15, 2026, 4:20 PM',
    dueDate: 'Sep 22, 2026',
    marks: '9 / 10',
    action: 'Review',
  },
  {
    id: 2,
    student: 'Olivia Johnson',
    status: 'In Progress',
    submittedOn: '—',
    dueDate: 'Sep 22, 2026',
    marks: '—',
    action: 'View',
  },
  {
    id: 3,
    student: 'Olivia Johnson',
    status: 'Not Started',
    submittedOn: '—',
    dueDate: 'Sep 22, 2026',
    marks: '—',
    action: 'View',
  },
  {
    id: 4,
    student: 'Olivia Johnson',
    status: 'Submitted',
    submittedOn: 'Sep 15, 2026, 4:20 PM',
    dueDate: 'Sep 22, 2026',
    marks: '—',
    action: 'View',
  },
  {
    id: 5,
    student: 'Olivia Johnson',
    status: 'Submitted',
    submittedOn: 'Sep 15, 2026, 4:20 PM',
    dueDate: 'Sep 22, 2026',
    marks: '9/10',
    action: 'Review',
  },
  {
    id: 6,
    student: 'Olivia Johnson',
    status: 'Submitted',
    submittedOn: 'Sep 15, 2026, 4:20 PM',
    dueDate: 'Sep 22, 2026',
    marks: '—',
    action: 'View',
  },
];

const statusStyles = {
  Submitted: 'bg-[#D9F6E5] text-[#008A3B]',
  'In Progress': 'bg-[#E1EAFF] text-[#2864F0]',
  'Not Started': 'bg-[#FFE1E4] text-[#D92D43]',
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex min-w-[66px] items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium leading-3 ${
        statusStyles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}

function StudentCell({ name }) {
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');

  return (
    <div className="flex min-w-[118px] items-center gap-3">
      <div
        aria-hidden="true"
        className="h-8 w-8 shrink-0 rounded-full bg-[#D9D9D9]"
      />

      <span className="max-w-[100px] text-[11px] font-medium leading-[14px] text-[#171717]">
        {firstName}
        {lastName && (
          <>
            <br />
            {lastName}
          </>
        )}
      </span>
    </div>
  );
}

export default function StudentSubmissions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const filteredSubmissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return initialSubmissions;

    return initialSubmissions.filter((submission) =>
      submission.student.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  const handleAction = (submission) => {
    setSelectedSubmission(submission);
  };

  return (
    <section className="w-full min-w-0 rounded-md bg-white p-4 text-[#171717] sm:p-5">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold leading-6 tracking-[-0.2px] sm:text-lg">
          Student Submissions
        </h2>

        <div className="relative w-full sm:w-[256px] sm:shrink-0">
          <Search
            size={17}
            strokeWidth={1.6}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#929AA6]"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search students..."
            aria-label="Search students"
            className="h-10 w-full rounded-md border border-[#E7EAF0] bg-[#F5F7FA] pl-9 pr-3 text-xs text-[#252B36] outline-none transition placeholder:text-[#929AA6] focus:border-[#8C91D7] focus:ring-2 focus:ring-[#777BCB]/10"
          />
        </div>
      </div>

      {/* Responsive table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[690px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[7%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[21%]" />
            <col className="w-[16%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
          </colgroup>

          <thead>
            <tr className="h-9 bg-[#EEF3FB] text-[#536B87]">
              <th className="rounded-l-[4px] px-3 text-center text-xs font-medium">
                #
              </th>
              <th className="px-2 text-xs font-medium">Student</th>
              <th className="px-2 text-xs font-medium">Status</th>
              <th className="px-2 text-xs font-medium">Submitted On</th>
              <th className="px-2 text-xs font-medium">Due Date</th>
              <th className="px-2 text-xs font-medium">Marks</th>
              <th className="rounded-r-[4px] px-2 text-center text-xs font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSubmissions.map((submission, index) => (
              <tr
                key={submission.id}
                className="h-[53px] border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#FAFBFE]"
              >
                <td className="px-3 text-center align-middle text-xs font-medium text-[#20242C]">
                  {index + 1}
                </td>

                <td className="px-2 align-middle">
                  <StudentCell name={submission.student} />
                </td>

                <td className="px-2 align-middle">
                  <StatusBadge status={submission.status} />
                </td>

                <td className="whitespace-nowrap px-2 align-middle text-[10px] text-[#858585]">
                  {submission.submittedOn}
                </td>

                <td className="whitespace-nowrap px-2 align-middle text-[10px] text-[#858585]">
                  {submission.dueDate}
                </td>

                <td className="whitespace-nowrap px-2 align-middle text-[11px] font-medium text-[#171717]">
                  {submission.marks}
                </td>

                <td className="px-2 text-center align-middle">
                  <button
                    type="button"
                    onClick={() => handleAction(submission)}
                    className="inline-flex min-w-[50px] items-center justify-center rounded-[3px] border border-[#8586C9] px-2.5 py-1 text-[10px] font-medium text-[#5153A0] transition-colors hover:bg-[#EEEEFF] focus:outline-none focus:ring-2 focus:ring-[#8586C9]/30"
                  >
                    {submission.action}
                  </button>
                </td>
              </tr>
            ))}

            {filteredSubmissions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-[#858C9B]"
                >
                  No students found matching "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Submission details */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-dialog-title"
            className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="submission-dialog-title"
              className="text-lg font-semibold text-[#20242C]"
            >
              {selectedSubmission.action === 'Review'
                ? 'Review Submission'
                : 'Submission Details'}
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-gray-500">Student</p>
                <p className="mt-1 text-sm font-medium">
                  {selectedSubmission.student}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedSubmission.status} />
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">Submitted On</p>
                <p className="mt-1 text-sm">
                  {selectedSubmission.submittedOn}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="mt-1 text-sm">
                  {selectedSubmission.dueDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Marks</p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedSubmission.marks}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="rounded-md bg-[#343783] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#292B6D]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
