
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout";

import TutorDashboard from "../Pages/TutorDashboard";

import Subject from "../Pages/SubjectsPage/subjecthome";
import SubjectDetails from "../Pages/SubjectsPage/SubjectDetailsHome";
import Achievements from "../Pages/SubjectsPage/Achievements";
import RewardsBadges from "../Pages/SubjectsPage/RewardsBadges";
import CreateAchievement from "../Pages/SubjectsPage/CreateAchievement";

import MyclassHome from "../Pages/MyClasses/MyClassesHome";
import ScheduleClass from "../Pages/MyClasses/ScheduleClass";
import Pastclass from "../Pages/MyClasses/pastClasses";
import PastClassDetails from "../Pages/MyClasses/PastClassDetails";
import Openclass from "../../TutorDashboard/Pages/MyClasses/openclass";

import StudentHome from "../Pages/Students/studentHome";
import ViewstudnetDetaails from "../Pages/Students/studentDetails";
import CreateReward from "../Pages/Students/CreateReward";

import AssignmentsQuizzes from "../../TutorDashboard/AssignmentsQuizzes/AssignmentsQuizzes";
import AssessmentDetail from "../../TutorDashboard/AssignmentsQuizzes/courseworkdetails";
import  Createassignment from "../../TutorDashboard/AssignmentsQuizzes/CreateAssignment"
import  Createquize from "../../TutorDashboard/AssignmentsQuizzes/CreateQuiz"


import Attendance  from "../Attendance/Attendance"

import Rating from "../Reviews & Feedback/Reviews"

import Messages from "../Messages/MessagesPage"

import ProfileSettings from "../Settings/SettingsPage"
import Onboarding from "../../Authentication/Tutor/RegistrationFlow"



import Curriculum from "../Lessons/Curriculum";

import TopicDetails from "../Lessons/topicDetails"
import PrepareLesson from "../Lessons/PrepareLesson"
import LessonsPage from "../Lessons/lessonsPage";

export default function TutorRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<TutorDashboard />} />

        {/* Subjects */}
        <Route path="/subjects" element={<Subject />} />
        <Route
          path="/subjects-details"
          element={<SubjectDetails />}
        />

        {/* Classes */}
        <Route path="/class" element={<MyclassHome />} />
        <Route
          path="/class/schedule-class"
          element={<ScheduleClass />}
        />
        <Route
          path="/open-class/:id"
          element={<Openclass />}
        />

        {/* Past classes */}
        <Route path="/past-classes" element={<Pastclass />} />
        <Route
          path="/past-classes/:id"
          element={<PastClassDetails />}
        />

        {/* Students */}
        <Route path="/students" element={<StudentHome />} />
        <Route
       path="/view-student/:id"
          element={<ViewstudnetDetaails />}
        />
        <Route
          path="/create-reward"
          element={<CreateReward />}
        />

        {/* Achievements and rewards */}
        <Route path="/achievements" element={<Achievements />} />
        <Route
          path="/rewardsBadges"
          element={<RewardsBadges />}
        />
        <Route
          path="/createAchievement"
          element={<CreateAchievement />}
        />

        {/* Coursework and assessments */}
        <Route
          path="/assignment-quize"
          element={<AssignmentsQuizzes />}
        />

        {/* Individual assessment details */}
        <Route
          path="/assignment-quize/:assessmentId"
          element={<AssessmentDetail />}
        />

 <Route
 
          path="/create-assignment"
          element={<Createassignment />}
        />
        

        <Route
 
          path="/create-quize"
          element={<Createquize />}
        />
        

        <Route
 
          path="/attendance"
          element={<Attendance />}
        />



          <Route
 
          path="/rating"
          element={<Rating />}
        />


          <Route
 
          path="/messages"
          element={<Messages />}
        />
        
        

         <Route
 
          path="/profile"
          element={<ProfileSettings />}
        />





        {/* Curriculum */}
<Route path="/curriculum" element={<Curriculum />} />

{/* Individual Topic Details */}
<Route

  path="/curriculum/topics/:topicId"
  element={<PrepareLesson />}
/>




        
        <Route
  path="/student/curriculum/topics/:topicId/prepare-lesson"
  element={<PrepareLesson />}
/>

 <Route
  path="/lessons"
  element={<LessonsPage />}
/>
       

       
      </Route>
    </Routes>
  );
}
