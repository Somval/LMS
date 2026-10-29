import React from "react";
import ReviewStatsCards from "../pages/Tutor/Reviewstats";
import RatingBreakdown from "../pages/Tutor/RatingBreakdown";
import ParentReview from "../pages/Tutor/ParentReviews";

export default function Reviews() {
  return (
    <div className="max-w-6xl mx-auto px-3 py-4 sm:p-6 space-y-4 sm:space-y-6 min-h-screen">
      {/* 1. Review Stats */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
        <ReviewStatsCards />
      </div>

      {/* 2. Rating Breakdown */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
        <RatingBreakdown />
      </div>

      {/* 3. Parent Reviews */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
        <ParentReview />
      </div>
    </div>
  );
}