import React from "react";
import Adminstatics from "./Adminstatics";
import StudentOverview from "./StudentOverview";
import UpcomingClasses from "./UpcomingClasses";
import RecentActivity from "./RecentActivity";
import NeedsAttention from "./NeedsAttention";

export default function Dashboard() {
  const today = new Date();

  // Full weekday name on mobile
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(today);

  return (
   <>
   <section className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 md:gap-6">
      {/* Welcome Heading */}
      <div className="w-full min-w-0">
        <h1 className="font-[Inter] text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          Welcome back, Admin <span aria-hidden="true">👋</span>
        </h1>

        <p className="mt-1 font-[Poppins] text-sm text-[#8181A5] sm:text-base">
          Here’s an overview of what’s happening across your learning platform.
        </p>
      </div>

      {/* Current Date Badge - Full width on mobile */}
      <div className="flex w-full shrink-0 items-center justify-center gap-2  px-3 py-2 text-gray-700 sm:w-fit sm:justify-start sm:px-3.5 sm:py-2.5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 shrink-0 text-[#45505A] sm:h-5 sm:w-5"
          aria-hidden="true"
        >
          <path
            d="M17.5 0.875C17.5 0.391751 17.8918 0 18.375 0C18.8582 0 19.25 0.391751 19.25 0.875V4.375C19.25 4.85825 18.8582 5.25 18.375 5.25C17.8918 5.25 17.5 4.85825 17.5 4.375V0.875Z"
            fill="currentColor"
          />
          <path
            d="M8.75 0.875C8.75 0.391751 9.14175 0 9.625 0C10.1082 0 10.5 0.391751 10.5 0.875V4.375C10.5 4.85825 10.1082 5.25 9.625 5.25C9.14175 5.25 8.75 4.85825 8.75 4.375V0.875Z"
            fill="currentColor"
          />
          <path
            d="M26.25 5.6875C26.25 4.47938 25.2706 3.5 24.0625 3.5H21.875C21.3918 3.5 21 3.10825 21 2.625C21 2.14175 21.3918 1.75 21.875 1.75H24.0625C26.2371 1.75 28 3.51288 28 5.6875V22.3125C28 24.4871 26.2371 26.25 24.0625 26.25H3.9375C1.76288 26.25 0 24.4871 0 22.3125V5.6875C0 3.51288 1.76288 1.75 3.9375 1.75H6.125C6.60825 1.75 7 2.14175 7 2.625C7 3.10825 6.60825 3.5 6.125 3.5H3.9375C2.72938 3.5 1.75 4.47938 1.75 5.6875V22.3125C1.75 23.5206 2.72938 24.5 3.9375 24.5H24.0625C25.2706 24.5 26.25 23.5206 26.25 22.3125V5.6875Z"
            fill="currentColor"
          />
          <path
            d="M15.75 3.5H12.25V1.75H15.75V3.5Z"
            fill="currentColor"
          />
          <path
            d="M23.625 8.96875C23.9874 8.96875 24.2812 9.26256 24.2812 9.625C24.2812 9.98744 23.9874 10.2812 23.625 10.2812H4.375C4.01256 10.2812 3.71875 9.98744 3.71875 9.625C3.71875 9.26256 4.01256 8.96875 4.375 8.96875H23.625Z"
            fill="currentColor"
          />
        </svg>

        <p className="font-[Inter] text-xs font-medium text-[#45505A] sm:text-sm">
          {formattedDate}
        </p>
      </div>
   
    </section>
  
  
   <Adminstatics/>

<div className="block mt-3 lg:flex gap-5 w-full">
    <StudentOverview/>
  
    <UpcomingClasses/>

  </div>
   <div className="block mt-3 lg:flex gap-5 w-full">
    <RecentActivity/>
    <NeedsAttention/>
    </div>
   </>
);
}