import React from 'react';
import ChildSelectorBar from "./childselector";
import AttendanceAnalytics from "./attandaneAnalytics";
import SessionAttendance from "./SessionAttendance";

export default function Attendance() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Child Selector Header Bar */}
                <ChildSelectorBar />

                {/* Attendance Summary Cards / Analytics Widget */}
                <AttendanceAnalytics />

                {/* Session Attendance Table & Filter */}
                <SessionAttendance />

            </div>
        </div>
    );
}