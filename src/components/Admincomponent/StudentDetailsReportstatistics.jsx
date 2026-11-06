
import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import {
  ArrowLeft,
  Download,
  ChartNoAxesColumnIncreasing,
  UsersRound,
  Video,
  CalendarDays,
  BookOpen,
} from "lucide-react";


const buildMetrics = (student) => [
  {
    title: "Average Score",
    value: student.averageScore,
    icon: ChartNoAxesColumnIncreasing,
    cardColor: "bg-[#E6F6DF]",
    iconTextColor: "text-[#24C743]",
    bg: "#BADABA",
  },
  {
    title: "Subjects Enrolled",
    value: student.subjectsEnrolled,
    icon: UsersRound,
    cardColor: "bg-[#EAF0FF]",
    iconTextColor: "text-[#2864FF]",
    bg: "#1755E740",
  },
  {
    title: "Classes Attended",
    value: student.classesAttended,
    icon: Video,
    cardColor: "bg-[#F4EBE7]",
    iconTextColor: "text-[#D9863D]",
    bg: "#E2CAB1",
  },
  {
    title: "Attendance Rate",
    value: student.attendanceRate,
    icon: CalendarDays,
    cardColor: "bg-[#F0DDF8]",
    iconTextColor: "text-[#A21BD0]",
    bg: "#EBB9FE",
  },
];


const subjectColumns = [
  "Subject",
  "Topics Covered",
  "Assignments",
  "Quizzes",
  "Average Score",
  "Overall Progress",
  "Remarks",
];

