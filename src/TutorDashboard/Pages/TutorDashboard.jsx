import React from "react";
import TutordashboardStats from "./TutorDashboardstats";
import TodaysClasses from "./Todaysclasshome";
import QuickActions from "./QuickActions";
import StudentPerformance from "./StudentPerformance";
import RecentActivity from "../Pages/RecentActivity";
import NextUp from "./NextUp";

export default function TutorDashboard() {
  return (
    <main className="w-full min-w-0 space-y-6 overflow-x-hidden">
      {/* Dashboard Stats */}
      <section className="w-full min-w-0">
        <TutordashboardStats />
      </section>

      {/* First Row: 1 Column on Mobile/Tablet, 2 Columns on Desktop */}
      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Classes */}
        <div className="w-full min-w-0">
          <TodaysClasses />
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
          <StudentPerformance />
        </div>

        {/* Recent Activity */}
        <div className="w-full min-w-0">
          <RecentActivity />
        </div>

        {/* Next Up */}
        <div className="w-full min-w-0">
          <NextUp />
        </div>
      </section>
    </main>
  );
}