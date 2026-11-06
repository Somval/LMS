
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";
import Avatar from "../../../components/Avatar";
import { fullDate, timeRange } from "../../../StudentPortal/classFormat";

// How the roll call went: green when everyone came, amber when some were absent, red when none came.
const attendanceSummary = ({ marked, present, late, absent }) => {
  if (!marked) return { text: "Not marked", color: "text-[#94A3B8]" };
  const came = present + late;
  const color = absent === 0 ? "text-[#16A34A]" : came === 0 ? "text-[#DC2626]" : "text-[#D97706]";
  return { text: `${came} of ${marked} attended`, color };
};

export default function PastClassesTable() {
  const navigate = useNavigate();
  const [pastClasses, setPastClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get("/classes/past")
      .then((list) => !cancelled && setPastClasses(list))
      .catch((err) => !cancelled && setError(err.message || "Could not load your past classes."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F5F7FC] px-6 py-[14px] text-[#111827]">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-[16px] font-bold tracking-tight text-[#101828]">
          Past Classes
        </h2>

        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EDE4FF] px-1.5 text-[11px] font-semibold text-[#7000E8]">
          {pastClasses.length}
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-[#E1E4EB] bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E1E4EB] bg-[#F8FAFC] text-[12px] font-semibold text-[#64748B]">
                <th className="py-3.5 pl-6 pr-4">Student</th>
                <th className="px-4 py-3.5">Lesson / Topic</th>
                <th className="px-4 py-3.5">Date &amp; Time</th>
                <th className="px-4 py-3.5">Attendance</th>
                <th className="py-3.5 pl-4 pr-6">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E1E4EB] text-[13px] text-[#1E293B]">
              {(loading || error || pastClasses.length === 0) && (
                <tr>
                  <td
                    colSpan="5"
                    role={error ? "alert" : undefined}
                    className={`px-6 py-10 text-center text-[13px] ${error ? "font-medium text-red-600" : "text-[#64748B]"}`}
                  >
                    {loading ? "Loading past classes…" : error || "No past classes yet."}
                  </td>
                </tr>
              )}
              {pastClasses.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-[#FAFAFB]"
                >
                  <td className="whitespace-nowrap py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      {item.students[0] ? (
                        <Avatar
                          name={item.students[0].fullName}
                          avatarUrl={item.students[0].avatarUrl}
                          className="h-10 w-10 rounded-full"
                          textClassName="text-sm"
                        />
                      ) : (
                        <div className="h-10 w-10 shrink-0 rounded-full bg-[#E2E8F0]" />
                      )}

                      <span className="font-semibold text-[#101828]">
                        {item.students[0]?.fullName ?? "No students"}
                        {item.studentCount > 1 && (
                          <span className="font-normal text-[#64748B]"> +{item.studentCount - 1} more</span>
                        )}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="font-semibold text-[#101828]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {item.subject.name}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-[#101828]">
                    <div className="flex items-center gap-2.5">
                      <Calendar
                        size={15}
                        strokeWidth={1.8}
                        className="text-[#64748B]"
                      />
                      <div>
                        <div className="font-medium">{fullDate(item.startsAt)}</div>
                        <div className="text-[11px] text-[#64748B]">
                          {timeRange(item.startsAt, item.endsAt)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className={`text-[13px] font-semibold ${attendanceSummary(item.attendance).color}`}>
                      {attendanceSummary(item.attendance).text}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-4 pr-6">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/tutor/past-classes/${item.id}`)
                      }
                      className="inline-flex h-8 items-center justify-center rounded-md border border-[#2563EB] bg-white px-4 text-[12px] font-medium text-[#2563EB] shadow-sm transition hover:bg-[#EFF6FF] active:scale-[0.98]"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
