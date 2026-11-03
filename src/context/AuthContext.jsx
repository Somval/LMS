import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, setUnauthorizedHandler, tokenStore } from "../lib/api";

const AuthContext = createContext(null);

// Where each role lands after logging in.
export const HOME_BY_ROLE = {
  STUDENT: "/student/dashboard",
  PARENT: "/parent/dashboard",
  TUTOR: "/tutor/dashboard",
  ADMIN: "/admin/dashboard",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!tokenStore.get()); // only wait if there is a token to check

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  // Restore the session on page load.
  useEffect(() => {
    setUnauthorizedHandler(logout);
    if (!tokenStore.get()) return;
    api.get("/auth/me").then(setUser).catch(logout).finally(() => setLoading(false));
  }, [logout]);

  const login = useCallback(async ({ email, password, role }) => {
    const { token, user: u } = await api.post("/auth/login", { email, password, role });
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  // kind: "student" | "parent" | "tutor"
  const register = useCallback(async (kind, payload) => {
    const { token, user: u } = await api.post(`/auth/register/${kind}`, payload);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const updateUser = useCallback((patch) => setUser((u) => (u ? { ...u, ...patch } : u)), []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateUser }),
    [user, loading, login, register, logout, updateUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
