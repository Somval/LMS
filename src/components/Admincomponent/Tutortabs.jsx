
import React, { useState } from "react";

import Overview from "../../AdminDashboard/pages/Tutor/TutorOverview";
import TutorInformation from "../../AdminDashboard/pages/Tutor/TutorInformation";
import Reviews from "../../AdminDashboard/TutorTabs/Reviews";
import Students from "../../AdminDashboard/TutorTabs/Students";
import Classes from "../../AdminDashboard/TutorTabs/Classes";
import Achievements from "../../AdminDashboard/TutorTabs/Achievements";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tutor-info", label: "Tutor Information" },
  { id: "students", label: "Students" },
  { id: "classes", label: "Classes" },
  { id: "achievements", label: "Achievements & Rewards" },
  { id: "reviews", label: "Reviews & Feedback" },
];

const tabPages = {
  overview: Overview,
  "tutor-info": TutorInformation,
  students: Students,
  classes: Classes,
  achievements: Achievements,
  reviews: Reviews,
};

function NotConnected() {
  return (
    <p className="rounded-lg bg-white px-4 py-10 text-center text-sm text-[#667085]">
      This section isn't connected to live data yet.
    </p>
  );
}

export default function NavigationTabs({ tutor, onChanged = () => {} }) {
  const [activeTab, setActiveTab] = useState("overview");

  const ActivePage = tabPages[activeTab] || Overview;

  return (
    <div className="w-full min-w-0 bg-[#f4f7fc]/60">
      {/* Tab Navigation */}
      <div className="w-full border-b border-gray-200/80 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Tutor profile navigation"
          className="flex w-full items-center gap-6 overflow-x-auto no-scrollbar sm:justify-between sm:gap-4"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex shrink-0 flex-1 items-center justify-center whitespace-nowrap pb-3.5 text-center text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? "font-semibold text-emerald-600"
                    : "font-medium text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-t-full bg-emerald-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Selected Page */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        className="w-full p-4 sm:p-6 lg:p-8"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <ActivePage tutor={tutor} onChanged={onChanged} />
        </div>
      </div>
    </div>
  );
}
