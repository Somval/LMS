import React from "react";
import { UsersRound } from "lucide-react";

const avg = (values) => {
  const nums = values.filter((v) => v != null);
  return nums.length ? `${Math.round(nums.reduce((a, b) => a + b, 0) / nums.length)}%` : "–";
};

const DashboardMetrics = ({ students = [] }) => {
  const recent = Date.now() - 30 * 24 * 3600 * 1000;
  const active = students.filter((s) => s.lastClassAt && new Date(s.lastClassAt).getTime() > recent).length;
  const metrics = [
    { title: "Total Students", value: String(students.length), subtitle: "All your students" },
    { title: "Active Students", value: String(active), subtitle: "Attended a class in the last 30 days" },
    { title: "Average Performance", value: avg(students.map((s) => s.performance)), subtitle: "Across graded work" },
    { title: "Average Attendance", value: avg(students.map((s) => s.attendanceRate)), subtitle: "Across your classes" },
  ];

  return (
    <section className="w-full bg-[#f5f7fc] px-6 py-6">
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex h-[136px] w-full items-start rounded-[6px] border border-[white] bg-white px-3.5 py-[22px]"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7f0ff]">
                <UsersRound
                  size={23}
                  strokeWidth={1.7}
                  className="text-[#2E6DFF]"
                />
              </div>

              {/* Content */}
              <div className="ml-5 flex min-w-0 flex-1 flex-col">
                {/* Title */}
                <h3 className="truncate text-[16px] font-normal leading-[20px] text-[#111111]">
                  {metric.title}
                </h3>

                {/* Value */}
                <div className="mt-[3px] text-[32px] font-semibold leading-[36px] tracking-[-0.5px] text-black">
                  {metric.value}
                </div>

                {/* Bottom row */}
                <div className="mt-[5px] flex items-center justify-between gap-2">
                  <span className="truncate text-[12px] font-normal leading-[16px] text-[#999999]">
                    {metric.subtitle}
                  </span>

                  {metric.change && (
                    <span className="shrink-0 text-[11px] font-medium leading-[16px] text-[#00C853]">
                      {metric.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardMetrics;