import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  Video,
  ClipboardList,
  BarChart2,
  CheckCircle,
  Award,
  Tv,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
const AttendanceIcon = ({ className = "" }) => (
  <svg
    width="28"
    height="30"
    viewBox="0 0 28 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19.7241 7.5C19.7241 11.6421 16.3663 15 12.2241 15C8.08199 15 4.72412 11.6421 4.72412 7.5C4.72412 3.35786 8.08199 0 12.2241 0C16.3663 0 19.7241 3.35786 19.7241 7.5Z"
      fill="currentColor"
    />
    <path
      d="M12.2241 16.875V30C7.1811 30 2.71935 27.5113 0 23.695L0.399352 20.8996C0.729251 18.5903 2.707 16.875 5.03974 16.875H12.2241Z"
      fill="currentColor"
    />
    <path
      d="M26.9495 22.2254C27.3157 21.8593 27.3157 21.2657 26.9495 20.8996C26.5834 20.5335 25.9898 20.5335 25.6237 20.8996L18.7866 27.7367L15.6995 24.6496C15.3334 24.2835 14.7398 24.2835 14.3737 24.6496C14.0076 25.0157 14.0076 25.6093 14.3737 25.9754L18.1237 29.7254C18.4898 30.0915 19.0834 30.0915 19.4495 29.7254L26.9495 22.2254Z"
      fill="currentColor"
    />
  </svg>
);

const navigationItems = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: Home,
  },
  {
    name: "Learning Journey",
    path: "/student/learning",
    icon: BookOpen,
  },
  {
    name: "Live Classes",
    path: "/student/live-classes",
    icon: Video,
  },
  {
    name: "Assignments & Quizzes",
    path: "/student/assignments",
    icon: ClipboardList,
  },
  {
    name: "Progress",
    path: "/student/progress",
    icon: BarChart2,
  },
  {
    name: "Achievements",
    path: "/student/achievements",
    icon: CheckCircle,
  },
  {
    name: "Rewards & Badges",
    path: "/student/rewards",
    icon: Award,
  },
  {
  name: "Attendance",
  path: "/student/attendance",
  icon: AttendanceIcon,
},
  {
    name: "Recorded Lessons",
    path: "/student/recorded-lessons",
    icon: Tv,
  },
  {
    name: "Profile & Settings",
    path: "/student/profile",
    icon: Settings,
  },
];

