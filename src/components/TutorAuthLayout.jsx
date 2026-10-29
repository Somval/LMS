
import React from "react";
import Sidebar from "../components/Tutor/Tutorsidebar";
import RegistrationFlow from "../Authentication/Tutor/RegistrationFlow";

export default function TutorAuthLayout() {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-white md:h-screen md:min-h-0 md:overflow-hidden">
      {/* Sidebar: hidden on mobile, visible on tablet and desktop */}
      <aside className="hidden shrink-0 md:block md:h-full md:w-[36%] md:min-w-[260px] md:max-w-[440px] lg:min-w-[300px]">
        <Sidebar />
      </aside>

      {/* Registration Flow: full width on mobile */}
      <main className="min-h-screen w-full min-w-0 flex-1 bg-white md:h-full md:min-h-0 md:overflow-y-auto">
        <RegistrationFlow />
      </main>
    </div>
  );
}
