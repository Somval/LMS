
import React from "react";
import {
  Plus,
  CalendarDays,
  CornerUpRight,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { Link } from "react-router-dom";

const classStatistics = [
  {
    id: "scheduled",
    label: "Scheduled Classes",
    value: 28,
    Icon: CalendarDays,
    iconColor: "text-[#20D987]",
    iconBg: "bg-[#E4FFF1]",
  },
  {
    id: "upcoming",
    label: "Upcoming Classes",
    value: 28,
    Icon: CornerUpRight,
    iconColor: "text-[#D946EF]",
    iconBg: "bg-[#FCE7FF]",
  },
  {
    id: "completed",
    label: "Completed Classes",
    value: 28,
    Icon: CircleCheck,
    iconColor: "text-[#FFA51F]",
    iconBg: "bg-[#FFF2D9]",
  },
  {
    id: "cancelled",
    label: "Cancelled Classes",
    value: 28,
    Icon: CircleX,
    iconColor: "text-[#FF4262]",
    iconBg: "bg-[#FFE5EA]",
  },
];

function ClassStatCard({
  label,
  value,
  Icon,
  iconColor,
  iconBg,
}) {
  return (
    <div className="flex min-h-[88px] w-full min-w-0 items-center gap-3.5 rounded-lg border border-[#E5EAF2] bg-white px-4 py-4 transition-all duration-200 hover:border-[#D5DFEF] hover:shadow-sm sm:min-h-[96px] sm:gap-4 sm:px-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${iconBg}`}
      >
        <Icon
          size={21}
          strokeWidth={1.8}
          className={iconColor}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="break-words text-xs font-medium leading-5 text-[#64748B] sm:text-[13px] sm:leading-[21px]">
          {label}
        </p>

        <p className="mt-0.5 text-xl font-bold leading-7 tracking-tight text-[#171C25] sm:text-2xl sm:leading-8">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ClassesSchedule({
  statistics = classStatistics,
  onScheduleClass,
}) {
  return (
    <section className="w-full min-w-0 bg-[#F5F8FD] px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
      {/* Section heading and action */}
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-bold leading-7 tracking-tight text-[#171C25] sm:text-2xl sm:leading-8">
            Classes &amp; Schedule
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-[#64748B] sm:text-sm sm:leading-6">
            View and manage every scheduled class session.
          </p>
        </div>

<Link to="/admin/schedule-class">
        <button
          type="button"
          onClick={onScheduleClass}
          className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[#2DC746] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24B53C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DC746] focus-visible:ring-offset-2 sm:min-h-[46px] sm:w-auto sm:self-center sm:px-6"
        >
          <Plus size={18} strokeWidth={2.2} />
          Schedule Class
        </button>
        </Link>
      </div>

      {/* Class statistics */}
      <div className="grid w-full grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {statistics.map((stat) => (
          <ClassStatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            Icon={stat.Icon}
            iconColor={stat.iconColor}
            iconBg={stat.iconBg}
          />
        ))}
      </div>
    </section>
  );
}