export default function Sidebar() {
  
  const [isOpen, setIsOpen] = React.useState(false);

  /* =========================================================
      ESCAPE KEY
  ========================================================= */
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
      LOCK BODY SCROLL WHEN MOBILE SIDEBAR IS OPEN
  ========================================================= */
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open student navigation"
        aria-expanded={isOpen}
        className={`
          fixed
          left-4
          top-4
          z-[80]
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-[0_3px_12px_rgba(15,23,42,0.08)]
          transition-all
          duration-200
          hover:bg-slate-50
          hover:shadow-md
          active:scale-95
          md:hidden
          ${isOpen ? "pointer-events-none opacity-0" : "opacity-100"}
        `}
      >
        <Menu
          className="h-6 w-6"
          strokeWidth={2}
        />
      </button>

      {/* =====================================================
          MOBILE BACKDROP
      ====================================================== */}
      <div
        onClick={closeMobileMenu}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[60]
          bg-slate-950/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          md:hidden
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-[70]
          flex
          h-screen
          max-h-screen
          w-[300px]
          md:w-[250px]
          shrink-0
          flex-col
          overflow-hidden
          border-r
          border-slate-100
          bg-white
          px-5
          md:px-4
          py-6
          md:py-5
          font-sans
          select-none
          shadow-[4px_0_20px_rgba(15,23,42,0.035)]
          transition-transform
          duration-300
          ease-in-out
          md:translate-x-0
          md:transition-none
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =====================================================
            MOBILE CLOSE BUTTON
        ====================================================== */}
        <button
          type="button"
          onClick={closeMobileMenu}
          aria-label="Close student navigation"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition-all
            duration-200
            hover:bg-slate-100
            hover:text-slate-700
            active:scale-95
            md:hidden
          "
        >
          <X
            className="h-5 w-5"
            strokeWidth={2}
          />
        </button>

        {/* =====================================================
            SIDEBAR INNER
        ====================================================== */}
        <div className="flex h-full min-h-0 flex-col">

          {/* ===================================================
              BRAND
          ==================================================== */}
          <div className="shrink-0 px-2 pb-6 md:pb-6 pt-1 text-center md:text-left">
            <h1 className="text-xl md:text-[15px] font-bold tracking-tight text-[#28356f]">
              LMS{" "}
              <span className="font-semibold">
                SYSTEM
              </span>
            </h1>

            <p className="mt-1 md:mt-0.5 text-xs md:text-[8px] font-medium uppercase tracking-[0.08em] text-slate-400">
              Student Portal
            </p>
          </div>

          {/* ===================================================
              NAVIGATION
          ==================================================== */}
          <nav
            aria-label="Student navigation"
            className="
              min-h-0
              flex-1
              space-y-2
              md:space-y-1
              overflow-x-hidden
              overflow-y-auto
              pr-1
            "
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `
                    group
                    relative
                    flex
                    min-h-[48px]
                    md:min-h-[40px]
                    w-full
                    items-center
                    rounded-[11px]
                    md:rounded-[9px]
                    px-3.5
                    md:px-2.5
                    py-3
                    md:py-2
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-indigo-50/80 text-indigo-600"
                        : "text-slate-500 md:text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Indicator */}
                      {isActive && (
                        <span
                          className="
                            absolute
                            -right-[21px]
                            md:-right-[17px]
                            top-1/2
                            h-6
                            w-[3px]
                            -translate-y-1/2
                            rounded-l-full
                            bg-indigo-600
                          "
                        />
                      )}

                      {/* Icon */}
                      <span
                        className="
                          flex
                          h-6
                          w-6
                          md:h-5
                          md:w-5
                          shrink-0
                          items-center
                          justify-center
                        "
                      >
                        <Icon
                          className={`
                            h-5
                            w-5
                            md:h-[16px]
                            md:w-[16px]
                            transition-colors
                            duration-200
                            ${
                              isActive
                                ? "text-indigo-600"
                                : "text-slate-500 md:text-slate-400 group-hover:text-slate-600"
                            }
                          `}
                          strokeWidth={
                            isActive ? 2.3 : 1.8
                          }
                        />
                      </span>

                      {/* Label */}
                      <span
                        className={`
                          ml-3.5
                          md:ml-2
                          min-w-0
                          flex-1
                          truncate
                          whitespace-nowrap
                          text-sm
                          md:text-[10px]
                          leading-none
                          ${
                            isActive
                              ? "font-semibold text-indigo-600"
                              : "font-medium text-slate-600 md:text-slate-400 group-hover:text-slate-700"
                          }
                        `}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* ===================================================
              SUPPORT CARD
          ==================================================== */}
          <div className="relative mt-6 md:mt-4 shrink-0 px-1 pt-8">
            <div
              className="
                relative
                overflow-visible
                rounded-[14px]
                bg-gradient-to-b
                from-indigo-600
                to-indigo-800
                px-4
                md:px-3
                pb-4
                md:pb-3
                pt-9
                md:pt-7
                text-center
                shadow-md
                shadow-indigo-100
              "
            >
              {/* Floating Help Icon */}
              <div
                className="
                  absolute
                  -top-6
                  left-1/2
                  flex
                  h-12
                  w-12
                  md:h-11
                  md:w-11
                  -translate-x-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-white
                  bg-indigo-700
                  shadow-md
                "
              >
                <HelpCircle
                  className="h-6 w-6 md:h-5 md:w-5 text-white"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="text-xs md:text-[10px] font-semibold text-white">
                Need Help?
              </h3>

              <p className="mx-auto mt-1.5 md:mt-1 max-w-[200px] md:max-w-[155px] text-[11px] md:text-[7.5px] leading-[1.5] text-indigo-100">
                Our support team is here to help you anytime.
              </p>

              <button
                type="button"
                className="
                  mt-3.5
                  md:mt-3
                  w-full
                  rounded-md
                  bg-white
                  py-2.5
                  md:py-1.5
                  text-xs
                  md:text-[8px]
                  font-semibold
                  text-indigo-800
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-indigo-50
                  active:scale-[0.98]
                "
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}