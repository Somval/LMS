import React from "react";
import AttendanceOverview from "./Attendancestatistics";
import AttendanceHistory from "./AttendanceHistory";

export default function Attendance() {
  return (
    <main className="w-full min-w-0">
      <div className="flex w-full min-w-0 flex-col gap-6">
        {/* Attendance Statistics */}
        <section className="w-full min-w-0">
          <AttendanceOverview />
        </section>

        {/* Attendance History */}
        <section className="w-full min-w-0">
          <AttendanceHistory />
        </section>
      </div>
    </main>
  );
}