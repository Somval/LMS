
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./Page/Homepagesection/home";

// Admin Portal
import AdminRoute from "../src/AdminDashboard/routes/Adminroute";

// Student Portal
import Routestudent from "./StudentPortal/Routes/studentsroute";
import StudentOnboardingSection from "./Authentication/Student/registrationHome";
import StudentLogin from "./Authentication/Student/Login";

// Parent Portal
import ParentRoutes from "./ParentPortal/ParentRoutes/routes";
import ParentLogin from "./Authentication/Parent/login";
import ParentPortalOnboarding from "./Authentication/Parent/ParentPortalOnboarding";

// Tutor Portal
import TutorRoutes from "./TutorDashboard/Route/TutorRoutes";
import TutorAuthLayout from "./components/TutorAuthLayout";
import LoginPage from "./Authentication/Tutor/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* ADMIN PORTAL */}
        <Route
          path="/admin/*"
          element={<AdminRoute />}
        />

        {/* STUDENT REGISTRATION */}
        <Route
          path="/student/onboarding"
          element={<StudentOnboardingSection />}
        />

        {/* STUDENT PORTAL */}
        <Route
          path="/student/*"
          element={<Routestudent />}
        />

        {/* STUDENT LOGIN */}
        <Route
          path="/student-auth/login"
          element={<StudentLogin />}
        />

        {/* TUTOR LOGIN */}
        <Route
          path="/tutor/login"
          element={<LoginPage />}
        />

        {/* PARENT PORTAL */}
        <Route
          path="/parent/*"
          element={<ParentRoutes />}
        />

        {/* PARENT LOGIN */}
        <Route
          path="/parent/login"
          element={<ParentLogin />}
        />

        {/* PARENT ONBOARDING */}
        <Route
          path="/parent/onboarding"
          element={<ParentPortalOnboarding />}
        />

        {/* TUTOR ONBOARDING */}
        <Route
          path="/Tutor/Onboarding"
          element={<TutorAuthLayout />}
        />

        {/* TUTOR LOGIN */}
        <Route
          path="/Tutor/login"
          element={<LoginPage />}
        />

        {/* TUTOR DASHBOARD */}
        <Route
          path="/Tutor/*"
          element={<TutorRoutes />}
        />
      </Routes>
    </BrowserRouter>
  );
}
