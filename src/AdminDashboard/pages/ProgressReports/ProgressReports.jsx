import React, { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import ProgressReportsStatistics from "../../../components/Admincomponent/ProgressReportsstatistic";
import StudentProgressTable from "../../../components/Admincomponent/StudentProgressTable";

export default function ProgressReports() {
  const [data, setData] = useState({ summary: null, students: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get("/admin/reports")
      .then((res) => !cancelled && setData(res))
      .catch((err) => !cancelled && setError(err.message || "Could not load progress reports."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <ProgressReportsStatistics summary={data.summary} />
      <StudentProgressTable students={data.students} loading={loading} error={error} />
    </div>
  );
}
