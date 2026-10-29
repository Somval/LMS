
import React from "react";
import StudentsTable from "./StudentsTable";
import Students from "./students";

export default function StudentPage() {
  return (
    <section className="mx-auto flex w-full min-w-0 flex-col gap-5">
      {/* Students Page Header and Summary Cards */}
      <div className="w-full min-w-0">
        <Students />
      </div>

      {/* Students Table */}
      <div className="w-full min-w-0">
        <StudentsTable />
      </div>
    </section>
  );
}
