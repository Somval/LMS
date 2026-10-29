
import React, { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  FileText,
  ClipboardList,
  Award,
  CheckCircle,
} from "lucide-react";

import AcademicPerformance from "../../TutorDashboard/Pages/Students/AcademicPerformance";
import Attendance from "../../TutorDashboard/Pages/Students/Attendance";
import AssignmentQuize from "../../TutorDashboard/Pages/Students/AssignmentsandQuizzes";
import RewardsBadges from "../../TutorDashboard/Pages/Students/RewardsBadges";
import LessonHistory from "../../TutorDashboard/Pages/Students/LessonHistory";
import AchievementsHome from "../../TutorDashboard/Pages/SubjectsPage/Achievements";
export default function StudentProgressOverview() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [period, setPeriod] = useState("This Month");

  const tabs = [
    {
      id: 1,
      title: "Academic Performance",
      icon: ClipboardList,
      component: <AcademicPerformance />,
    },
    {
      id: 2,
      title: "Attendance",
      icon: CalendarDays,
      component: <Attendance />,
    },
    {
      id: 3,
      title: "Assignments & Quizzes",
      icon: FileText,
      component: <AssignmentQuize />,
    },
    {
      id: 4,
      title: "Achievements",
      icon: Award,
      component: <AchievementsHome />,
    },
    {
      id: 5,
      title: "Rewards & Badges",
      icon: Award,
      component: <RewardsBadges />,
    },
    {
      id: 6,
      title: "Lesson History",
      icon: CheckCircle,
      component: <LessonHistory />,
    },
  ];

  const activeTab = tabs.find((tab) => tab.id === selectedTab);

  const handleCreateReport = () => {
    console.log("Create progress report:", {
      period,
      section: activeTab?.title,
    });
  };

  return (
    <section className="w-full min-w-0 font-[Inter,sans-serif]">
      {/* Period selector and report button */}
      <div className="flex w-full flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-end">
        <div className="w-full space-y-1.5 sm:w-[180px]">
          <label
            htmlFor="progress-period"
            className="block text-xs font-medium text-[#344054]"
          >
            Period
          </label>

          <div className="relative">
            <CalendarDays
              size={16}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#344054]"
            />

            <select
              id="progress-period"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-[#D9DDE5] bg-transparent pl-9 pr-9 text-xs font-medium text-[#101828] outline-none transition focus:border-[#326BFF] focus:ring-2 focus:ring-[#326BFF]/15"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="This Year">This Year</option>
              <option value="All Time">All Time</option>
            </select>

            <ChevronDown
              size={15}
              strokeWidth={1.8}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#344054]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCreateReport}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#326BFF] px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#2459E8] focus:outline-none focus:ring-2 focus:ring-[#326BFF]/30 focus:ring-offset-2 sm:w-auto sm:min-w-[176px]"
        >
          <FileText size={19} strokeWidth={1.7} />
          <span className="whitespace-nowrap">
            Create Progress Report
          </span>
        </button>
      </div>

      {/* Progress tabs */}
      <div className="mt-5 w-full border-b border-[#E1E4EB]">
        <nav
          aria-label="Student progress sections"
          className="-mb-px flex w-full items-center gap-2 overflow-x-auto scroll-smooth sm:gap-5 lg:justify-between"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap border-b-2 px-2 py-3 text-[11px] font-medium transition-colors sm:text-xs ${
                  isActive
                    ? "border-[#7C0CE4] text-[#7C0CE4]"
                    : "border-transparent text-[#69737D] hover:text-[#344054]"
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={1.7}
                  className="shrink-0"
                />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active tab content */}
      <div className="mt-6 w-full min-w-0">
        {activeTab?.component}
      </div>
    </section>
  );
}
