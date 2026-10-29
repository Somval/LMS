import React from "react";
import Summary from "../../../components/Tutor/PerformanceSummary"
import PerformanceByTopic from "../../../components/Tutor/PerformanceTopic"
import RecentAssement from "../../../components/Tutor/RecentAssessments"
export default function AcademicPerformance(){
    return(
        <div className="bg-white">
           <Summary/>
           <PerformanceByTopic/>
           <RecentAssement/>
        </div>
    )
}