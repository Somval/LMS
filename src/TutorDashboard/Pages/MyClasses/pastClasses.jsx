
import React from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pastClasses = [
  {
    id: 1,
    studentName: "Olivia Johnson",
    studentAvatar: "",
    topic: "Functions and Graphs",
    subject: "Mathematics",
    level: "Year 1",
    date: "Mon, May 26, 2025",
    time: "5:00 PM – 6:00 PM",
    attendance: "Present",
  },
  {
    id: 2,
    studentName: "Olivia Johnson",
    studentAvatar: "",
    topic: "Functions and Graphs",
    subject: "Mathematics",
    level: "Year 1",
    date: "Mon, May 26, 2025",
    time: "5:00 PM – 6:00 PM",
    attendance: "Present",
  },
  {
    id: 3,
    studentName: "Olivia Johnson",
    studentAvatar: "",
    topic: "Functions and Graphs",
    subject: "Mathematics",
    level: "Year 1",
    date: "Mon, May 26, 2025",
    time: "5:00 PM – 6:00 PM",
    attendance: "Present",
  },
  {
    id: 4,
    studentName: "Olivia Johnson",
    studentAvatar: "",
    topic: "Functions and Graphs",
    subject: "Mathematics",
    level: "Year 1",
    date: "Mon, May 26, 2025",
    time: "5:00 PM – 6:00 PM",
    attendance: "Present",
  },
];

export default function PastClassesTable() {
  const navigate = useNavigate();

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
              {pastClasses.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-[#FAFAFB]"
                >
                  <td className="whitespace-nowrap py-4 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E2E8F0] font-medium text-[#64748B]">
                        {item.studentAvatar ? (
                          <img
                            src={item.studentAvatar}
                            alt={item.studentName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          item.studentName.charAt(0)
                        )}
                      </div>

                      <span className="font-semibold text-[#101828]">
                        {item.studentName}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="font-semibold text-[#101828]">
                      {item.topic}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {item.subject} · {item.level}
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
                        <div className="font-medium">{item.date}</div>
                        <div className="text-[11px] text-[#64748B]">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="text-[13px] font-semibold text-[#16A34A]">
                      {item.attendance}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-4 pr-6">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/Tutor/past-classes/${item.id}`)
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
