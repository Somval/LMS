import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/api";
import AssignmentStats from "./AssignmentsStats";
import AssignmentsTableComponent from "./AssignmentTable";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "No due date";

export default function AssignmentHome() {
  const [data, setData] = useState({ summary: null, assignments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get("/admin/assignments")
      .then((res) => !cancelled && setData(res))
      .catch((err) => !cancelled && setError(err.message || "Could not load assignments."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(
    () =>
      data.assignments.map((a) => ({
        id: a.id,
        title: a.title,
        type: a.type,
        subject: a.subject,
        tutorName: a.tutorName,
        tutorId: `TID${String(a.tutorId).padStart(6, "0")}`,
        due: fmtDate(a.dueAt),
        state: a.published ? "Published" : "Draft",
        submissions: a.expected == null ? `${a.submitted}` : `${a.submitted}/${a.expected}`,
      })),
    [data.assignments]
  );

  return (
    <div>
      <AssignmentStats counts={data.summary} />
      <AssignmentsTableComponent data={rows} loading={loading} error={error} />
    </div>
  );
}
