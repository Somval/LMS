import React from "react";
import TutorOverview from "../../TutorTabs/Overview";
import CurrentTeaching from "./CurrentTeaching";
import TeachingAvailability from "./availability";

export default function TutorOverviewfunction({ tutor }) {
  return (
    <div className="w-full min-w-0 space-y-6">
      <TutorOverview tutor={tutor} />

      <div className="flex w-full flex-col items-stretch gap-5 lg:flex-row lg:gap-5">
        <div className="w-full min-w-0 lg:flex-1">
          <CurrentTeaching teaching={tutor.teaching} />
        </div>

        <div className="w-full min-w-0 lg:flex-1">
          <TeachingAvailability availability={tutor.availability} />
        </div>
      </div>
    </div>
  );
}
