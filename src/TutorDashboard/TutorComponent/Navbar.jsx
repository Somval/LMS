import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/Avatar";


const greeting = () => {
  const h = new Date().getHours();

  return h < 12
    ? "Good morning"
    : h < 17
    ? "Good afternoon"
    : "Good evening";
};


const pageInfo = {
  "/Tutor/dashboard": {
    title: "Dashboard",
    description:
      "Keep track of your teaching activities and student progress.",
  },

  "/Tutor/subjects": {
    title: "Subjects",
    description:
      "Manage your subjects, lessons, and teaching materials.",
  },

  "/Tutor/class": {
    title: "My Class",
    description:
      "View your classes, schedules, and upcoming teaching sessions.",
  },

  "/Tutor/students": {
    title: "Students",
    description:
      "Manage your students, monitor their progress, and support their learning.",
  },

  "/Tutor/lessons": {
    title: "Lesson Notes",
    description:
      "Create, organize, and manage your lesson notes and teaching resources.",
  },

  "/Tutor/Assignments_Quizzes": {
    title: "Assignments & Quizzes",
    description:
      "Create and manage assignments, quizzes, submissions, and student assessments.",
  },

  // The real routes for assignments and quizzes (the key above is kept as you had it).
  "/Tutor/assignment-quize": {
    title: "Assignments & Quizzes",
    description:
      "Create and manage assignments, quizzes, submissions, and student assessments.",
  },

  "/Tutor/create-assignment": {
    title: "Create Assignment",
    description: "Create an assignment for your students to complete.",
  },

  "/Tutor/create-quize": {
    title: "Create Quiz",
    description:
      "Create a multiple-choice quiz that is marked automatically.",
  },

  "/Tutor/attendance": {
    title: "Attendance",
    description:
      "Track student attendance and monitor participation across your classes.",
  },

  "/Tutor/rating": {
    title: "Ratings & Feedback",
    description:
      "View student feedback, ratings, and insights into your teaching.",
  },

  "/Tutor/messages": {
    title: "Messages",
    description:
      "Communicate with your students and stay connected with your learning community.",
  },

  "/Tutor/profile": {
    title: "Profile & Settings",
    description:
      "Manage your tutor profile, account settings, and preferences.",
  },
};

const defaultPage = {
  title: "Dashboard",
  description:
    "Stay organized, support your students, and keep your teaching on track.",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [unread, setUnread] = useState(0);

  const firstName = user?.fullName?.split(" ")[0] ?? "";

  useEffect(() => {
    api
      .get("/notifications", { unread: "true" })
      .then((res) => setUnread(res.unread))
      .catch(() => {});
  }, [location.pathname]);

  
  const pageKey = Object.keys(pageInfo).find(
    (k) => k.toLowerCase() === location.pathname.toLowerCase()
  );

  const currentPage = (pageKey && pageInfo[pageKey]) || defaultPage;

  // Display a personalized greeting on the tutor dashboard.
  const pageTitle =
    location.pathname.toLowerCase() === "/tutor/dashboard" ? (
      <>
        {greeting()}, {firstName}!{" "}
        <span className="inline-block animate-wave">👋</span>
      </>
    ) : (
      currentPage.title
    );

  const handleLogout = () => {
    logout();
    navigate("/tutor/login", { replace: true });
  };

  return (
    <header
      className="
        fixed
        top-0
        right-0
        z-50
        flex
        min-h-[64px]
        w-full
        items-center
        border-b
        border-slate-100
        bg-white
        px-3
        pl-[60px]
        shadow-[0_1px_8px_rgba(15,23,42,0.025)]
        xs:px-4
        xs:pl-[68px]
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
      <div className="min-w-0 flex-1 pr-2">
        <h1
          className="
            flex
            min-w-0
            items-center
            gap-1.5
            truncate
            text-base
            font-bold
            leading-tight
            tracking-tight
            text-slate-900
            xs:text-lg
            sm:text-xl
            lg:text-[21px]
          "
        >
          <span className="truncate">
            {pageTitle}
          </span>
        </h1>

        <p
          className="
            mt-0.5
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
          ml-auto
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
          onClick={() => navigate("/tutor/notifications")}
          aria-label="View notifications"
          className="
            relative
            z-10
            flex
            h-9
            w-9
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
            sm:h-10
            sm:w-10
          "
        >
          <Bell
            className="h-4 w-4 sm:h-5 sm:w-5"
            strokeWidth={1.8}
          />

          {unread > 0 && (
            <span
              title={`${unread} unread`}
              className="
                absolute
                right-[5px]
                top-[5px]
                h-2
                w-2
                rounded-full
                bg-red-500
                ring-2
                ring-white
                sm:right-[6px]
                sm:top-[6px]
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
        <button
          type="button"
          aria-label="Open profile"
          onClick={() => navigate("/tutor/profile")}
          className="
            relative
            z-10
            flex
            h-9
            w-9
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
            sm:h-10
            sm:w-10
          "
        >
          <Avatar
            name={user?.fullName}
            avatarUrl={user?.avatarUrl}
            className="h-full w-full"
            textClassName="text-sm"
          />
        </button>

        {/* LOG OUT */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
          className="
            relative
            z-10
            flex
            h-9
            w-9
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
            sm:h-10
            sm:w-10
          "
        >
          <LogOut
            className="h-4 w-4 sm:h-5 sm:w-5"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </header>
  );
}
