
import React from "react";
import ParentReviews from "./ParentReviews";
import TutorRatingFeedback from "./Ratingsstatistics";

export default function Reviews() {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#F4F7FD] font-sans">
      <div className="mx-auto flex w-full min-w-0 max-w-[1149px] flex-col gap-5 p-3 sm:gap-6 sm:p-5 lg:gap-7 lg:p-7">
        {/* Rating statistics */}
        <section className="w-full min-w-0">
          <TutorRatingFeedback />
        </section>

        {/* Parent reviews */}
        <section className="w-full min-w-0">
          <ParentReviews />
        </section>
      </div>
    </main>
  );
}
