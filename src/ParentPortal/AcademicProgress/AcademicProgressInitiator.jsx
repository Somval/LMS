import React from "react";
import ChildSelectorBar from "../AcademicProgress/selectAchild";
import Analytics from "../AcademicProgress/Analytics";
import SubjectBreakdown from "./SubjectBreakdown";
import RecentLearningActivity from "./RecentLearningActivity";

export default function AcademiaInitiator() {
    return (
        <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
            {/* Unified wrapper to control max width and keep sections cohesively grouped */}
            <div className=" mx-auto ">
                <ChildSelectorBar />
                <Analytics />
                <SubjectBreakdown />
                <RecentLearningActivity />
            </div>
        </div>
    );
}