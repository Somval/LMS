import React from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "../../components/Admincomponent/Layout";
import Dashboard from "../pages/Dashboardsection/Dashboard";
import Students from "../pages/Users/students/studentPage";
import StudentDetails from "../pages/Users/students/StudentDetails";
import Dashome from "../pages/Tutor/DashboardHome";
import TutorTable from "../pages/Tutor/listofstudents";
import TutorDetails from "../pages/Tutor/studentDetails";
import Parent from "../pages/parents/parent"


import ParentsTable from "../../AdminDashboard/pages/parents/ParentsTable";
import ParentDetails from "../../AdminDashboard/pages/parents/ParentDetails";
import SubjectPage from "../pages/subejectSection/subject";
import AddSubject from "../../components/Admincomponent/AddSubject";

import CurriculumContent  from "../../AdminDashboard/pages/subejectSection/CurriculumContent"

import AddTopicLesson from "../../components/Admincomponent/AddTopicLesson"
import Classesandschedulehome  from "../../AdminDashboard/pages/ClassesAndSchedule/classesandschedulehome"

import ScheduleClass  from "../../AdminDashboard/pages/ClassesAndSchedule/ScheduleClass"
import Assignmenthome  from "../../AdminDashboard/pages/AssignmentsQuizzes/Assignmenthome"
import AssignmentsTableComponent  from "../../AdminDashboard/pages/AssignmentsQuizzes/AssignmentTable"
import AssignmentDetailsPage  from "../../AdminDashboard/pages/AssignmentsQuizzes/AssignmentDetailsPage"
import Attendance  from "../pages/Attendance/AttendanceHome"
import StudentProfilePage from "../pages/Attendance/StudentProfilePage"
export default function AdminRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Default admin route */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Admin dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Students table */}
        <Route
          path="/users/students"
          element={<Students />}
        />

        {/* Individual student details */}
        <Route
          path="/users/students/:studentId"
          element={<StudentDetails />}
        />

        {/* Tutors home */}
        <Route
          path="/users/tutors"
          element={<Dashome />}
        />

        {/* Tutors list table (Fixed path) */}
        <Route 
          path="/tutors" 
          element={<TutorTable />} 
        />

        {/* Individual tutor details (Fixed path to match ID format) */}
        <Route
          path="/tutors/:tutorId"
          element={<TutorDetails />}
        />




 <Route
          path="/users/parents"
          element={<Parent />}
        />

        {/* Parents table */}
        <Route
          path="/users/parents"
          element={<ParentsTable />}
        />

        {/* Individual parent details */}
        <Route
          path="/users/parents/:id"
          element={<ParentDetails />}
        />

         <Route
          path="/subjects"
          element={<SubjectPage />}
        />

         <Route
          path="/add-subject"
          element={<AddSubject />}
        />

          <Route
          path="/curriculum"
          element={<CurriculumContent />}
        />



 <Route
          path="/addtopicLesson"
          element={<AddTopicLesson />}
        />


 <Route
          path="/classes"
          element={<Classesandschedulehome />}
        />



 <Route
          path="/schedule-class"
          element={<ScheduleClass />}
        />


 


      

      <Route path="/assignmenthome" element={<Assignmenthome />} />
      
      <Route path="/assignment" element={<AssignmentsTableComponent />} />
      
        <Route path="/assignments/:id" element={<AssignmentDetailsPage />} />

      
  <Route path="/attendance" element={<Attendance />} />

      


<Route path="/students/:studentId" element={<StudentProfilePage />} />

       





      </Route>
    </Routes>
  );
}