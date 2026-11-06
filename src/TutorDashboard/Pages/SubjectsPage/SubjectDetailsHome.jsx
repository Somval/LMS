import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../../lib/api";
import SubjectDetails from "./SubjectDetails";
import PerformanceSummary from "./PerformanceSummary";
import RecentLessonNotes from "./RecentLessonNotes";
import RecentClasses from "./RecentClasses";
import ActiveAssignments from "./activeassignment";
import StudentsOfferingSubject from "./StudentsOffering";

export default function SubjectHome() {
  const [params] = useSearchParams();
  const subjectId = params.get("subject");
  const year = params.get("year");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!subjectId);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!subjectId) return undefined;
    let cancelled = false;
    setLoading(true);
    setError("");
    api
      .get(`/tutors/subjects/${subjectId}`, year ? { year } : undefined)
      .then((res) => !cancelled && setData(res))
      .catch((err) => !cancelled && setError(err.message || "Could not load this subject."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [subjectId, year]);

  if (!subjectId || error || loading || !data) {
    return (
      <main className="flex min-h-[60vh] w-full min-w-0 flex-col items-center justify-center gap-3 bg-[#F5F7FC] px-4 text-center">
        {loading ? (
          <p className="text-sm font-medium text-slate-500">Loading subject…</p>
        ) : (
          <>
            <p role="alert" className="text-sm font-medium text-slate-600">
              {error || "Pick a subject to see its details."}
            </p>
            <Link to="/tutor/subjects" className="text-sm font-semibold text-[#246BFF] hover:text-[#1558D6]">
              Back to subjects
            </Link>
          </>
        )}
      </main>
    );
  }

  return (
    <main className="w-full min-w-0 bg-[#F5F7FC]">
      {/* SUBJECT HEADER */}
      <section className="w-full min-w-0">
        <SubjectDetails data={data} />
      </section>

      {/* MAIN DASHBOARD CONTENT */}
      <section className="w-full min-w-0">
        <div className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          {/* TOP ROW: Performance + Achievements / Rewards shortcuts */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 [&>div]:min-w-0 [&>div]:w-full">
            <div className="w-full min-w-0">
              <PerformanceSummary performance={data.performance} />
            </div>
            <div className="w-full min-w-0">
              <RecentLessonNotes subjectId={data.subject.id} year={data.yearLevel} />
            </div>
          </div>

          {/* BOTTOM ROW: Recent Classes + Active Assignments */}
          <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-5 lg:mt-6 lg:grid-cols-2 lg:gap-6 [&>div]:min-w-0 [&>div]:w-full">
            <div className="w-full min-w-0">
              <RecentClasses classes={data.recentClasses} />
            </div>
            <div className="w-full min-w-0">
              <ActiveAssignments work={data.activeWork} />
            </div>
          </div>
        </div>
        <StudentsOfferingSubject students={data.students} />
      </section>
    </main>
  );
}
