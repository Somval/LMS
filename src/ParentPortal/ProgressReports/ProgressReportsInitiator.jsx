import React from "react";

import SelectChild from "../HomeworkAssignments/SelectChild";
import ReportAnalytics from "../ProgressReports/reportAnalytics";
import ReportsTable from "./ReportTable";

export default function ProgressReport() {
  return (
    <main className="w-full">
      <div className="flex w-full flex-col gap-6">
        <SelectChild />
        <ReportAnalytics />
        <ReportsTable />
      </div>
    </main>
  );
}