import React from "react";
import {
  MoreHorizontal,
  BookOpen,
  UserCheck,
  Calendar,
  ArrowRight,
  Plus,
} from "lucide-react";

import ImageChild from "../../assets/images/0f8e1d9734e359a5f167b12e36f573ba6133942a.jpg";
import ImageTwo from "../../assets/images/ff2c1ec6db577f2e345c44c9bf9e3999ff815caa.jpg";

import { Link } from "react-router-dom";

export default function ChildrenProfilesGrid({
  onViewProfile = () => {},
  onAddChild = () => {},
}) {
  const children = [
    {
      id: 1,
      name: "Olivia Johnson",
      avatar: ImageChild,
      progress: 85,
      status: "Active",
      activeSubjects: 4,
      tutor: "Sarah Johnson",
      nextSession: "Today, 4:00 PM",
    },
    {
      id: 2,
      name: "Liam Johnson",
      avatar: ImageTwo,
      progress: 85,
      status: "Active",
      activeSubjects: 4,
      tutor: "Sarah Johnson",
      nextSession: "Today, 4:00 PM",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Child Profile Cards */}
        {children.map((child) => {
          const progress = Math.min(
            100,
            Math.max(0, Number(child.progress) || 0)
          );

          return (
            <div
              key={child.id}
              style={{ width: "354px", height: "274px", borderRadius: "16px" }}
              className="relative flex flex-col justify-between border border-purple-100/80 bg-[#7C0CE417] p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-purple-900/40 dark:bg-purple-950/20 box-border mx-auto"
            >
              <div>
                {/* Top Row: Avatar, Name & Options */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-slate-800"
                    />

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 truncate">
                        {child.name}
                      </h3>

                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Learning Progress
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`More options for ${child.name}`}
                    className="rounded-lg p-1 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Progress Bar & Status */}
                <div className="mb-3.5 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-medium">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {child.status}
                    </span>

                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {progress}%
                    </span>
                  </div>

                  {/* SVG-style progress bar */}
                  <div
                    className="h-2 w-full overflow-hidden rounded-[4px] bg-purple-200/60 dark:bg-purple-900/30"
                    role="progressbar"
                    aria-label={`${child.name} learning progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                  >
                    <div
                      className="h-full rounded-[4px] bg-[#7C0CE4] transition-[width] duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-2 border-t border-purple-100/60 pt-3 dark:border-purple-900/30 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                    <BookOpen className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>{child.activeSubjects} Active Subjects</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                    <UserCheck className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>
                      Tutor:{" "}
                      <strong className="font-medium text-slate-800 dark:text-slate-200">
                        {child.tutor}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>
                      Next Session:{" "}
                      <strong className="font-medium text-slate-800 dark:text-slate-200">
                        {child.nextSession}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* View Profile Action Button */}
              <button
                type="button"
                onClick={() => onViewProfile(child.name)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/70 bg-transparent px-4 py-2 text-xs font-medium text-purple-700 transition-all duration-200 hover:bg-purple-100/60 dark:border-purple-800/60 dark:text-purple-300 dark:hover:bg-purple-900/30"
              >
                <span>View Profile</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}

        {/* Add New Child Card */}
        <Link
          to="/parent/link-children"
          onClick={onAddChild}
          style={{ width: "299px", height: "274px", borderRadius: "16px", backgroundColor: "#0ED7530F" }}
          className="group flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-emerald-200 p-6 text-center transition-all duration-300 hover:opacity-90 dark:border-emerald-900/40 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20 box-border mx-auto"
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300 bg-white/50 text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-emerald-700/50 dark:bg-slate-900/50 dark:text-emerald-400">
            <Plus className="h-6 w-6 stroke-[2]" />
          </div>

          <h4 className="mb-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Add New Child
          </h4>

          <p className="max-w-[200px] text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Link another child to monitor their learning journey.
          </p>
        </Link>
      </div>
    </div>
  );
}