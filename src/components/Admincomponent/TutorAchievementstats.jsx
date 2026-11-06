
import React from "react";
import { Ribbon, Gift } from "lucide-react";



const statCards = [
  {
    id: "achievements",
    label: "Achievements Created",
    key: "total",
    iconType: "custom",
    bgColor: "bg-[#EAFBF1]",
    iconColor: "text-[#10B981]",
  },
  {
    id: "badges",
    label: "Badges Created",
    key: "badges",
    icon: Ribbon,
    bgColor: "bg-[#F9EBF8]",
    iconColor: "text-[#C084FC]",
  },
  {
    id: "rewards",
    label: "Rewards Created",
    key: "rewards",
    icon: Gift,
    bgColor: "bg-[#FEF9E7]",
    iconColor: "text-[#EAB308]",
  },
];

function AchievementIcon() {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-7 w-7 text-[#10B981]"
    >
      <path
        d="M20.0745 10.3245C20.3918 10.0072 20.3918 9.49278 20.0745 9.17548C19.7572 8.85817 19.2428 8.85817 18.9255 9.17548L12.1875 15.9135L8.69952 12.4255C8.38222 12.1082 7.86778 12.1082 7.55048 12.4255C7.23317 12.7428 7.23317 13.2572 7.55048 13.5745L12.1875 18.2115L20.0745 10.3245Z"
        fill="currentColor"
      />
      <path
        d="M10.8492 0.849489C12.0594 -0.283163 13.9406 -0.283163 15.1508 0.849489L16.3637 1.98476C16.9207 2.50604 17.648 2.8073 18.4104 2.83253L20.0709 2.88747C21.7275 2.94228 23.0577 4.27249 23.1125 5.92912L23.1675 7.58957C23.1927 8.352 23.494 9.07931 24.0152 9.63626L25.1505 10.8492C26.2832 12.0594 26.2832 13.9406 25.1505 15.1508L24.0152 16.3637C23.494 16.9207 23.1927 17.648 23.1675 18.4104L23.1125 20.0709C23.0577 21.7275 21.7275 23.0577 20.0709 23.1125L18.4104 23.1675C17.648 23.1927 16.9207 23.494 16.3637 24.0152L15.1508 25.1505C13.9406 26.2832 12.0594 26.2832 10.8492 25.1505L9.63626 24.0152C9.07931 23.494 8.352 23.1927 7.58957 23.1675L5.92912 23.1125C4.27249 23.0577 2.94228 21.7275 2.88747 20.0709L2.83253 18.4104C2.8073 17.648 2.50604 16.9207 1.98476 16.3637L0.849489 15.1508C-0.283163 13.9406 -0.283163 12.0594 0.849489 10.8492L1.98476 9.63626C2.50604 9.07931 2.8073 8.352 2.83253 7.58957L2.88747 5.92912C2.94228 4.27249 4.27249 2.94228 5.92912 2.88747L7.58957 2.83253C8.352 2.8073 9.07931 2.50604 9.63626 1.98476L10.8492 0.849489ZM14.0403 2.03591L15.2533 3.17118C16.0978 3.96159 17.2006 4.41839 18.3567 4.45664L20.0172 4.51158C20.8185 4.53809 21.4619 5.18153 21.4884 5.98285L21.5434 7.6433C21.5816 8.79936 22.0384 9.90219 22.8288 10.7467L23.9641 11.9597C24.512 12.545 24.512 13.455 23.9641 14.0403L22.8288 15.2533C22.0384 16.0978 21.5816 17.2006 21.5434 18.3567L21.4884 20.0172C21.4619 20.8185 20.8185 21.4619 20.0172 21.4884L18.3567 21.5434C17.2006 21.5816 16.0978 22.0384 15.2533 22.8288L14.0403 23.9641C13.455 24.512 12.545 24.512 11.9597 23.9641L10.7467 22.8288C9.90219 22.0384 8.79936 21.5816 7.6433 21.5434L5.98285 21.4884C5.18153 21.4619 4.53809 20.8185 4.51158 20.0172L4.45664 18.3567C4.41839 17.2006 3.96159 16.0978 3.17118 15.2533L2.03591 14.0403C1.48803 13.455 1.48803 12.545 2.03591 11.9597L3.17118 10.7467C3.96159 9.90219 4.41839 8.79936 4.45664 7.6433L4.51158 5.98285C4.53809 5.18153 5.18153 4.53809 5.98285 4.51158L7.6433 4.45664C8.79936 4.41839 9.90219 3.96159 10.7467 3.17118L11.9597 2.03591C12.545 1.48803 13.455 1.48803 14.0403 2.03591Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function StatCards({ items = [], loading = false }) {
  const counts = {
    total: items.length,
    badges: items.filter((a) => a.kind === "BADGE").length,
    rewards: items.filter((a) => a.kind === "REWARD").length,
  };
  const statsData = statCards.map((card) => ({ ...card, value: loading ? "…" : counts[card.key] }));

  return (
    <section className="box-border w-full min-w-0  p-2 sm:p-4">
      <div
        className="
          mx-auto
          box-border
          grid
          w-full
          max-w-[1066px]
          min-w-0
          grid-cols-1
          gap-3
          sm:grid-cols-2
          sm:gap-4
          lg:grid-cols-3
          lg:gap-5
        "
      >
        {statsData.map((stat) => {
          const IconComponent = stat.icon;

          return (
            <article
              key={stat.id}
              className="
                group
                flex
                min-h-[112px]
                min-w-0
                items-center
                gap-4
                rounded-xl
                border
                border-[#E9EDF5]
                bg-white
                p-4
                shadow-[0_2px_10px_rgba(15,23,42,0.025)]
                transition-all
                duration-200
                hover:border-[#DCE3EF]
                hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
                sm:min-h-[120px]
                sm:p-5
                lg:gap-4
                lg:p-5
              "
            >
              {/* Icon */}
              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${stat.bgColor}
                  transition-transform
                  duration-200
                  group-hover:scale-105
                  sm:h-14
                  sm:w-14
                  sm:rounded-2xl
                `}
                aria-hidden="true"
              >
                {stat.iconType === "custom" ? (
                  <AchievementIcon />
                ) : (
                  <IconComponent
                    className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.iconColor}`}
                    strokeWidth={2}
                  />
                )}
              </div>

              {/* Statistic */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <p className="break-words text-sm font-medium leading-5 text-[#64748B] sm:text-[14px] sm:leading-6">
                  {stat.label}
                </p>

                <p className="text-[30px] font-bold leading-9 tracking-tight text-[#111827] sm:text-[32px] sm:leading-10">
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
