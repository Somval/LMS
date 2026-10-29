
import React from "react";
import LmsWelcome from "../../sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* LMS Sidebar - Desktop Only */}
      <aside className="hidden shrink-0 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <LmsWelcome />
      </aside>

      {/* Main Content Area - Full Available Width */}
      <main className="min-h-screen min-w-0 flex-1 bg-white p-4 sm:p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}
