import React from "react";
import Avatar from "../../../components/Avatar";
import { percent, scoreColor } from "./subjectFormat";

const STATUS_COLOR = {
  Active: "text-emerald-500",
  "Needs Attention": "text-amber-500",
  Inactive: "text-rose-600",
};

const StudentsOfferingSubject = ({ students = [] }) => {
  const studentsData = students.map((st) => ({
    id: st.id,
    name: st.fullName,
    avatarUrl: st.avatarUrl,
    performance: percent(st.performance),
    attendance: percent(st.attendanceRate),
    pendingWork: st.pendingWork,
    status: st.status,
    statusColor: STATUS_COLOR[st.status] ?? "text-slate-500",
    perfColor: scoreColor(st.performance),
    attColor: scoreColor(st.attendanceRate),
  }));

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
                {studentsData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-sm font-medium text-slate-400">
                      No students are enrolled in this subject yet.
                    </td>
                  </tr>
                )}
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
                          <Avatar
                            name={student.name}
                            avatarUrl={student.avatarUrl}
                            className="h-full w-full"
                            textClassName="text-sm font-semibold text-slate-500"
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