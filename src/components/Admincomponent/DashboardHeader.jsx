
import React, { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";

export default function DashboardHeader({ onMenuClick = () => {} }) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-40 flex h-[52px] w-full min-w-0 shrink-0 items-center justify-between gap-2 border-b border-[#E8E8EB] bg-[#FCFCFD] px-3 sm:h-[47px] sm:gap-4 sm:px-5 lg:rounded-t-[12px]">
      {/* Left Section: Mobile Menu + Search */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="admin-sidebar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#536176] transition-colors hover:bg-[#F0F1F4] hover:text-[#159A42] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] lg:hidden"
        >
          <Menu size={21} strokeWidth={1.7} />
        </button>

        {/* Search */}
        <div className="flex h-[32px] min-w-0 w-full max-w-[307px] items-center gap-2 rounded-[6px] border border-[#E4E5E9] bg-[#FCFCFD] px-[10px] transition-colors focus-within:border-[#B9C3D5] sm:h-[27px]">
          <Search
            size={15}
            strokeWidth={1.5}
            aria-hidden="true"
            className="shrink-0 text-[#536176]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for students, tutors, courses..."
            aria-label="Search students, tutors, and courses"
            className="h-full min-w-0 flex-1 bg-transparent text-[11px] text-[#333B4D] outline-none placeholder:text-[#92949C] sm:text-[10px]"
          />
        </div>
      </div>

      {/* Right-side Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:ml-4 sm:gap-[15px]">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#343434] transition-colors hover:bg-[#F0F1F4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
        >
          <Bell size={17} strokeWidth={1.5} />

          <span
            aria-hidden="true"
            className="absolute right-[6px] top-[5px] h-[5px] w-[5px] rounded-full bg-[#F04438] ring-1 ring-[#FCFCFD]"
          />
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          aria-label="Open profile"
          className="h-[27px] w-[27px] shrink-0 overflow-hidden rounded-full border border-[#E4E4E7] bg-[#E8E1D8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] sm:h-[23px] sm:w-[23px]"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces"
            alt="User profile"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
