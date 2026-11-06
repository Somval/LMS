import React from "react";

export default function Tutorhome({ onAddTutor = () => {} }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 w-full px-4 sm:px-6 py-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-['Inter'] text-2xl sm:text-[32px] text-[#000000] font-semibold leading-tight">
          Tutors
        </h1>
        <p className="font-['Poppins'] text-sm sm:text-[19px] text-[#5A7184] mt-1">
          View and manage all tutors on the platform.
        </p>
      </div>

      {/* Action Button */}
      <div className="w-full sm:w-auto">
        <button type="button" onClick={onAddTutor} className="w-full sm:w-[221px] h-[48px] sm:h-[58px] bg-[#003300] hover:bg-[#002200] active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-2 text-white font-['Poppins'] font-medium text-sm sm:text-[16px] shadow-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M8.9375 0C9.38623 0 9.75 0.363769 9.75 0.8125V8.125H17.0625C17.5112 8.125 17.875 8.48877 17.875 8.9375C17.875 9.38623 17.5112 9.75 17.0625 9.75H9.75V17.0625C9.75 17.5112 9.38623 17.875 8.9375 17.875C8.48877 17.875 8.125 17.5112 8.125 17.0625V9.75H0.8125C0.363769 9.75 0 9.38623 0 8.9375C0 8.48877 0.363769 8.125 0.8125 8.125H8.125V0.8125C8.125 0.363769 8.48877 0 8.9375 0Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="white"
            />
          </svg>
          Add Tutor
        </button>
      </div>
    </div>
  );
}