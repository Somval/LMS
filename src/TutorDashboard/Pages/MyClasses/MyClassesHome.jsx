import React from "react";
import MyClasses from "./MyClasses";
import PastClassesTable from "../MyClasses/pastClasses";

export default function MyclassHomes() {
  return (
    <div className="min-h-screen bg-[#F5F7FC] ">
      <MyClasses />
      <div className="mt-6">
        <PastClassesTable />
      </div>
    </div>
  );
}