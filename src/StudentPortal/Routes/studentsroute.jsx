import { Routes, Route, Navigate } from "react-router-dom";

import StudentLayout from "../StudentLayout";
import HomeDashboard from "../dashboard";
import LearningJourney from "../learningjourney";
import CourseDetail from "../Courseinformation";
import LessonDetail from "../LessonDetail";      // The new page component
import NextLiveClass from "../LiveClasses";
import AssignmentsQuizzes from "../assignmentandquize"
import AssignmentDetails from "../assignment-details";
import Progress from "../Progress";
import Achievements from "../achievements"
import Rewards from "../RewardBadges"
import Recordedlessons from "../RecordedLessons"
import ProfileInformation from "../../StudentPortal/ProfileInformation";
import Attendance from "../../StudentPortal/AttendanceHome";
import NotificationsInbox from "../NotificationsInbox";

const StudentRoute = () => {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<HomeDashboard />} />
        
        {/* Learning Journey Routes */}
        <Route path="learning" element={<LearningJourney />} />
        <Route path="learning/:courseId" element={<CourseDetail />} />
        <Route path="learning/:courseId/lesson/:lessonId" element={<LessonDetail />} />

        <Route path="live-classes" element={<NextLiveClass />} />
        <Route path="assignments" element={<AssignmentsQuizzes />} />

        <Route
          path="assignment/:id"
          element={<AssignmentDetails />}
        />

        <Route path="progress" element={<Progress />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="recorded-lessons" element={<Recordedlessons />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="profile" element={<ProfileInformation />} />
        <Route path="notifications" element={<NotificationsInbox />} />
        
        <Route
          path="*"
          element={
            <div className="flex min-h-[70vh] items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-slate-900">
                  404
                </h1>
                <p className="mt-3 text-slate-500">
                  Student portal page not found.
                </p>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default StudentRoute;