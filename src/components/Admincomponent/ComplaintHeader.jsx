
import { ArrowLeft, UserRound } from "lucide-react";

export default function ComplaintHeader() {
  return (
    <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-5 lg:px-7">

      {/* BACK NAVIGATION */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-[12px] font-medium text-[#242424] transition-colors hover:text-gray-500 sm:text-[13px]"
      >
        <ArrowLeft size={17} strokeWidth={1.7} />
        <span>Back to Complaints</span>
      </button>

      {/* COMPLAINT HEADING */}
      <div className="mt-3 min-w-0">
        <h1 className="text-[16px] font-semibold leading-6 text-[#171717] sm:text-[18px]">
          Subscription payment issue
        </h1>

        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] font-normal leading-[16px] text-[#7B8798] sm:text-[11px]">
          <span>Complaint ID: #1024</span>
          <span className="text-[#B0B7C1]">|</span>
          <span>Submitted on: Oct 16, 2026, 10:24 AM</span>
        </p>
      </div>

      {/* COMPLAINANT INFORMATION */}
      <div className="mt-[17px] flex min-h-[72px] w-full min-w-0 flex-col items-start justify-between gap-4 rounded-[6px] bg-[#E4F5F1] px-3 py-3 sm:px-[14px] md:flex-row md:items-center md:gap-3">

        {/* USER DETAILS */}
        <div className="flex min-w-0 w-full items-center gap-3 sm:gap-4 md:w-auto">

          {/* AVATAR */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6D6D6]">
            <UserRound
              size={24}
              strokeWidth={1.4}
              className="text-[#8A939D]"
            />
          </div>

          {/* NAME AND ROLE */}
          <div className="min-w-0">
            <h2 className="text-[13px] font-semibold leading-5 text-[#171717] sm:text-[14px]">
              Emma Okafor
            </h2>

            <p className="mt-0.5 flex flex-wrap items-center gap-x-1 text-[10px] font-normal leading-[15px] text-[#8A939D] sm:text-[11px]">
              <span>Parent</span>
              <span>|</span>
              <span>Parent of Chloe Okafor</span>
            </p>
          </div>
        </div>

        {/* STATUS BADGES */}
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">

          <span className="shrink-0 rounded-[4px] bg-[#C9F5E2] px-3 py-[5px] text-[10px] font-medium text-[#13B76A] sm:text-[11px]">
            New
          </span>

          <span className="shrink-0 rounded-[4px] bg-[#E9DDFC] px-3 py-[5px] text-[10px] font-medium text-[#8739E8] sm:text-[11px]">
            Billing
          </span>

          <span className="shrink-0 rounded-[4px] bg-[#F9DFE2] px-3 py-[5px] text-[10px] font-medium text-[#EF3340] sm:text-[11px]">
            High Priority
          </span>

        </div>
      </div>
    </div>
  );
}
