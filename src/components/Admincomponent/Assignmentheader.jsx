import React from "react";
import { ArrowLeft, ClipboardList, User, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentDetailsPage({
  assignmentData = {
    title: "Algebra Practice",
    status: "Ongoing",
    subtitle: "View full details of the assignment, including questions, submissions and student performance.",
    lesson: "Introduction to Algebra",
    subject: "Mathematics - Year 1",
    topic: "Topic 3",
    creator: "James O.",
    createdAt: "Oct 10, 2026, 10:24 AM",
    description: "Solve the questions and show your working clearly.",
    stats: {
      total: 20,
      submitted: 18,
      notSubmitted: 2,
      lateSubmissions: 0,
    },
  },
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const { stats } = assignmentData;
  const submittedPct = Math.round((stats.submitted / stats.total) * 100);
  const notSubmittedPct = Math.round((stats.notSubmitted / stats.total) * 100);
  const latePct = Math.round((stats.lateSubmissions / stats.total) * 100);

  // Donut chart calculation (SVG stroke-dasharray)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (submittedPct / 100) * circumference;

  return (
    <div className=" w-full bg-[#f4f7fb] p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Back Link */}
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0f172a] hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Assignments &amp; Quizzes</span>
        </button>

        {/* Page Header with Badge */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
              Assignment Details
            </h1>
            <span className="inline-flex items-center rounded-lg bg-[#e6f9ed] px-3 py-1 text-xs font-medium text-[#16a34a]">
              {assignmentData.status}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            {assignmentData.subtitle}
          </p>
        </div>

        {/* Top Section: Details & Donut Chart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* Card 1: Assignment Overview */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex items-start gap-4">
              {/* Icon Container */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#4f46e5]">
            <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.03125 2.125C8.73785 2.125 8.5 2.36285 8.5 2.65625V3.71875C8.5 4.01215 8.73785 4.25 9.03125 4.25H16.4688C16.7622 4.25 17 4.01215 17 3.71875V2.65625C17 2.36285 16.7622 2.125 16.4688 2.125H9.03125ZM6.42813 2.125C6.67425 0.91256 7.74618 0 9.03125 0H16.4688C17.7538 0 18.8258 0.91256 19.0719 2.125H21.25C23.5972 2.125 25.5 4.02779 25.5 6.375V29.75C25.5 32.0972 23.5972 34 21.25 34H4.25C1.90279 34 0 32.0972 0 29.75V6.375C0 4.02779 1.90279 2.125 4.25 2.125H6.42813ZM6.42813 4.25H4.25C3.0764 4.25 2.125 5.2014 2.125 6.375V29.75C2.125 30.9236 3.0764 31.875 4.25 31.875H21.25C22.4236 31.875 23.375 30.9236 23.375 29.75V6.375C23.375 5.2014 22.4236 4.25 21.25 4.25H19.0719C18.8258 5.46244 17.7538 6.375 16.4688 6.375H9.03125C7.74618 6.375 6.67425 5.46244 6.42813 4.25Z" fill-rule="evenodd" clip-rule="evenodd" fill="#2121EF"/>
</svg>

              </div>

              {/* Title & Lesson */}
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-[#0f172a]">
                  {assignmentData.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#64748b] mt-0.5">
                  Lesson: {assignmentData.lesson}
                </p>
              </div>
            </div>

            {/* Subject & Topic Meta */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <span className="text-xs font-bold text-[#0f172a]">Subject</span>
                <p className="text-xs text-[#64748b] mt-0.5">
                  {assignmentData.subject}
                </p>
              </div>
              <div>
                <span className="text-xs font-bold text-[#0f172a]">Topic</span>
                <p className="text-xs text-[#64748b] mt-0.5">
                  {assignmentData.topic}
                </p>
              </div>
            </div>

            {/* Creator & Timestamp Footer */}
            <div className="flex flex-wrap items-center gap-6 pt-5 mt-5 border-t border-[#f1f5f9] text-xs text-[#64748b]">
              <div className="flex items-center gap-1.5">
             <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.12402 0C14.1632 0 18.2488 4.08493 18.249 9.12402C18.249 14.1633 14.1633 18.249 9.12402 18.249C4.08493 18.2488 0 14.1632 0 9.12402C0.000177097 4.08504 4.08504 0.000177101 9.12402 0ZM5.66797 12.874C5.07229 12.8741 4.55938 13.2949 4.44238 13.8789L4.16895 15.2432C5.5222 16.3405 7.24606 16.9989 9.12402 16.999C11.0071 16.999 12.7349 16.3361 14.0898 15.2334L13.8193 13.8789C13.7023 13.2948 13.1895 12.874 12.5938 12.874H11.9258C11.8288 12.8741 11.7332 12.8971 11.6465 12.9404L11.0879 13.2197C9.85629 13.8355 8.40643 13.8354 7.1748 13.2197L6.61523 12.9404C6.5285 12.8971 6.4329 12.874 6.33594 12.874H5.66797ZM9.12402 1.25C4.7754 1.25018 1.25018 4.7754 1.25 9.12402C1.25 11.0571 1.94769 12.8269 3.10352 14.1973L3.2168 13.6338C3.45065 12.4655 4.47644 11.6241 5.66797 11.624H6.33594C6.62699 11.624 6.91448 11.6921 7.1748 11.8223L7.7334 12.1016C8.61317 12.5414 9.64855 12.5414 10.5283 12.1016L11.0879 11.8223C11.3481 11.6922 11.6349 11.6241 11.9258 11.624H12.5938C13.7853 11.624 14.811 12.4654 15.0449 13.6338L15.1553 14.1846C16.3048 12.8159 16.999 11.0513 16.999 9.12402C16.9988 4.77529 13.4728 1.25 9.12402 1.25ZM9.13086 2.87402C11.2018 2.87402 12.8806 4.55315 12.8809 6.62402C12.8809 8.69509 11.2019 10.374 9.13086 10.374C7.05982 10.374 5.38086 8.69507 5.38086 6.62402C5.38109 4.55318 7.05997 2.87406 9.13086 2.87402ZM9.13086 4.12402C7.75032 4.12406 6.63109 5.24353 6.63086 6.62402C6.63086 8.00471 7.75018 9.12399 9.13086 9.12402C10.5116 9.12402 11.6309 8.00473 11.6309 6.62402C11.6306 5.24351 10.5114 4.12402 9.13086 4.12402Z" fill="#69737D"/>
</svg>

                <span>Created by {assignmentData.creator}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#94a3b8]" />
                <span>{assignmentData.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Submission Donut Chart */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* SVG Donut Chart */}
            <div className="relative flex items-center justify-center shrink-0">
              
              <svg width="161" height="161" viewBox="0 0 161 161" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.68453 80.1328C3.23864 80.1328 -0.407174 83.746 0.0366732 88.1697C1.34922 101.251 5.85158 113.857 13.2012 124.856C22.0467 138.094 34.6191 148.412 49.3285 154.505C64.038 160.598 80.2238 162.192 95.8393 159.086C111.455 155.98 125.798 148.313 137.057 137.055C148.315 125.797 155.982 111.453 159.088 95.8376C162.194 80.2221 160.6 64.0363 154.507 49.3268C148.414 34.6174 138.096 22.045 124.858 13.1995C113.858 5.84986 101.253 1.3475 88.1714 0.0349516C83.7477 -0.408896 80.1345 3.23692 80.1345 7.68281C80.1345 12.1287 83.7526 15.681 88.1638 16.2353C98.0558 17.4783 107.563 21.0066 115.913 26.5862C126.504 33.6625 134.758 43.7204 139.632 55.488C144.507 67.2556 145.782 80.2043 143.297 92.6966C140.812 105.189 134.679 116.664 125.672 125.67C116.666 134.677 105.191 140.81 92.6983 143.295C80.206 145.78 67.2573 144.505 55.4897 139.631C43.7222 134.756 33.6643 126.502 26.5879 115.912C21.0083 107.561 17.48 98.054 16.237 88.1621C15.6827 83.7508 12.1304 80.1328 7.68453 80.1328Z" fill="#2F7D4A"/>
</svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-lg sm:text-xl font-bold text-[#0f172a] leading-tight">
                  {stats.submitted}/{stats.total}
                </span>
                <span className="text-[11px] text-[#64748b]">Submitted</span>
              </div>
            </div>

            {/* Legend Stats List */}
            <div className="w-full sm:w-auto space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                  <span className="text-[#64748b]">Submitted</span>
                </div>
                <span className="font-medium text-[#0f172a]">
                  {stats.submitted} ({submittedPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" />
                  <span className="text-[#64748b]">Not Submitted</span>
                </div>
                <span className="font-medium text-[#0f172a]">
                  {stats.notSubmitted} ({notSubmittedPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-8">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-[#64748b]">Late Submissions</span>
                </div>
                <span className="font-medium text-[#0f172a]">
                  {stats.lateSubmissions} ({latePct}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Description & Instructions */}
        <div className="w-full rounded-2xl bg-white p-5 sm:p-6 shadow-xs border border-[#e2e8f0] space-y-3">
          <h2 className="text-sm sm:text-base font-bold text-[#0f172a]">
            Description / Instructions
          </h2>
          <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
            {assignmentData.description}
          </p>
        </div>
      </div>
    </div>
  );
}