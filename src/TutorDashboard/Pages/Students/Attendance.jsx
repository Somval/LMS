
import React from "react";
import Attendances from "../../../components/Tutor/ActiveAttendance";
import AttendanceHistory from "../../../components/Tutor/AttendanceHistory";

export default function Attendance() {
  return (
    <section className="w-full bg-white min-w-0 space-y-6 font-[Inter,sans-serif]">
      {/* Attendance Overview */}
      <div className="w-full min-w-0">
        <Attendances />
      </div>

      {/* Attendance History */}
      <div className="w-full min-w-0">
        <AttendanceHistory />
      </div>
    </section>
  );
}
