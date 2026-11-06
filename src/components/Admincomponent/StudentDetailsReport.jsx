import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import StudentDetailsStatistics from "./StudentDetailsReportstatistics";
import Attendance from "./ProgressReport";

export default function StudentDetailsReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get(`/admin/reports/students/${id}`)
      .then((res) => {
        if (cancelled) return;
        setReport(res);
        setError("");
      })
      .catch((err) =>
        !cancelled && setError(err.status === 404 ? "This student could not be found." : err.message || "Could not load the report.")
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p className="p-6 text-sm text-[#667085]">Loading progress report…</p>;
  if (error || !report) {
    return (
      <p role="alert" className="m-6 rounded-md bg-[#FDE7E7] px-4 py-3 text-sm text-[#D14343]">
        {error || "This student could not be found."}
      </p>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F4F7FD]">
      <div className="flex w-full flex-col gap-3.5">
        <StudentDetailsStatistics report={report} />
        <Attendance report={report} />
      </div>
    </main>
  );
}
