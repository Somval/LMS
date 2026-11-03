import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  FileText,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

const DashboardMetrics = ({ data }) => {
  const navigate = useNavigate();
  const n = (v) => (data ? v : "–");
  const metrics = [
    { count: n(data?.classesToday?.length), label: "Classes Today", action: "View schedule", path: "/tutor/class", icon: CalendarDays, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
    { count: n(data?.studentCount), label: "Active Students", action: "View students", path: "/tutor/students", icon: Users, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
    { count: n(data?.assignmentsToGrade), label: "Assignments to Grade", action: "Review submissions", path: "/tutor/assignment-quize", icon: FileText, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
    { count: n(data?.quizzesThisWeek), label: "Quizzes Taken This Week", action: "Review quizzes", path: "/tutor/assignment-quize", icon: ClipboardCheck, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  ];

  return (
    <section className="w-full min-w-0">
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <div
              key={index}
              className="
                flex
                min-w-0
                w-full
                items-start
                gap-3
                rounded-lg
                bg-white
                px-4
                py-3.5
                shadow-[0_1px_4px_rgba(0,0,0,0.08)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
              "
            >
              {/* Icon */}
              <div
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  ${metric.iconBg}
                `}
              >
                <Icon
                  size={16}
                  strokeWidth={2}
                  className={metric.iconColor}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <span className="block text-[32px] font-bold leading-none text-[#000000]">
                  {metric.count}
                </span>

                <p className="mt-1 truncate text-[15px] font-normal text-[#898585]">
                  {metric.label}
                </p>

                <button
                  type="button"
                onClick={() => navigate(metric.path)}
                  className="
                    mt-2
                    inline-flex
                    max-w-full
                    items-center
                    gap-0.5
                    text-[9px]
                    font-medium
                    text-purple-600
                    transition-colors
                    hover:text-purple-800
                  "
                >
                  <span className="truncate">{metric.action}</span>

                  <ArrowRight
                    size={9}
                    strokeWidth={2}
                    className="shrink-0"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardMetrics;