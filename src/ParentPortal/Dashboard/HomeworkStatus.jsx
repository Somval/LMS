
import React, { useState } from "react";
import { formatDue } from "./dashboardData";
import { FileText, X } from "lucide-react";

export default function HomeworkStatus({ data }) {
  const [showAll, setShowAll] = useState(false);

  // Open work first (overdue, then soonest due), then what has been handed in.
  const homeworkData = (data?.homework ?? []).map((item) => ({
    id: item.id,
    subject: item.subject ? `${item.subject}: ${item.title}` : item.title,
    status:
      item.status === "SUBMITTED" || item.status === "GRADED"
        ? "Submitted"
        : "Pending",
    due: formatDue(item.dueAt, item.status),
  }));

  const visibleHomework = homeworkData.slice(0, 4);

  const pendingCount = homeworkData.filter(
    (item) => item.status === "Pending"
  ).length;

  const submittedCount = homeworkData.filter(
    (item) => item.status === "Submitted"
  ).length;

  return (
    <>
      {/* Homework Status Card */}
      <div className="h-[252px] w-full mb-5 lg:mb-1 max-w-[364px] overflow-hidden rounded-[10px] border border-[#E9EDF5] bg-white shadow-[0_2px_5px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div className="flex h-[52px] items-center justify-between px-[17px]">
          <div className="flex items-center gap-[22px]">
            <FileText
              size={24}
              strokeWidth={1.5}
              className="shrink-0 text-[#2E6DFF]"
            />

            <h2 className="whitespace-nowrap text-[14px] font-semibold leading-5 text-[#111111]">
              Homework Status
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-[13px] font-medium text-[#20266F] transition-colors hover:text-[#11154F] hover:underline"
          >
            View All
          </button>
        </div>

        {visibleHomework.length === 0 && (
          <p className="px-[21px] pt-4 text-[13px] text-slate-400">
            No homework has been set yet.
          </p>
        )}

        {/* First Four Homework Items */}
        <div className="px-[21px]">
          {visibleHomework.map((homework, index) => {
            const isSubmitted = homework.status === "Submitted";

            return (
              <div
                key={homework.id}
                className={`flex h-[49px] items-center justify-between gap-3 ${
                  index !== visibleHomework.length - 1
                    ? "border-b border-[#DCE1E9]"
                    : ""
                }`}
              >
                {/* Subject and Due Date */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium leading-[18px] text-[#111111]">
                    {homework.subject}
                  </p>

                  <p
                    className={`mt-[1px] truncate text-[13px] font-normal leading-[17px] ${
                      isSubmitted
                        ? "text-[#00C853]"
                        : "text-[#FF6D24]"
                    }`}
                  >
                    {homework.due}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`flex h-[34px] w-[126px] shrink-0 items-center justify-center rounded-[8px] text-[14px] font-medium ${
                    isSubmitted
                      ? "bg-[#BFF4D2] text-[#00C853]"
                      : "bg-[#FFE1D0] text-[#FF6D24]"
                  }`}
                >
                  {homework.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Modal */}
      {showAll && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAll(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="homework-modal-title"
            className="w-full max-w-[460px] overflow-hidden rounded-[10px] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.20)]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E9EDF5] px-5 py-4">
              <div>
                <h3
                  id="homework-modal-title"
                  className="text-[15px] font-semibold text-[#111111]"
                >
                  Homework Status
                </h3>

                <p className="mt-1 text-[11px] text-[#7B8190]">
                  Overview of all homework assignments
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAll(false)}
                aria-label="Close homework list"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#7B8190] transition-colors hover:bg-[#F2F4F8] hover:text-[#111111]"
              >
                <X size={17} />
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3 px-5 py-4">
              <div className="rounded-lg bg-[#FFF0E7] px-4 py-3">
                <p className="text-[11px] font-medium text-[#FF6D24]">
                  Pending
                </p>

                <p className="mt-1 text-[20px] font-semibold text-[#111827]">
                  {pendingCount}
                </p>
              </div>

              <div className="rounded-lg bg-[#E8FFF0] px-4 py-3">
                <p className="text-[11px] font-medium text-[#00B85A]">
                  Submitted
                </p>

                <p className="mt-1 text-[20px] font-semibold text-[#111827]">
                  {submittedCount}
                </p>
              </div>
            </div>

            {/* Complete Homework List */}
            <div className="max-h-[360px] overflow-y-auto px-5 pb-5">
              <div className="overflow-hidden rounded-lg border border-[#E9EDF5]">
                {homeworkData.map((homework, index) => {
                  const isSubmitted =
                    homework.status === "Submitted";

                  return (
                    <div
                      key={homework.id}
                      className={`flex min-h-[58px] items-center justify-between gap-3 px-3 ${
                        index !== homeworkData.length - 1
                          ? "border-b border-[#E9EDF5]"
                          : ""
                      }`}
                    >
                      <div className="min-w-0 flex-1 py-2">
                        <p className="truncate text-[12px] font-medium text-[#111111]">
                          {homework.subject}
                        </p>

                        <p
                          className={`mt-1 text-[11px] ${
                            isSubmitted
                              ? "text-[#00B85A]"
                              : "text-[#FF6D24]"
                          }`}
                        >
                          {homework.due}
                        </p>
                      </div>

                      <span
                        className={`flex min-w-[94px] shrink-0 items-center justify-center rounded-[6px] px-3 py-2 text-[11px] font-medium ${
                          isSubmitted
                            ? "bg-[#BFF4D2] text-[#00B85A]"
                            : "bg-[#FFE1D0] text-[#FF6D24]"
                        }`}
                      >
                        {homework.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-[#E9EDF5] px-5 py-3">
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="rounded-md bg-[#20266F] px-4 py-2 text-[11px] font-medium text-white transition-colors hover:bg-[#11154F]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
