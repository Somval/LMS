
import React, { useState } from "react";
import { Plus, Check } from "lucide-react";

import DashboardAnalytics from "./AnalyticsHome";
import ActivityHome from "./ActivityHome";
import SessionActivity from "./SessionsActivity";
import CompleteProjectReport from "./CompleteProgressReport";

const children = [
  {
    id: 1,
    name: "Olivia Johnson",
    subjects: "4 Active Subjects",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Liam Johnson",
    subjects: "4 Active Subjects",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  },
];

const ChildrenSelector = () => {
  const [selectedChildId, setSelectedChildId] = useState(1);

  const selectedChild = children.find(
    (child) => child.id === selectedChildId
  );

  const handleAddChild = () => {
    console.log("Add Another Child clicked");
  };

  return (
    <main className="box-border w-full min-w-0 max-w-full overflow-x-hidden bg-slate-50/50 p-3 sm:p-4 lg:p-6">
      {/* CHILD SELECTOR */}
      <section
        aria-labelledby="selected-child-heading"
        className="box-border w-full min-w-0 max-w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6"
      >
        <div className="mb-4 min-w-0 sm:mb-5">
          <h2
            id="selected-child-heading"
            className="font-[Poppins] text-sm font-semibold text-slate-900 sm:text-base"
          >
            Selected Child
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Choose a child to view their dashboard.
          </p>
        </div>

        {/* CHILD CARDS */}
        <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {children.map((child) => {
            const isSelected = selectedChildId === child.id;

            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                aria-pressed={isSelected}
                className={`box-border flex min-h-[76px] w-full min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-xl border p-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-h-[84px] sm:gap-3.5 sm:p-4 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 shadow-sm"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <img
                  src={child.avatar}
                  alt={`${child.name} avatar`}
                  loading="lazy"
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200 sm:h-12 sm:w-12"
                />

                <span className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <span
                    className={`truncate font-[Inter] text-[13px] font-semibold leading-5 sm:text-sm ${
                      isSelected ? "text-blue-700" : "text-slate-900"
                    }`}
                  >
                    {child.name}
                  </span>

                  <span className="mt-1 truncate text-[11px] leading-4 text-slate-500 sm:text-xs">
                    {child.subjects}
                  </span>
                </span>

                {isSelected && (
                  <span
                    aria-label="Selected"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white"
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                )}
              </button>
            );
          })}

          {/* ADD CHILD */}
          <button
            type="button"
            onClick={handleAddChild}
            className="group box-border flex min-h-[76px] w-full min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-white p-3 text-left transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-h-[84px] sm:gap-3.5 sm:p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-500 transition-colors group-hover:border-blue-400 group-hover:text-blue-600 sm:h-12 sm:w-12">
              <Plus className="h-5 w-5" strokeWidth={1.8} />
            </span>

            <span className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <span className="truncate text-[13px] font-semibold leading-5 text-slate-700 transition-colors group-hover:text-blue-700 sm:text-sm">
                Add Another Child
              </span>

              <span className="mt-1 truncate text-[11px] leading-4 text-slate-500 sm:text-xs">
                Add a new profile
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* EXISTING DASHBOARD COMPONENTS */}
      {selectedChild && (
        <div
          key={selectedChild.id}
          className="mt-4 flex w-full min-w-0 max-w-full flex-col gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6"
        >
          <section className="mb-5 w-full min-w-0 max-w-full">
            <DashboardAnalytics
              studentId={selectedChild.id}
              student={selectedChild}
            />
          </section>

          <section className="w-full min-w-0 max-w-full">
            <ActivityHome
              studentId={selectedChild.id}
              student={selectedChild}
            />
          </section>

          <section className="w-full min-w-0 max-w-full">
            <SessionActivity
              studentId={selectedChild.id}
              student={selectedChild}
            />
          </section>

          <section className="w-full min-w-0 max-w-full">
            <CompleteProjectReport
              studentId={selectedChild.id}
              student={selectedChild}
            />
          </section>
        </div>
      )}
    </main>
  );
};

export default ChildrenSelector;
