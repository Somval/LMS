
import React from "react";

import AssignmentDetailsHeader from "../../../components/Admincomponent/Assignmentheader";
import AvailabilityDeadlineCard from "../../../components/Admincomponent/AvailabilityandDeadline";
import AssignmentQuestions from "../../../components/Admincomponent/AssignmentQuestions";
import StudentSubmissionsCard from "../../../components/Admincomponent/StudentSubmissions";

export default function AssignmentDetails() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F4F7FD] px-4 py-5 font-sans text-[#252B35] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-6">
        {/* Assignment header */}
        <section className="w-full min-w-0">
          <AssignmentDetailsHeader />
        </section>

        {/* Availability and deadline */}
        <section className="w-full min-w-0">
          <AvailabilityDeadlineCard />
        </section>

        {/* Questions and submissions */}
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-6">
          <section className="min-w-0 w-full">
            <AssignmentQuestions />
          </section>

          <section className="min-w-0 w-full">
            <StudentSubmissionsCard />
          </section>
        </div>
      </div>
    </main>
  );
}
