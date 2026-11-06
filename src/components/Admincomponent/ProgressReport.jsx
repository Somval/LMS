
import React from "react";
import { CalendarDays, FileText } from "lucide-react";



function AttendanceRecords({ attendanceRecords = [] }) {
  const columns = [
    "Date",
    "Subject",
    "Class Time",
    "Time Joined",
    "Time Spent",
    "Status",
  ];

  return (
    <section className="w-full rounded-lg bg-white p-3.5 sm:p-4 lg:p-5">
      {/* Section Heading */}
      <div className="mb-3 flex items-center gap-2.5">
        <CalendarDays
          size={20}
          strokeWidth={1.7}
          className="shrink-0 text-[#242424]"
          aria-hidden="true"
        />

        <h2 className="text-[15px] font-semibold leading-tight text-[#171717] sm:text-base">
          Attendance Records
        </h2>
      </div>

      {/* Attendance Table */}
      <div className="w-full overflow-x-auto rounded-[5px] border border-[#E0E5EF]">
        <table className="w-full min-w-[700px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[16%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[17%]" />
            <col className="w-[16%]" />
            <col className="w-[17%]" />
          </colgroup>

          {/* Table Header */}
          <thead>
            <tr className="h-[38px] bg-[#E9EDF5]">
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="whitespace-nowrap px-2.5 py-2.5 text-[11px] font-semibold leading-tight text-[#424956] sm:px-3 sm:text-xs"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {attendanceRecords.map((record) => (
              <tr
                key={record.id}
                className="h-[38px] border-b border-white last:border-b-0"
              >
                <td className="whitespace-nowrap bg-[#F8F9FC] px-2.5 py-2.5 text-[10px] text-[#353B46] sm:px-3 sm:text-[11px]">
                  {record.date}
                </td>

                <td className="whitespace-nowrap bg-[#F8F9FC] px-2.5 py-2.5 text-[10px] text-[#353B46] sm:px-3 sm:text-[11px]">
                  {record.subject}
                </td>

                <td className="whitespace-nowrap bg-[#F8F9FC] px-2.5 py-2.5 text-[10px] text-[#353B46] sm:px-3 sm:text-[11px]">
                  {record.classTime}
                </td>

                <td className="whitespace-nowrap bg-[#F8F9FC] px-2.5 py-2.5 text-[10px] text-[#353B46] sm:px-3 sm:text-[11px]">
                  {record.timeJoined}
                </td>

                <td className="whitespace-nowrap bg-[#F8F9FC] px-2.5 py-2.5 text-[10px] text-[#353B46] sm:px-3 sm:text-[11px]">
                  {record.timeSpent}
                </td>

                <td className="bg-[#F8F9FC] px-2.5 py-2 sm:px-3">
                  <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-[#D9F8DF] px-2.5 py-1.5 text-[10px] font-semibold leading-tight text-[#168532] sm:text-[11px]">
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TeachersRemarks({ teachersRemarks = [] }) {
  return (
    <section className="w-full rounded-lg bg-white p-3.5 sm:p-4 lg:p-5">
      {/* Section Heading */}
      <div className="mb-4 flex items-center gap-2.5">
        <FileText
          size={20}
          strokeWidth={1.7}
          className="shrink-0 text-[#242424]"
          aria-hidden="true"
        />

        <h2 className="text-[15px] font-semibold leading-tight text-[#171717] sm:text-base">
          Teachers Remarks
        </h2>
      </div>

      {/* Remarks */}
      <div className="flex flex-col gap-3.5 px-1 sm:px-2">
        {teachersRemarks.map((remark) => (
          <article
            key={remark.id}
            className="flex min-w-0 flex-col rounded-[6px] bg-[#F0F5F3] px-3.5 py-3.5 sm:px-4 sm:py-4"
          >
            <p className="text-[12px] font-normal leading-[1.75] text-[#687780] sm:text-[13px]">
              {remark.message}
            </p>

            <p className="mt-3 text-right text-[11px] font-medium leading-relaxed text-[#59636A] sm:text-xs">
              {remark.teacher}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export default function AttendanceAndRemarks({ report }) {
  const records = report.attendance.map((a) => ({
    id: a.id,
    date: fmtDate(a.startsAt),
    subject: a.subject,
    classTime: `${fmtTime(a.startsAt)} - ${fmtTime(a.endsAt)}`,
    timeJoined: "—", // join times are not recorded
    timeSpent: `${Math.round((new Date(a.endsAt) - new Date(a.startsAt)) / 60000)} min`, // scheduled length
    status: a.status,
  }));

  return (
    <div className="flex w-full flex-col gap-3.5 bg-[#F4F7FD]">
      <AttendanceRecords attendanceRecords={records} />
      <TeachersRemarks teachersRemarks={report.remarks} />
    </div>
  );
}
