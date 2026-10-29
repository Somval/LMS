import React from "react";

const StudentsOfferingSubject = () => {
  const studentsData = [
    {
      id: 1,
      name: "Olivia Johnson",
      avatar: "https://i.pravatar.cc/150?img=47",
      performance: "85%",
      attendance: "94%",
      pendingWork: 2,
      status: "Active",
      statusColor: "text-emerald-500",
      perfColor: "text-emerald-500",
      attColor: "text-emerald-500",
    },
    {
      id: 2,
      name: "Olivia Johnson",
      avatar: "https://i.pravatar.cc/150?img=32",
      performance: "30%",
      attendance: "60%",
      pendingWork: 2,
      status: "Needs Attention",
      statusColor: "text-amber-500",
      perfColor: "text-rose-500",
      attColor: "text-amber-500",
    },
    {
      id: 3,
      name: "Olivia Johnson",
      avatar: "https://i.pravatar.cc/150?img=12",
      performance: "0%",
      attendance: "0%",
      pendingWork: 2,
      status: "Inactive",
      statusColor: "text-rose-600",
      perfColor: "text-rose-600",
      attColor: "text-amber-500",
    },
    {
      id: 4,
      name: "Olivia Johnson",
      avatar: "https://i.pravatar.cc/150?img=49",
      performance: "85%",
      attendance: "94%",
      pendingWork: 2,
      status: "Active",
      statusColor: "text-emerald-500",
      perfColor: "text-emerald-500",
      attColor: "text-emerald-500",
    },
  ];

  return (
    <section className="w-full min-w-0 bg-[#F5F7FC]">
      <div className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8">
        <div
          className="
            w-full
            min-w-0
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white
            shadow-[0_1px_4px_rgba(15,23,42,0.04)]
          "
        >
          {/* =================================================
              CARD HEADER
          ================================================== */}
          <div
            className="
              flex
              w-full
              items-center
              justify-between
              border-b
              border-slate-100
              px-5
              py-6
              sm:px-6
              sm:py-7
              lg:px-8
            "
          >
            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  sm:text-2xl
                "
              >
                Students Offering this Subject
              </h2>

              <p
                className="
                  mt-2
                  text-base
                  font-medium
                  text-slate-500
                "
              >
                View student performance, attendance and pending work.
              </p>
            </div>
          </div>

          {/* =================================================
              TABLE
          ================================================== */}
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              {/* =================================================
                  TABLE HEADER
              ================================================== */}
              <thead>
                <tr
                  className="
                    border-b
                    border-slate-100
                    bg-slate-50
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  <th className="whitespace-nowrap px-5 py-4 sm:px-6 lg:px-8">
                    Student
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">
                    Performance
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">
                    Attendance
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">
                    Pending Work
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 sm:px-6 lg:px-8">
                    Status
                  </th>
                </tr>
              </thead>

              {/* =================================================
                  TABLE BODY
              ================================================== */}
              <tbody className="divide-y divide-slate-100">
                {studentsData.map((student) => (
                  <tr
                    key={student.id}
                    className="
                      group
                      transition-colors
                      duration-200
                      hover:bg-slate-50/70
                    "
                  >
                    {/* =========================================
                        STUDENT
                    ========================================== */}
                    <td className="px-5 py-6 sm:px-6 lg:px-8">
                      <div className="flex items-center gap-4">
                        {/* Student Avatar */}
                        <div
                          className="
                            h-12
                            w-12
                            flex-shrink-0
                            overflow-hidden
                            rounded-full
                            bg-slate-100
                            ring-2
                            ring-white
                          "
                        >
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        </div>

                        {/* Student Name */}
                        <span
                          className="
                            whitespace-nowrap
                            text-base
                            font-bold
                            text-slate-900
                          "
                        >
                          {student.name}
                        </span>
                      </div>
                    </td>

                    {/* =========================================
                        PERFORMANCE
                    ========================================== */}
                    <td
                      className={`
                        whitespace-nowrap
                        px-5
                        py-6
                        text-base
                        font-bold
                        sm:px-6
                        ${student.perfColor}
                      `}
                    >
                      {student.performance}
                    </td>

                    {/* =========================================
                        ATTENDANCE
                    ========================================== */}
                    <td
                      className={`
                        whitespace-nowrap
                        px-5
                        py-6
                        text-base
                        font-bold
                        sm:px-6
                        ${student.attColor}
                      `}
                    >
                      {student.attendance}
                    </td>

                    {/* =========================================
                        PENDING WORK
                    ========================================== */}
                    <td className="px-5 py-6 sm:px-6">
                      <span
                        className="
                          text-base
                          font-bold
                          text-slate-900
                        "
                      >
                        {student.pendingWork}
                      </span>
                    </td>

                    {/* =========================================
                        STATUS
                    ========================================== */}
                    <td
                      className={`
                        whitespace-nowrap
                        px-5
                        py-6
                        text-base
                        font-bold
                        sm:px-6
                        lg:px-8
                        ${student.statusColor}
                      `}
                    >
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-100
              px-5
              py-5
              sm:px-6
              lg:px-8
            "
          >
            <p className="text-base font-medium text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-700">
                {studentsData.length}
              </span>{" "}
              students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentsOfferingSubject;