
import React from "react";
import { BookOpen } from "lucide-react";

const subjects = [
  {
    id: 1,
    subject: "Mathematics",
    topicsCovered: "8/10",
    assignments: "5/6",
    quizzes: "5/6",
    averageScore: "90%",
    overallProgress: 85,
    remarks: "Excellent",
  },
  {
    id: 2,
    subject: "Mathematics",
    topicsCovered: "8/10",
    assignments: "5/6",
    quizzes: "5/6",
    averageScore: "90%",
    overallProgress: 85,
    remarks: "Excellent",
  },
  {
    id: 3,
    subject: "Mathematics",
    topicsCovered: "8/10",
    assignments: "5/6",
    quizzes: "5/6",
    averageScore: "90%",
    overallProgress: 85,
    remarks: "Excellent",
  },
  {
    id: 4,
    subject: "Mathematics",
    topicsCovered: "8/10",
    assignments: "5/6",
    quizzes: "5/6",
    averageScore: "90%",
    overallProgress: 85,
    remarks: "Excellent",
  },
];

const columns = [
  "Subject",
  "Topics Covered",
  "Assignments",
  "Quizzes",
  "Average Score",
  "Overall Progress",
  "Remarks",
];

export default function SubjectProgress() {
  return (
    <section className="w-full rounded-lg bg-white p-3 sm:p-4">
      {/* Section Heading */}
      <div className="mb-4 flex items-center gap-2">
        <BookOpen
          size={19}
          strokeWidth={1.7}
          className="shrink-0 text-[#222222]"
          aria-hidden="true"
        />

        <h2 className="text-sm font-semibold leading-tight tracking-[-0.15px] text-[#171717] sm:text-base">
          Subject Progress
        </h2>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto rounded-[4px] border border-[#E0E5EF]">
        <table className="w-full min-w-[650px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[12%]" />
            <col className="w-[15%]" />
            <col className="w-[14%]" />
            <col className="w-[11%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
          </colgroup>

          {/* Table Header */}
          <thead>
            <tr className="h-[29px] bg-[#E9EDF5]">
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="whitespace-nowrap px-2 py-2 text-[9px] font-medium leading-none text-[#454B57] sm:px-2.5 sm:text-[10px]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject.id}
                className="h-[28px] border-b border-white last:border-b-0"
              >
                <td className="whitespace-nowrap bg-[#F7F9FC] px-2 py-2 text-[9px] font-normal text-[#343A46] sm:px-2.5 sm:text-[10px]">
                  {subject.subject}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2 py-2 text-[9px] text-[#454B57] sm:px-2.5 sm:text-[10px]">
                  {subject.topicsCovered}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2 py-2 text-[9px] text-[#454B57] sm:px-2.5 sm:text-[10px]">
                  {subject.assignments}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2 py-2 text-[9px] text-[#454B57] sm:px-2.5 sm:text-[10px]">
                  {subject.quizzes}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2 py-2 text-[9px] font-semibold text-[#242424] sm:px-2.5 sm:text-[10px]">
                  {subject.averageScore}
                </td>

                {/* Overall Progress */}
                <td className="bg-[#F7F9FC] px-2 py-1.5 sm:px-2.5">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-[9px] font-medium leading-none text-[#30343B] sm:text-[10px]">
                      {subject.overallProgress}%
                    </span>

                    <div
                      className="h-[5px] w-full overflow-hidden rounded-full bg-[#E4E5E9]"
                      role="progressbar"
                      aria-label={`${subject.subject} overall progress`}
                      aria-valuenow={subject.overallProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full bg-[#16D923] transition-[width] duration-300"
                        style={{
                          width: `${subject.overallProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* Remarks */}
                <td className="bg-[#F7F9FC] px-2 py-1.5 sm:px-2.5">
                  <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-[#D9F8DF] px-2 py-1 text-[9px] font-medium leading-none text-[#168532] sm:text-[10px]">
                    {subject.remarks}
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
