import { Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import ChildrenProfiles from "../children/childrenActivity";
import ParentLayout from "../Layout/Parentlayout";
import ParentContainer from '../children/LinkChildWizard'; // Adjust the path based on where your file is located
import Schedule from "../Schedule/ChildSelectorBar"
import Academicprogress from "../../ParentPortal/AcademicProgress/AcademicProgressInitiator"
import AttendanceInitator from "../../ParentPortal/Attendance/AttandanceInitiator"
import Homework  from "../../ParentPortal/HomeworkAssignments/AssignmentInitiator"
import Progressreports from "../../ParentPortal/ProgressReports/ProgressReportsInitiator"
import AchievementInitiator from "../Achievements/AchievementsInitiator"
import RewardInitiator from "../Rewards&Badges/RewardsInitiator";
import MessageInitiator from "../Messages/MessagesInitiator"
import Settings from "../Settings/SettingsInitiator"
export default function ParentRoutes() {
  return (
    <Routes>
      <Route element={<ParentLayout />}>
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="children"
          element={<ChildrenProfiles />}
        />


         <Route
          path="link-children"
          element={<ParentContainer />}
        />

 <Route
          path="schedule"
          element={<Schedule />}
        />
        <Route
          path="academic-progress"
          element={<Academicprogress />}
        />
         <Route
          path="attendance"
          element={<AttendanceInitator />}
        />

 <Route
          path="homework"
          element={<Homework />}
        />

<Route
          path="progress-reports"
          element={<Progressreports />}
        />
        <Route
          path="achievements"
          element={<AchievementInitiator />}
        />
          <Route
          path="rewards"
          element={<RewardInitiator />}
        />

          <Route
          path="messages"
          element={<MessageInitiator />}
        />
          <Route
          path="settings"
          element={<Settings />}
        />









      </Route>




      
    </Routes>
  );
}