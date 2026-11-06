
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../Avatar";
import { api } from "../../lib/api";

export default function DashboardHeader({ onMenuClick = () => {} }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  // Number of unread notifications, checked every minute and whenever the inbox page changes it.
  const loadUnread = useCallback(() => {
    api
      .get("/notifications", { unread: "true" })
      .then((res) => setUnread(res.unread))
      .catch(() => {}); // the bell just keeps its last count
  }, []);

  useEffect(() => {
    loadUnread();
    const timer = setInterval(loadUnread, 60000);
    window.addEventListener("notifications-changed", loadUnread);
    return () => {
      clearInterval(timer);
      window.removeEventListener("notifications-changed", loadUnread);
    };
  }, [loadUnread]);
  const initials =
    (user?.fullName ?? "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "A";

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
          onClick={() => navigate("/admin/notifications")}
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#343434] transition-colors hover:bg-[#F0F1F4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
        >
          <Bell size={17} strokeWidth={1.5} />

          {unread > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#F04438] px-[3px] text-[9px] font-semibold leading-none text-white ring-1 ring-[#FCFCFD]"
            >
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        <Avatar name={user?.fullName} avatarUrl={user?.avatarUrl} className="h-[27px] w-[27px] rounded-full sm:h-[23px] sm:w-[23px]" textClassName="text-[10px]" />

        {/* Log out */}
        <button
          type="button"
          aria-label="Log out"
          title="Log out"
          onClick={() => { logout(); navigate("/admin/login", { replace: true }); }}
          className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full text-[#6B7280] hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] sm:h-[23px] sm:w-[23px]"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
