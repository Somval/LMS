import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./DashboardHeader";
import Sidebar from "./sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#F4F7FE]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={openSidebar} />

        <main className="w-full min-w-0 flex-1 p-3 sm:p-5 lg:p-8">
          <div className="mx-auto w-full max-w-[1440px] min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}