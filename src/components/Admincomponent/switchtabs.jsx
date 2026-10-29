import React, { useState } from "react";

// Import tab components
// import AcademicPerformance from "./AcademicPerformance";
import CoursesAndTutors from "./CoursesAndTutors";
import StudentClasses from "./StudentClasses";
import StudentAttendance from "./StudentAttendance";
import StudentAssignments from "./StudentAssignments";
import StudentAchievements from "./StudentAchievements";
import StudentRewards from "./StudentRewards";
import StudentLearningActivity from "./StudentLearningActivity";

const tabs = [
  "Academic Performance",
  "Courses & Tutors",
  "Classes",
  "Attendance",
  "Assignments & Quizzes",
  "Achievements",
  "Rewards & Badges",
  "Learning Activity",
];

const tabComponents = {
  // "Academic Performance": AcademicPerformance,
  "Courses & Tutors": CoursesAndTutors,
  Classes: StudentClasses,
  Attendance: StudentAttendance,
  "Assignments & Quizzes": StudentAssignments,
  Achievements: StudentAchievements,
  "Rewards & Badges": StudentRewards,
  "Learning Activity": StudentLearningActivity,
};

export default function StudentDetailsTabs({
  activeTab: controlledActiveTab,
  onTabChange,
}) {
  const [internalActiveTab, setInternalActiveTab] =
    useState("Courses & Tutors");

  const activeTab = controlledActiveTab ?? internalActiveTab;
  const ActiveComponent = tabComponents[activeTab];

  const handleTabChange = (tab) => {
    setInternalActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <section className="w-full min-w-0 bg-[#F5F7FD] font-[Inter,sans-serif]">
      {/* Navigation Tabs */}
      <div className="w-full overflow-hidden border-b border-[#DDE2EB]">
        <nav
          aria-label="Student details sections"
          className="flex w-full items-stretch gap-0 overflow-x-auto px-3 sm:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                aria-pressed={isActive}
                className={`relative flex min-h-[36px] shrink-0 items-center justify-center whitespace-nowrap border-b-2 px-3 text-[9px] font-medium transition-colors duration-150 sm:px-3.5 sm:text-[10px] ${
                  isActive
                    ? "border-[#159A42] text-[#159A42]"
                    : "border-transparent text-[#667085] hover:text-[#159A42]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#159A42]`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Content */}
      <div className="w-full mt-5 min-w-0">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : activeTab === "Academic Performance" ? null : null}
      </div>
    </section>
  );
}