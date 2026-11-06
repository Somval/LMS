import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ReviewStatsCards from "../pages/Tutor/Reviewstats";
import RatingBreakdown from "../pages/Tutor/RatingBreakdown";
import ParentReview from "../pages/Tutor/ParentReviews";

// Real reviews for this tutor: GET /tutors/:id/reviews -> { stats, reviews }
export default function Reviews({ tutor }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tutor?.id) return undefined;
    let cancelled = false;
    api
      .get(`/tutors/${tutor.id}/reviews`)
      .then((res) => !cancelled && setData(res))
      .catch((err) => !cancelled && setError(err.message || "Could not load reviews."));
    return () => {
      cancelled = true;
    };
  }, [tutor?.id]);

  const loading = !data && !error;

  return (
    <div className="max-w-6xl mx-auto px-3 py-4 sm:p-6 space-y-4 sm:space-y-6 min-h-screen">
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      {/* 1. Review Stats */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
        <ReviewStatsCards stats={data?.stats} loading={loading} />
      </div>

      {/* 2. Rating Breakdown */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
        <RatingBreakdown stats={data?.stats} loading={loading} />
      </div>

      {/* 3. Parent Reviews */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
        <ParentReview reviews={data?.reviews} loading={loading} />
      </div>
    </div>
  );
}
