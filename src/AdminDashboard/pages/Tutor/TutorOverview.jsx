
import React from "react";
import TutorOverview from "../../TutorTabs/Overview";
import CurrentTeaching from "./CurrentTeaching";
import TeachingAvailability from "./availability";
import TeachingContent from "./TeachingContent";

export default function TutorOverviewfunction() {
  return (
    <div className="w-full min-w-0 space-y-6">
      <TutorOverview />

      <div className="flex w-full flex-col items-stretch gap-5 lg:flex-row lg:gap-5">
        <div className="w-full min-w-0 lg:flex-1">
          <CurrentTeaching />
        </div>

        <div className="w-full min-w-0 lg:flex-1">
          <TeachingAvailability />
        </div>
      </div>
       <div className="w-full min-w-0 lg:flex-1">
      <TeachingContent/>
      </div>
    </div>
  );
}
