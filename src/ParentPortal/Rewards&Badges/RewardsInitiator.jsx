import React from "react";

import SelectChild from "../HomeworkAssignments/SelectChild";
import ArentAchievementAnalytics from "./arentAchievementAnalytics";
import RewardsEarned from "./RewardsEarned";
import BadgesSection from "./BadgesSection";

export default function RewardInitiator() {
  return (
    <main className="w-full">
      <div className="flex w-full flex-col gap-6">
        <SelectChild />
        <ArentAchievementAnalytics />
        <RewardsEarned />
        <BadgesSection />
      </div>
    </main>
  );
}