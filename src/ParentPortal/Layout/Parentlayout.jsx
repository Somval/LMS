import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Parentcomponents/parentnavbar";
import Sidebar from "../Parentcomponents/sidebar";

export default function ParentLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* SIDEBAR */}
      <aside
        className="
          fixed
          left-0
          top-0
          bottom-0
          z-40
          hidden
          w-[250px]
          bg-white
          border-r
          border-slate-200
          lg:block
        "
      >
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* NAVBAR */}
      <header
        className="
          fixed
          top-0
          right-0
          left-0
          z-50
          h-[72px]
          bg-white
          border-b
          border-slate-200
          lg:left-[250px]
        "
      >
        <Navbar
          onMenuClick={() => setMobileMenuOpen(true)}
        />
      </header>

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-[280px]
              max-w-[85vw]
              bg-white
              shadow-2xl
            "
          >
            <div className="h-full overflow-y-auto">
              <Sidebar
                mobile
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </aside>

        </div>
      )}

      {/* MAIN CONTENT */}
      <main
        className="
          min-h-screen
          pt-[72px]
          lg:ml-[250px]
        "
      >
        <section
          className="
            min-h-[calc(100vh-72px)]
            w-full
            px-4
            py-6
            sm:px-6
            lg:px-8
            lg:py-8
          "
        >
          {/* CHILD ROUTES APPEAR HERE */}
          <Outlet />
        </section>
      </main>

    </div>
  );
}