
import React from "react";
import StudentAchievementDetails  from "../../components/Admincomponent/StudentRecognitionHeader"
import StudenAchievementCard  from "../../components/Admincomponent/AchievementsCard"
import RewardsAndBadges from "../../components/Admincomponent/RewardsAndBadges";

export default function StudentAchievement(){

    return(
        <div>
            <StudentAchievementDetails/>
            <StudenAchievementCard/>
            <div className="mt-10">
            <RewardsAndBadges/>
            </div>
        </div>
    )
}