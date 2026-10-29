import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./TutorComponent/Tutorsidebar";
import Navbar from "./TutorComponent/Navbar";

export default function TutorLayout() {
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div
        className="
          min-h-screen
          w-full
          md:ml-[250px]
          md:w-[calc(100%-250px)]
        "
      >
        {/* Navbar */}
        <Navbar />

        {/* Content with top padding (pt-16 or pt-20) to prevent it from hiding under the Navbar */}
        <main className="w-full overflow-x-hidden pt-16 md:pt-20">
          <div className="w-full px-4 py-4 sm:px-5 md:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}