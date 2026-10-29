
import React from "react";
import {
  Plus,
  UsersRound,
  CheckCircle2,
  Clock,
} from "lucide-react";

const studentStats = [
  {
    id: 1,
    title: "Total Students",
    value: "1,248",
    icon: UsersRound,
    cardColor: "bg-[#E6F6DE]",
    borderColor: "border-[#D1E8C7]",
    iconBg: "bg-[#D0F3B8]",
    iconColor: "text-[#07963C]",
  },
  {
    id: 2,
    title: "Active Students",
    value: "1,200",
    icon: CheckCircle2,
    cardColor: "bg-[#E6F6DE]",
    borderColor: "border-[#D1E8C7]",
    iconBg: "bg-[#D0F3B8]",
    iconColor: "text-[#07963C]",
  },
  {
    id: 3,
    title: "Needs Assigning",
    value: "6",
    icon: Clock,
    cardColor: "bg-[#F8DDDE]",
    borderColor: "border-[#EFCBCC]",
    iconBg: "bg-[#F5C1B9]",
    iconColor: "text-[#E52525]",
  },
];

export default function StudentsHeader({ onAddStudent = () => {} }) {
  return (
    <section className="w-full min-w-0 bg-[#F5F7FC]">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h1 className="font-[Inter] text-[24px] font-bold leading-tight tracking-[-0.5px] text-[#111827] sm:text-[26px]">
            Students
          </h1>

          <p className="mt-1 font-[Inter] text-[11px] leading-[1.5] text-[#64748B] sm:text-[12px]">
            View and manage all students on the platform.
          </p>
        </div>

        {/* Add Student Button */}
        <button
          type="button"
          onClick={onAddStudent}
          className="inline-flex h-[36px] w-full shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#004B0B] px-4 font-[Inter] text-[11px] font-medium text-white shadow-sm transition-colors hover:bg-[#063B0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[104px]"
        >
          <Plus size={15} strokeWidth={1.8} />
          Add Student
        </button>
      </div>

      {/* Student Summary Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2.5">
        {studentStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className={`flex min-h-[63px] min-w-0 items-center gap-2.5 rounded-[5px] border px-3 py-2.5 sm:gap-3 ${stat.cardColor} ${stat.borderColor}`}
            >
              {/* Statistic Icon */}
              <div
                className={`flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
              >
                <Icon
                  size={17}
                  strokeWidth={2}
                  className={stat.iconColor}
                  aria-hidden="true"
                />
              </div>

              {/* Statistic Text */}
              <div className="min-w-0">
                <p className="truncate font-[Inter] text-[10px] font-medium leading-[1.5] text-[#202020]">
                  {stat.title}
                </p>

                <p className="mt-0.5 font-[Inter] text-[13px] font-bold leading-[1.3] tracking-[0.1px] text-[#111111] sm:text-[14px]">
                  {stat.value}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
