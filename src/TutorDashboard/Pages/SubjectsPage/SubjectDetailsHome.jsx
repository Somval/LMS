import React from "react";
import SubjectDetails from "./SubjectDetails";
import PerformanceSummary from "./PerformanceSummary";
import RecentLessonNotes from "./RecentLessonNotes";
import RecentClasses from "./RecentClasses";
import ActiveAssignments from "./activeassignment";
import StudentsOfferingSubject from "./StudentsOffering";

export default function SubjectHome() {
  return (
    <main className="w-full min-w-0 bg-[#F5F7FC]">
      {/* =====================================================
          SUBJECT HEADER
      ====================================================== */}
      <section className="w-full min-w-0">
        <SubjectDetails />
      </section>

      {/* =====================================================
          MAIN DASHBOARD CONTENT
      ====================================================== */}
      <section className="w-full min-w-0">
        <div className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          
          {/* =================================================
              TOP ROW
              Performance + Recent Lesson Notes
          ================================================== */}
          <div
            className="
              grid
              w-full
              min-w-0
              grid-cols-1
              gap-5

              lg:grid-cols-2
              lg:gap-6

              [&>div]:min-w-0
              [&>div]:w-full
            "
          >
            {/* Performance Summary */}
            <div className="w-full min-w-0">
              <PerformanceSummary />
            </div>

            {/* Recent Lesson Notes */}
            <div className="w-full min-w-0">
              <RecentLessonNotes />
            </div>
          </div>

          {/* =================================================
              BOTTOM ROW
              Recent Classes + Active Assignments
          ================================================== */}
          <div
            className="
              mt-5
              grid
              w-full
              min-w-0
              grid-cols-1
              gap-5

              lg:mt-6
              lg:grid-cols-2
              lg:gap-6

              [&>div]:min-w-0
              [&>div]:w-full
            "
          >
            {/* Recent Classes */}
            <div className="w-full min-w-0">
              <RecentClasses />
            </div>

            {/* Active Assignments */}
            <div className="w-full min-w-0">
              <ActiveAssignments />
            </div>
          </div>
        </div>
      <StudentsOfferingSubject/>   
      </section>
     
    </main>
  );
}