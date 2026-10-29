
import React from "react";
import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function LMSHeader({ onMenuClick }) {
  return (
    <header className="w-full h-full min-w-0 bg-white border-b border-slate-100 select-none font-sans">
      <div className="w-full h-full min-w-0 px-2.5 sm:px-4 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-3">

        {/* LEFT SECTION */}
        <div className="flex items-center min-w-0 flex-1 gap-1.5 sm:gap-3">

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg sm:rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200"
          >
            <Menu
              className="w-5 h-5 sm:w-6 sm:h-6"
              strokeWidth={2}
            />
          </button>

          {/* GREETING */}
          <div className="min-w-0 flex-1">
            <h1 className="text-[12px] min-[360px]:text-[13px] sm:text-lg lg:text-xl font-bold font-[Inter] text-slate-900 tracking-tight flex items-center gap-1 sm:gap-2 leading-tight min-w-0">
              <span className="min-w-0">
                Welcome back, Olivia's Parent!
              </span>

              <span className="inline-block shrink-0 animate-wave text-[12px] sm:text-lg">
                👋
              </span>
            </h1>

            {/* DESCRIPTION: FULL TEXT VISIBLE ON MOBILE */}
            <p className="text-[10px] min-[360px]:text-[11px] sm:text-xs lg:text-sm font-normal text-slate-400 font-[Poppins] mt-1 leading-relaxed whitespace-normal break-words">
              Stay updated on your child's learning progress and achievements.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center shrink-0 gap-0.5 sm:gap-3 lg:gap-5">

          {/* NOTIFICATIONS */}
          <button
            type="button"
            aria-label="View notifications"
            className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors duration-200"
          >
            <Bell
              className="w-4 h-4 sm:w-5 sm:h-5"
              strokeWidth={2}
            />

            <span className="absolute top-[5px] right-[5px] sm:top-[8px] sm:right-[8px] w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

<Link to="/parent/settings">
          {/* PROFILE */}
          <button
            type="button"
            aria-label="Open profile"
            className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full overflow-hidden border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 hover:shadow-md"
          >
            
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Olivia's Parent Profile"
              className="w-full h-full object-cover block"
            />
          </button>
          </Link>
        </div>
      </div>

      {/* WAVE ANIMATION */}
      <style>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60%, 100% { transform: rotate(0deg); }
        }

        .animate-wave {
          transform-origin: 70% 70%;
          animation: wave 2s infinite;
        }

        @media (max-width: 640px) {
          .animate-wave {
            animation-duration: 2.5s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-wave {
            animation: none;
          }
        }
      `}</style>
    </header>
  );
}