function SubjectProgress({ subjects = [] }) {
  return (
    <section className="w-full min-w-0 rounded-lg bg-white p-3.5 sm:p-4 lg:p-5">
      {/* Section Heading */}
      <div className="mb-4 flex items-center gap-2.5">
        <BookOpen
          size={20}
          strokeWidth={1.7}
          className="shrink-0 text-[#222222]"
          aria-hidden="true"
        />

        <h2 className="text-base font-semibold leading-tight tracking-[-0.15px] text-[#171717] sm:text-[17px]">
          Subject Progress
        </h2>
      </div>

      {/* Responsive Table */}
      <div className="w-full min-w-0 overflow-x-auto rounded-[5px] border border-[#E0E5EF]">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[12%]" />
            <col className="w-[15%]" />
            <col className="w-[14%]" />
            <col className="w-[11%]" />
            <col className="w-[16%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
          </colgroup>

          <thead>
            <tr className="h-[38px] bg-[#E9EDF5]">
              {subjectColumns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="whitespace-nowrap px-2.5 py-2.5 text-[11px] font-semibold leading-tight text-[#454B57] sm:px-3 sm:text-xs"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject.id}
                className="h-[38px] border-b border-white last:border-b-0"
              >
                <td className="whitespace-nowrap bg-[#F7F9FC] px-2.5 py-2.5 text-[11px] text-[#343A46] sm:px-3 sm:text-xs">
                  {subject.subject}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2.5 py-2.5 text-[11px] text-[#454B57] sm:px-3 sm:text-xs">
                  {subject.topicsCovered}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2.5 py-2.5 text-[11px] text-[#454B57] sm:px-3 sm:text-xs">
                  {subject.assignments}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2.5 py-2.5 text-[11px] text-[#454B57] sm:px-3 sm:text-xs">
                  {subject.quizzes}
                </td>

                <td className="whitespace-nowrap bg-[#F7F9FC] px-2.5 py-2.5 text-[11px] font-semibold text-[#242424] sm:px-3 sm:text-xs">
                  {subject.averageScore}
                </td>

                {/* Overall Progress */}
                <td className="bg-[#F7F9FC] px-2.5 py-2 sm:px-3">
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-[11px] font-medium leading-tight text-[#30343B] sm:text-xs">
                      {subject.overallProgress}%
                    </span>

                    <div
                      className="h-[6px] w-full overflow-hidden rounded-full bg-[#E4E5E9]"
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
                <td className="bg-[#F7F9FC] px-2.5 py-2 sm:px-3">
                  <span className={`inline-flex items-center justify-center whitespace-nowrap rounded-[3px] px-2.5 py-1.5 text-[10px] font-semibold leading-tight sm:text-[11px] ${remarkStyles[subject.remarks] || "bg-[#EEF1F6] text-[#667085]"}`}>
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

const remarkStyles = {
  Excellent: "bg-[#D9F8DF] text-[#168532]",
  "On Track": "bg-[#FFF0D9] text-[#986515]",
  Poor: "bg-[#FFE4E5] text-[#D92735]",
};

const pctText = (n) => (n == null ? "—" : `${n}%`);

export default function StudentDetailsStatistics({ report }) {
  const student = {
    ...report.student,
    guardian: report.student.guardian || "—",
    reportPeriod: "All time",
    averageScore: pctText(report.metrics.averageScore),
    subjectsEnrolled: report.metrics.subjectsEnrolled,
    classesAttended: `${report.metrics.classesAttended} / ${report.metrics.classesTotal}`,
    attendanceRate: pctText(report.metrics.attendanceRate),
  };
  const subjects = report.subjects.map((s) => ({ ...s, averageScore: pctText(s.averageScore) }));
  const metrics = buildMetrics(student);

  const navigate = useNavigate();

  const handleDownload = () => {
    const report = [
      "STUDENT PROGRESS REPORT",
      "=======================",
      "",
      `Student Name: ${student.name}`,
      `Student ID: ${student.studentId}`,
      `Guardian: ${student.guardian}`,
      `Report Period: ${student.reportPeriod}`,
      "",
      "PROGRESS SUMMARY",
      "================",
      `Average Score: ${student.averageScore}`,
      `Subjects Enrolled: ${student.subjectsEnrolled}`,
      `Classes Attended: ${student.classesAttended}`,
      `Attendance Rate: ${student.attendanceRate}`,
      "",
      "SUBJECT PROGRESS",
      "================",
      ...subjects.map(
        (subject) =>
          `${subject.subject} | Topics: ${subject.topicsCovered} | Assignments: ${subject.assignments} | Quizzes: ${subject.quizzes} | Average: ${subject.averageScore} | Progress: ${subject.overallProgress}% | Remarks: ${subject.remarks}`
      ),
    ].join("\n");

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `student-progress-${student.studentId}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="w-full min-w-0 bg-[#F4F7FD] font-sans text-[#111111]">
      <div className="flex w-full min-w-0 flex-col gap-5 sm:gap-6">
        {/* Page Header */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#444444] transition-colors hover:text-black sm:text-[13px]"
            >
              <ArrowLeft size={15} strokeWidth={1.8} />
              <span>Back to Progress &amp; Reports</span>
            </button>

            <h1 className="text-xl font-bold leading-tight tracking-[-0.4px] sm:text-[22px] lg:text-2xl">
              Student Progress Report
            </h1>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex min-h-[38px] w-fit items-center justify-center gap-2 rounded-[4px] bg-[#00520D] px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#003F0A] focus:outline-none focus:ring-2 focus:ring-[#00520D] focus:ring-offset-2 sm:text-[13px]"
          >
            <Download size={16} strokeWidth={2} />
            <span>Download Progress</span>
          </button>
        </header>

        {/* Student Information */}
        <section
          aria-label="Student information"
          className="flex min-w-0 items-start gap-3 sm:gap-4"
        >
          <Avatar
            name={student.name}
            avatarUrl={student.avatarUrl}
            textClassName="text-base"
            className="h-12 w-12 shrink-0 rounded-full sm:h-[54px] sm:w-[54px]"
          />

          <div className="min-w-0 flex-1 pt-0.5">
            <h2 className="truncate text-lg font-bold leading-tight tracking-[-0.2px] sm:text-xl">
              {student.name}
            </h2>

            <div className="mt-2 flex flex-col gap-x-4 gap-y-1.5 text-xs leading-relaxed text-[#667085] sm:flex-row sm:flex-wrap sm:gap-x-5 sm:text-[13px]">
              <p>
                <span>Student ID: </span>
                <span>{student.studentId}</span>
              </p>

              <p>
                <span>Guardian: </span>
                <span>{student.guardian}</span>
              </p>

              <p>
                <span>Report Period: </span>
                <span>{student.reportPeriod}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Summary Metric Cards */}
        <section
          aria-label="Student progress summary"
          className="grid w-full grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:gap-3 lg:grid-cols-4"
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.title}
                className={`flex min-h-[74px] min-w-0 items-center gap-2.5 rounded-[5px] border border-black/[0.06] px-3.5 py-3 sm:min-h-[80px] sm:gap-3 sm:px-4 ${metric.cardColor}`}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
                  style={{ backgroundColor: metric.bg }}
                >
                  <Icon
                    size={20}
                    strokeWidth={2.2}
                    className={metric.iconTextColor}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium leading-snug text-[#252525] sm:text-[13px]">
                    {metric.title}
                  </p>

                  <p className="mt-1 text-base font-bold leading-tight text-[#111111] sm:text-lg">
                    {metric.value}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Subject Progress */}
        <SubjectProgress subjects={subjects} />
      </div>
    </main>
  );
}
