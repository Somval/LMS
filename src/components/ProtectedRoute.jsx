import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { HOME_BY_ROLE, useAuth } from "../context/AuthContext";

const LOGIN_BY_ROLE = {
  STUDENT: "/student-auth/login",
  PARENT: "/parent/login",
  TUTOR: "/tutor/login",
  ADMIN: "/admin/login",
};

// Wrap a group of routes: <Route element={<ProtectedRoute role="STUDENT" />}> ... </Route>
export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-8 text-center text-sm text-gray-500">Loading…</div>;
  if (!user) return <Navigate to={LOGIN_BY_ROLE[role]} replace state={{ from: location }} />;
  if (user.role !== role) return <Navigate to={HOME_BY_ROLE[user.role]} replace />;
  return <Outlet />;
}
