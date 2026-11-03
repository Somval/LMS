import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../Avatar";

const pageInfo = {
  "/student/dashboard": {
    title: (
      <>
        Good morning, Olivia{" "}
        <span className="inline-block animate-wave">👋</span>
      </>
    ),
    description: "Stay focused and keep learning. You've got this!",
  },

  "/student/learning": {
    title: "My Learning",
    description:
      "Access your enrolled subjects, continue your lessons, and track your learning progress.",
  },

  "/student/live-classes": {
    title: "Live Classes",
    description:
      "Join your upcoming live classes and learn with your instructors.",
  },

  "/student/assignments": {
    title: "Assignments & Quizzes",
    description:
      "Keep track of your coursework, upcoming deadlines, and quizzes.",
  },

  "/student/progress": {
    title: "Progress",
    description:
      "Track your learning progress, performance, and growth across your subjects.",
  },

  "/student/achievements": {
    title: "Achievements",
    description:
      "See the milestones you've reached throughout your learning journey.",
  },

  "/student/rewards": {
    title: "Rewards & Badges",
    description:
      "Earn recognition for your progress, consistency, and achievements.",
  },

  "/student/attendance": {
    title: "Attendance",
    description:
      "Keep track of your class attendance and participation.",
  },

  "/student/recorded-lessons": {
    title: "Recorded Lessons",
    description:
      "Revisit your classes anytime and learn at your own pace.",
  },

  "/student/profile": {
    title: "Profile & Settings",
    description:
      "Manage your profile and customize your learning experience.",
  },
};

const defaultPage = {
  title: "My Learning",
  description:
    "Continue your learning journey and explore your courses.",
};

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  const firstName = user?.fullName?.split(" ")[0] ?? "";
  const initials =
    (user?.fullName ?? "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "S";

  // Refresh the unread count whenever the student moves between pages.
  useEffect(() => {
    api
      .get("/notifications", { unread: "true" })
      .then((res) => setUnread(res.unread))
      .catch(() => {});
  }, [location.pathname]);

  const basePage = pageInfo[location.pathname] || defaultPage;
  const currentPage =
    location.pathname === "/student/dashboard"
      ? {
          ...basePage,
          title: (
            <>
              {greeting()}, {firstName}{" "}
              <span className="inline-block animate-wave">👋</span>
            </>
          ),
        }
      : basePage;

  const handleLogout = () => {
    logout();
    navigate("/student-auth/login", { replace: true });
  };

  return (
    <header
      className="
        fixed
        top-0
        right-0
        z-50

        flex
        min-h-[68px]
        w-full
        items-center

        border-b
        border-slate-100
        bg-white

        px-4
        pl-[68px]

        shadow-[0_1px_8px_rgba(15,23,42,0.025)]

        sm:min-h-[72px]
        sm:px-6
        sm:pl-[76px]

        md:left-[250px]
        md:w-[calc(100%-250px)]
        md:px-7
        md:pl-7

        lg:min-h-[76px]
      "
    >
      {/* PAGE INFORMATION */}
      <div className="min-w-0 flex-1">
        <h1
          className="
            flex
            min-w-0
            items-center
            gap-2
            truncate

            text-lg
            font-bold
            leading-tight
            tracking-tight
            text-slate-900

            sm:text-xl
            lg:text-[21px]
          "
        >
          <span className="truncate">
            {currentPage.title}
          </span>
        </h1>

        <p
          className="
            mt-1
            hidden
            max-w-2xl
            truncate

            text-xs
            leading-normal
            text-slate-500

            sm:block
            sm:text-sm
          "
        >
          {currentPage.description}
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div
        className="
          ml-3
          flex
          shrink-0
          items-center
          gap-2

          sm:ml-5
          sm:gap-3
        "
      >
        {/* NOTIFICATION */}
        <button
          type="button"
          onClick={() => navigate("/student/notifications")}
          aria-label="View notifications"
          className="
            relative
            z-10

            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-full
            bg-white

            text-slate-500

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-slate-800

            active:scale-95

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-indigo-500
            focus-visible:ring-offset-2
          "
        >
          <Bell
            className="h-5 w-5"
            strokeWidth={1.8}
          />

          {unread > 0 && (
            <span
              title={`${unread} unread`}
              className="
              absolute
              right-[6px]
              top-[6px]

              h-2
              w-2

              rounded-full
              bg-red-500

              ring-2
              ring-white
            "
            />
          )}
        </button>

        {/* DIVIDER */}
        <div
          className="
            hidden
            h-8
            w-px
            bg-slate-200

            sm:block
          "
        />

        {/* PROFILE */}
        <Link to="/student/profile">
        <button
          type="button"
          aria-label="Open profile"
          className="
            relative
            z-10

            flex
            h-10
            w-10
            shrink-0

            overflow-hidden
            rounded-full

            bg-slate-100

            transition-all
            duration-200

            hover:opacity-80
            active:scale-95

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-indigo-500
            focus-visible:ring-offset-2
          "
        >
          <Avatar name={user?.fullName} avatarUrl={user?.avatarUrl} className="h-full w-full" textClassName="text-sm" />
        </button>
        </Link>

        {/* LOG OUT */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-800 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <LogOut className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}