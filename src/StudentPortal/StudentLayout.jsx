import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/StudentComponent/studentsidebar";
import Header from   "../components/StudentComponent/studentnavbar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans">
      {/* =====================================================
          FIXED SIDEBAR
      ====================================================== */}
      <Sidebar />

      {/* =====================================================
          MAIN APPLICATION AREA
          Sidebar width: 250px
      ====================================================== */}
      <div
        className="
          min-h-screen
          w-full

          md:ml-[250px]
          md:w-[calc(100%-250px)]
        "
      >
        {/* ===================================================
            FIXED HEADER
        ==================================================== */}
        <Header />

        {/* ===================================================
            CONTENT AREA
        ==================================================== */}
        <main
          className="
            min-h-screen
            w-full
            overflow-x-hidden

            pt-[68px]
            sm:pt-[72px]
            lg:pt-[76px]
          "
        >
          {/* =================================================
              CONTENT CONTAINER
              Keeps content comfortably away from sidebar
          ================================================== */}
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]

              px-6
              py-5

              sm:px-8
              sm:py-6

              lg:px-10
              lg:py-7

              xl:px-12
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;