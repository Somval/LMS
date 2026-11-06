import React from "react";
import { Plus, CheckCircle2, Clock } from "lucide-react";

const studentStats = [
  {
    id: 1,
    title: "Total Students",
    key: "total",
    icon: (
      <svg
        width="39"
        height="32"
        viewBox="0 0 39 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="block h-8 w-[39px] shrink-0"
      >
        <path
          d="M19.0463 19C22.9123 19 26.0463 15.866 26.0463 12C26.0463 8.13401 22.9123 5 19.0463 5C15.1803 5 12.0463 8.13401 12.0463 12C12.0463 15.866 15.1803 19 19.0463 19Z"
          fill="#089A3A"
        />
        <path
          d="M7.49876 24.3798L7.18715 26.8727C10.1095 30.0262 14.287 32 18.9254 32C23.6775 32 27.9457 29.9283 30.8761 26.6389L30.5937 24.3798C30.281 21.8777 28.154 20 25.6323 20H24.0462L20.9032 21.2572C19.7111 21.734 18.3813 21.734 17.1893 21.2572L14.0462 20H12.4602C9.93854 20 7.81153 21.8777 7.49876 24.3798Z"
          fill="#089A3A"
        />
        <path
          d="M21.6754 2.3468C25.9274 3.49817 29.0552 7.38381 29.0552 12C29.0552 12.5825 29.0053 13.1534 28.9096 13.7088C31.7988 12.8467 33.9051 10.1693 33.9051 7C33.9051 3.13401 30.771 0 26.905 0C24.8254 0 22.9575 0.906904 21.6754 2.3468Z"
          fill="#089A3A"
        />
        <path
          d="M33.7543 25.4061C35.6546 24.4849 37.3452 23.1988 38.7349 21.6389L38.4525 19.3798C38.1397 16.8777 36.0127 15 33.4911 15H31.905L28.762 16.2572C28.5099 16.3581 28.2516 16.4376 27.9898 16.4958C27.8621 16.749 27.724 16.996 27.5761 17.2363C30.7197 18.0184 33.1616 20.6647 33.5795 24.0077L33.7543 25.4061Z"
          fill="#089A3A"
        />
        <path
          d="M16.0465 2.3468C11.8951 3.47096 8.84119 7.26477 8.84119 11.7719C8.84119 12.3406 8.88988 12.898 8.9833 13.4402C6.16245 12.5986 4.10595 9.98447 4.10595 6.89003C4.10595 3.1154 7.16589 0.0554609 10.9405 0.0554609C12.971 0.0554609 14.7947 0.940932 16.0465 2.3468Z"
          fill="#089A3A"
        />
        <path
          d="M3.94615 25.4061C2.44048 24.4849 1.10103 23.1988 -6.10352e-05 21.6389L0.223675 19.3798C0.471484 16.8777 2.15674 15 4.15465 15H5.41133L7.9016 16.2572C8.10135 16.3581 8.30599 16.4376 8.51343 16.4958C8.61456 16.749 8.72396 16.996 8.84118 17.2363C6.35047 18.0184 4.41573 20.6647 4.08464 24.0077L3.94615 25.4061Z"
          fill="#089A3A"
        />
      </svg>
    ),
    cardColor: "bg-[#E6F6DE]",
    borderColor: "border-[#D1E8C7]",
    iconBg: "bg-[#D3F5BA]",
    iconColor: "text-[#07963C]",
  },
  {
    id: 2,
    title: "Active Students",
    key: "active",
    icon: <CheckCircle2 size={21} strokeWidth={2} />,
    cardColor: "bg-[#E6F6DE]",
    borderColor: "border-[#D1E8C7]",
    iconBg: "bg-[#D3F5BA]",
    iconColor: "text-[#07963C]",
  },
  {
    id: 3,
    title: "Needs Assigning",
    key: "needsAssigning",
    icon: <Clock size={21} strokeWidth={2} />,
    cardColor: "bg-[#F8DDDE]",
    borderColor: "border-[#EFCBCC]",
    iconBg: "bg-[#F5C1B9]",
    iconColor: "text-[#E52525]",
  },
];

const fmt = (n) => (n == null ? "—" : Number(n).toLocaleString());

export default function StudentsHeader({ onAddStudent = () => {}, summary = null }) {
  return (
    <section className="mx-auto w-full max-w-[1066px] min-w-0 bg-[#F5F7FC] font-[Inter]">
      {/* Page heading and action */}
      <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <h1 className="text-[24px] font-bold leading-tight tracking-[-0.5px] text-[#111827] sm:text-[26px]">
            Students
          </h1>

          <p className="mt-1 text-[11px] leading-[1.5] text-[#64748B] sm:text-[12px]">
            View and manage all students on the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddStudent}
          className="inline-flex h-[38px] w-full shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#004B0B] px-4 text-[11px] font-medium text-white shadow-sm transition-colors hover:bg-[#063B0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[125px]"
        >
          <Plus size={15} strokeWidth={1.8} aria-hidden="true" />
          Add Student
        </button>
      </div>

      {/* Summary cards: same overall width as the table */}
      <div className="mt-4 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {studentStats.map((stat) => (
          <article
            key={stat.id}
            className={`flex h-[96px] w-full min-w-0 items-center gap-3 rounded-[5px] border px-3 py-3 sm:h-[105px] sm:px-4 ${stat.cardColor} ${stat.borderColor}`}
          >
            <div
              className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-full ${stat.iconBg} ${stat.iconColor}`}
            >
              {stat.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium leading-[1.5] text-[#202020] sm:text-[12px]">
                {stat.title}
              </p>

              <p className="mt-1 text-[16px] font-bold leading-[1.3] tracking-[0.1px] text-[#111111] sm:text-[18px]">
                {fmt(summary?.[stat.key])}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}