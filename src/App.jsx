import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/navbar";
import Home from "./Page/Homepagesection/home";
import OurPrograms from "./Page/Homepagesection/OurPrograms/OurPrograms";
import SuccessStories from "./Page/Homepagesection/SuccessStories/successstories";
import Pricing from "./Page/Homepagesection/pricing/pricing";
import PaymentVerify from "./Page/PaymentVerify";
import AdminLogin from "./Authentication/Admin/AdminLogin";

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

// Role pages + forgot password
import RoleSelection from "./Authentication/RoleSelection";
import RoleLogin from "./Authentication/roleLogin";
import TutorForgotPassword from "./Authentication/Tutor/ForgotPassword";
import ParentForgotPassword from "./Authentication/Parent/forgot-password";
import StudentForgotPassword from "./Authentication/Student/foget-password";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ───────── Public ───────── */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/programs" element={<><Navbar /><OurPrograms /></>} />
          <Route path="/success-stories" element={<><Navbar /><SuccessStories /></>} />
          <Route path="/pricing" element={<><Navbar /><Pricing /></>} />
          <Route path="/roleSelection" element={<RoleSelection />} />
          <Route path="/role-login" element={<RoleLogin />} />
          <Route path="/tutor/forgot-password" element={<TutorForgotPassword />} />
          <Route path="/parent/forgot-password" element={<ParentForgotPassword />} />
          <Route path="/student/forgot-password" element={<StudentForgotPassword />} />
          <Route path="/student/onboarding" element={<StudentOnboardingSection />} />
          <Route path="/student-auth/login" element={<StudentLogin />} />
          <Route path="/parent/login" element={<ParentLogin />} />
          <Route path="/parent/onboarding" element={<ParentPortalOnboarding />} />
          {/* React Router matches paths case-insensitively, so one entry covers /Tutor/... too */}
          <Route path="/tutor/login" element={<LoginPage />} />
          <Route path="/tutor/onboarding" element={<TutorAuthLayout />} />
          <Route path="/payment/verify" element={<PaymentVerify />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ───────── Role-protected portals ───────── */}
          <Route element={<ProtectedRoute role="ADMIN" />}>
            <Route path="/admin/*" element={<AdminRoute />} />
          </Route>

          <Route element={<ProtectedRoute role="STUDENT" />}>
            <Route path="/student/*" element={<Routestudent />} />
          </Route>

          <Route element={<ProtectedRoute role="PARENT" />}>
            <Route path="/parent/*" element={<ParentRoutes />} />
          </Route>

          <Route element={<ProtectedRoute role="TUTOR" />}>
            <Route path="/tutor/*" element={<TutorRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
