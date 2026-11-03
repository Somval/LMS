
import React from "react";
import StudentDetailsStatistics from "./StudentDetailsReportstatistics";
import Attendance from "./ProgressReport";

export default function StudentDetailsReport() {
  return (
    <main className="min-h-screen w-full bg-[#F4F7FD]">
      <div className="flex w-full flex-col gap-3.5">
        <StudentDetailsStatistics />
        <Attendance />
      </div>
    </main>
  );
}
