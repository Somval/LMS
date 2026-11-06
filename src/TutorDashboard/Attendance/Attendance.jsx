import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import AttendanceOverview from "./Attendancestatistics";
import AttendanceHistory from "./AttendanceHistory";
import { courseKey, periodRange } from "./attendanceData";

const EMPTY_STATS = { students: 0, present: 0, absent: 0, late: 0 };

export default function Attendance() {
  const [courses, setCourses] = useState(null); // null while loading
  const [course, setCourse] = useState("");
  const [period, setPeriod] = useState("this-month");

  const [data, setData] = useState({ stats: EMPTY_STATS, records: [], truncated: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The courses the tutor teaches (one per subject and year level).
  useEffect(() => {
    let cancelled = false;
    api
      .get("/tutors/subjects")
      .then((list) => {
        if (cancelled) return;
        setCourses(list);
        setCourse((current) => current || (list[0] ? courseKey(list[0].subjectId, list[0].yearLevel) : ""));
        if (!list.length) setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setCourses([]);
        setError(err.message || "Could not load your courses.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = useMemo(
    () => (courses ?? []).find((c) => courseKey(c.subjectId, c.yearLevel) === course),
    [courses, course]
  );

  // Totals and history for the chosen course and period.
  useEffect(() => {
    if (!selected) return undefined;
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get("/attendance/tutor", {
        subjectId: selected.subjectId,
        ...(selected.yearLevel ? { year: selected.yearLevel } : {}),
        ...periodRange(period),
      })
      .then((res) => !cancelled && setData(res))
      .catch((err) => {
        if (cancelled) return;
        setData({ stats: EMPTY_STATS, records: [], truncated: false });
        setError(err.message || "Could not load attendance.");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [selected, period]);

  return (
    <main className="w-full min-w-0">
      <div className="flex w-full min-w-0 flex-col gap-6">
        {/* Attendance Statistics */}
        <section className="w-full min-w-0">
          <AttendanceOverview
            courses={courses ?? []}
            course={course}
            onCourseChange={setCourse}
            period={period}
            onPeriodChange={setPeriod}
            stats={data.stats}
            loading={loading}
          />
        </section>

        {/* Attendance History */}
        <section className="w-full min-w-0">
          <AttendanceHistory
            records={data.records}
            truncated={data.truncated}
            loading={loading}
            error={error}
            hasCourses={(courses ?? []).length > 0}
          />
        </section>
      </div>
    </main>
  );
}
