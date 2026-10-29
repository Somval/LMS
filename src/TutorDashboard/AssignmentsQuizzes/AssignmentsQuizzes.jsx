import React from "react";
import SelectedCourses from "../../components/Tutor/selectedCourses";
import CourseWorkAssessment from "../../components/Tutor/CourseworkAssessments";

export default function AssignmentsAndQuizzes() {
    return (
        <div className="min-h-screen  py-6 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Selected Courses Section */}
                <SelectedCourses />
                
                {/* Coursework and Assessments Table/Dashboard */}
                <div className="bg-white">
                <CourseWorkAssessment />
                </div>
            </div>
        </div>
    );
}