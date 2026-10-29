import React from "react";
import { CheckCircle2, XCircle, Clock3 } from "lucide-react";
import SessionAttendance from "./AttendanceSession";
const stats = [
  {
    title: "Classes",
    subtitle: "Attended",
    value: "14",
    icon: CheckCircle2,
    card: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    title: "Classes",
    subtitle: "Missed",
    value: "2",
    icon: XCircle,
    card: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-red-500",
  },
  {
    title: "Late",
    subtitle: "Arrivals",
    value: "16",
    icon: Clock3,
    card: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

const OnboardingCard = () => {
  return (
    <>
    <section className="w-full bg-slate-50 p-4 sm:p-6">
      {/* Main White Container */}
      <div className="w-full rounded-xl border border-slate-100 bg-white px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Normal Statistics */}
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`${item.card} flex min-h-[110px] flex-col justify-between rounded-lg px-4 py-3.5`}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${item.iconColor}`}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="leading-tight">
                    <p className="text-[10px] font-medium text-slate-800">
                      {item.title}
                    </p>

                    <p className="text-[10px] font-medium text-slate-800">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Number */}
                <div className="pl-[52px]">
                  <p className="text-[27px] font-semibold leading-none tracking-tight text-slate-950">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Attendance Rate */}
          <div className="flex min-h-[110px] items-center gap-3 rounded-lg bg-cyan-100 px-4 py-3.5">
            
            {/* Circular Progress */}
            <div className="relative h-12 w-12 shrink-0">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 48 48"
              >
                {/* Background Circle */}
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />

                {/* Progress */}
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#29216B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="125.66"
                  strokeDashoffset="25.13"
                />
              </svg>
            </div>

            {/* Attendance Information */}
            <div className="flex flex-col leading-tight">
              <p className="text-[10px] font-medium text-slate-800">
                Attendance
              </p>

              <p className="text-[10px] font-medium text-slate-800">
                Rate
              </p>

              <p className="mt-1 text-[27px] font-semibold leading-none tracking-tight text-slate-950">
                80%
              </p>

              <p className="mt-1 text-[10px] font-medium text-emerald-500">
                Good
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
    <SessionAttendance/>
  </>);
};

export default OnboardingCard;