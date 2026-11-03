import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import TutordashboardStats from "./TutorDashboardstats";
import TodaysClasses from "./Todaysclasshome";
import QuickActions from "./QuickActions";
import StudentPerformance from "./StudentPerformance";
import RecentActivity from "../Pages/RecentActivity";
import NextUp from "./NextUp";

export default function TutorDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(to.getDate() + 1);
    api
      .get("/dashboard/tutor", { from: from.toISOString(), to: to.toISOString() })
      .then(setData)
      .catch((err) => setError(err.message || "Could not load your dashboard."));
  }, []);

  return (
    <main className="w-full min-w-0 space-y-6 overflow-x-hidden">
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {data && data.status !== "APPROVED" && (
        <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {data.status === "REJECTED"
            ? "Your tutor application was not approved. Please contact support for details."
            : "Your application is being reviewed. You can look around, but you can't schedule classes or set work until an admin approves your account."}
        </p>
      )}
      {/* Dashboard Stats */}
      <section className="w-full min-w-0">
        <TutordashboardStats data={data} />
      </section>

      {/* First Row: 1 Column on Mobile/Tablet, 2 Columns on Desktop */}
      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Classes */}
        <div className="w-full min-w-0">
          <TodaysClasses classes={data?.classesToday} loading={!data && !error} />
        </div>

        {/* Quick Actions */}
        <div className="w-full min-w-0">
          <QuickActions />
        </div>
      </section>

      {/* Second Row: 1 Column on Mobile/Tablet, 3 Columns on Desktop */}
      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Student Performance */}
        <div className="w-full min-w-0">
          <StudentPerformance performance={data?.performance} />
        </div>

        {/* Recent Activity */}
        <div className="w-full min-w-0">
          <RecentActivity items={data?.recentActivity} />
        </div>

        {/* Next Up */}
        <div className="w-full min-w-0">
          <NextUp items={data?.nextUp} />
        </div>
      </section>
    </main>
  );
}