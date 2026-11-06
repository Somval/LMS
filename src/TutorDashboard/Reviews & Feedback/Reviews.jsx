
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ParentReviews from "./ParentReviews";
import TutorRatingFeedback from "./Ratingsstatistics";

const EMPTY = { stats: { average: null, count: 0, recent: 0, breakdown: {} }, reviews: [] };

export default function Reviews() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // "me" tells the API to use the signed-in tutor's own profile.
  useEffect(() => {
    let cancelled = false;
    api
      .get("/tutors/me/reviews")
      .then((res) => !cancelled && setData(res))
      .catch((err) => !cancelled && setError(err.message || "Could not load your reviews."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#F4F7FD] font-sans">
      <div className="mx-auto flex w-full min-w-0 max-w-[1149px] flex-col gap-5 p-3 sm:gap-6 sm:p-5 lg:gap-7 lg:p-7">
        {/* Rating statistics */}
        <section className="w-full min-w-0">
          <TutorRatingFeedback stats={data.stats} reviews={data.reviews} loading={loading} />
        </section>

        {/* Parent reviews */}
        <section className="w-full min-w-0">
          <ParentReviews reviews={data.reviews} loading={loading} error={error} />
        </section>
      </div>
    </main>
  );
}
