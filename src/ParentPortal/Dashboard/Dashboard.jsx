import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Check, Loader2 } from "lucide-react";

import { api } from "../../lib/api";
import { initials } from "./dashboardData";

import DashboardAnalytics from "./AnalyticsHome";
import ActivityHome from "./ActivityHome";
import SessionActivity from "./SessionsActivity";
import CompleteProjectReport from "./CompleteProgressReport";

const ChildrenSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const requestedChildId = location.state?.childId; // set by "View Profile" on Linked Children

  const [children, setChildren] = useState(null); // null while loading
  const [childrenError, setChildrenError] = useState("");
  const [selectedChildId, setSelectedChildId] = useState(null);

  const [data, setData] = useState(null); // dashboard data for the selected child
  const [dataError, setDataError] = useState("");
  const [reload, setReload] = useState(0);

  // The parent's linked children.
  const loadChildren = useCallback(() => {
    setChildren(null);
    setChildrenError("");
    api
      .get("/parent/children")
      .then((list) => {
        setChildren(list);
        setSelectedChildId(
          (current) =>
            current ??
            (list.some((child) => child.id === requestedChildId)
              ? requestedChildId
              : list[0]?.id) ??
            null
        );
      })
      .catch((err) => setChildrenError(err.message || "Could not load your children."));
  }, [requestedChildId]);

  useEffect(loadChildren, [loadChildren]);

  // Everything on the page for the selected child comes from one request.
  useEffect(() => {
    if (!selectedChildId) return;

    let cancelled = false;
    setData(null);
    setDataError("");

    api
      .get(`/dashboard/parent/${selectedChildId}`)
      .then((result) => !cancelled && setData(result))
      .catch(
        (err) =>
          !cancelled &&
          setDataError(err.message || "Could not load the dashboard.")
      );

    return () => {
      cancelled = true;
    };
  }, [selectedChildId, reload]);

  if (childrenError) {
    return (
      <main className="w-full bg-slate-50/50 p-6">
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{childrenError}</p>
          <button
            type="button"
            onClick={loadChildren}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (children === null) {
    return (
      <main className="flex w-full items-center justify-center bg-slate-50/50 p-16">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
      </main>
    );
  }

  if (children.length === 0) {
    return (
      <main className="w-full bg-slate-50/50 p-3 sm:p-4 lg:p-6">
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-base font-semibold text-slate-900">
            No child linked yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Link your child's learner account to see their progress, homework,
            attendance and upcoming classes here.
          </p>
          <button
            type="button"
            onClick={() => navigate("/parent/link-children")}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Link a Child
          </button>
        </section>
      </main>
    );
  }

  const selectedChild = children.find((child) => child.id === selectedChildId);

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
            const subjectCount = child.subjects.length;

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
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 ring-1 ring-slate-200 sm:h-12 sm:w-12"
                >
                  {initials(child.fullName)}
                </span>

                <span className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <span
                    className={`truncate font-[Inter] text-[13px] font-semibold leading-5 sm:text-sm ${
                      isSelected ? "text-blue-700" : "text-slate-900"
                    }`}
                  >
                    {child.fullName}
                  </span>

                  <span className="mt-1 truncate text-[11px] leading-4 text-slate-500 sm:text-xs">
                    {subjectCount} Active Subject{subjectCount === 1 ? "" : "s"}
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
            onClick={() => navigate("/parent/link-children")}
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
                Link a learner account
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* DASHBOARD FOR THE SELECTED CHILD */}
      {selectedChild && dataError && (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{dataError}</p>
          <button
            type="button"
            onClick={() => setReload((n) => n + 1)}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      )}

      {selectedChild && !dataError && !data && (
        <div className="flex items-center justify-center p-16">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
        </div>
      )}

      {selectedChild && data && (
        <div
          key={selectedChild.id}
          className="mt-4 flex w-full min-w-0 max-w-full flex-col gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6"
        >
          <section className="mb-5 w-full min-w-0 max-w-full">
            <DashboardAnalytics data={data} />
          </section>

          <section className="w-full min-w-0 max-w-full">
            <ActivityHome data={data} />
          </section>

          <section className="w-full min-w-0 max-w-full">
            <SessionActivity data={data} />
          </section>

          <section className="w-full min-w-0 max-w-full">
            <CompleteProjectReport
              studentName={data.student.fullName.split(" ")[0]}
            />
          </section>
        </div>
      )}
    </main>
  );
};

export default ChildrenSelector;
