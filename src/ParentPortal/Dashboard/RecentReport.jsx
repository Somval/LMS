
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import {
  formatDate,
  monthTitle,
  printReport,
  reportDate,
  summaryText,
} from "../ProgressReports/reportData";
import ImageReport from "../../assets/images/beaafa52f889bf07e0efa09168d5fc033d58bdbb (1).png";

export default function RecentReport({ studentId, student }) {
  const navigate = useNavigate();
  const studentName = student?.name ?? "Student";
  const firstName = studentName.split(/\s+/)[0];

  // Latest monthly report for this child: GET /dashboard/parent/:studentId/reports
  const [info, setInfo] = useState(null); // { student, generatedAt, reports }
  const [state, setState] = useState("loading"); // loading | ready | error

  useEffect(() => {
    if (!studentId) return;
    let cancelled = false;
    setState("loading");
    api
      .get(`/dashboard/parent/${studentId}/reports`)
      .then((res) => {
        if (cancelled) return;
        setInfo(res);
        setState("ready");
      })
      .catch(() => !cancelled && setState("error"));
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  const latest = info?.reports?.[0] ?? null;

  const handleDownload = () => {
    if (latest) printReport(latest, info.student, info.generatedAt);
  };

  const handleViewAll = () =>
    navigate("/parent/progress-reports", { state: { childId: studentId } });

  const title = latest ? `${monthTitle(latest)} Progress Report` : "Progress Report";
  const description =
    state === "loading"
      ? "Loading the latest report…"
      : state === "error"
      ? "Could not load the report. Try again later."
      : latest
      ? summaryText(firstName, latest)
      : `No report for ${firstName} yet.`;
  const dateValue = latest ? reportDate(latest, info.generatedAt) : null;

  return (
    <section className="box-border mb-5 lg:mb-1 h-[252px] w-full max-w-[364px] overflow-hidden rounded-xl border border-[#EEF1F7] bg-white p-5 shadow-[0_3px_2px_rgba(15,23,42,0.10)]">
      {/* Header */}
      <header className="flex h-[24px] items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-5">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M6.46875 8.80469C6.17103 8.80469 5.92969 9.04603 5.92969 9.34375C5.92969 9.64147 6.17103 9.88281 6.46875 9.88281H10.7812C11.079 9.88281 11.3203 9.64147 11.3203 9.34375C11.3203 9.04603 11.079 8.80469 10.7812 8.80469H6.46875Z"
              fill="#2E6DFF"
            />
            <path
              d="M6.46875 11.6797C6.17103 11.6797 5.92969 11.921 5.92969 12.2188C5.92969 12.5165 6.17103 12.7578 6.46875 12.7578H16.5312C16.829 12.7578 17.0703 12.5165 17.0703 12.2188C17.0703 11.921 16.829 11.6797 16.5312 11.6797H6.46875Z"
              fill="#2E6DFF"
            />
            <path
              d="M6.46875 14.5547C6.17103 14.5547 5.92969 14.796 5.92969 15.0938C5.92969 15.3915 6.17103 15.6328 6.46875 15.6328H16.5312C16.829 15.6328 17.0703 15.3915 17.0703 15.0938C17.0703 14.796 16.829 14.5547 16.5312 14.5547H6.46875Z"
              fill="#2E6DFF"
            />
            <path
              d="M6.46875 17.4297C6.17103 17.4297 5.92969 17.671 5.92969 17.9688C5.92969 18.2665 6.17103 18.5078 6.46875 18.5078H13.6562C13.954 18.5078 14.1953 18.2665 14.1953 17.9688C14.1953 17.671 13.954 17.4297 13.6562 17.4297H6.46875Z"
              fill="#2E6DFF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.0156 0H5.75C4.16218 0 2.875 1.28718 2.875 2.875V20.125C2.875 21.7128 4.16218 23 5.75 23H17.25C18.8378 23 20.125 21.7128 20.125 20.125V6.10938L14.0156 0ZM5.75 21.5625H17.25C18.0439 21.5625 18.6875 20.9189 18.6875 20.125V7.1875H15.0938C13.9029 7.1875 12.9375 6.22211 12.9375 5.03125V1.4375H5.75C4.95609 1.4375 4.3125 2.08109 4.3125 2.875V20.125C4.3125 20.9189 4.95609 21.5625 5.75 21.5625ZM14.375 2.39231L17.7327 5.75H15.0938C14.6968 5.75 14.375 5.4282 14.375 5.03125V2.39231Z"
              fill="#2E6DFF"
            />
          </svg>

          <h2 className="whitespace-nowrap text-[14px] font-semibold leading-5 text-[#111111]">
            Recent Reports
          </h2>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="shrink-0 whitespace-nowrap rounded-sm text-[13px] font-medium text-[#202A87] transition-colors hover:text-[#2E6DFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DFF] focus-visible:ring-offset-2"
        >
          View All
        </button>
      </header>

      {/* Report Content */}
      <article className="mt-[20px] flex items-start gap-[21px]">
        <div className="h-[138px] w-[106px] shrink-0 overflow-hidden rounded-[7px] bg-[#F3F6FC] shadow-[0_4px_12px_rgba(15,23,42,0.10)]">
          <img
            src={ImageReport}
            alt={`${studentName}'s progress report preview`}
            className="block h-[138px] w-[106px] rounded-[7px] object-fill"
          />
        </div>

        <div className="flex h-[138px] min-w-0 flex-1 flex-col">
          <h3 className="whitespace-nowrap text-[14px] font-semibold leading-[19px] text-[#111111]">
            {title}
          </h3>

          <p className="mt-[4px] line-clamp-2 text-[12px] leading-[17px] text-[#8490A3]">
            {description}
          </p>

          <div className="mt-[7px] flex shrink-0 items-center gap-[7px] text-[12px] leading-[17px] text-[#8490A3]">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>

            {dateValue && (
              <time dateTime={new Date(dateValue).toISOString()} className="whitespace-nowrap">
                {formatDate(dateValue)}
              </time>
            )}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!latest}
            className="mt-auto flex disabled:cursor-not-allowed disabled:opacity-50 h-[42px] w-full shrink-0 items-center justify-center gap-[6px] whitespace-nowrap rounded-[7px] border border-[#2E6DFF] px-1 text-[12px] font-medium text-[#2E6DFF] transition-colors hover:bg-[#2E6DFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E6DFF] focus-visible:ring-offset-2"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5M12 15V3" />
            </svg>

            <span>Download Report</span>
          </button>
        </div>
      </article>
    </section>
  );
}
