
import React from "react";
import {
  UsersRound,
  TriangleAlert,
  CreditCard,
  ChevronRight,
} from "lucide-react";

const attentionItems = [
  {
    id: 1,
    count: 5,
    label: "Tutor application",
    icon: UsersRound,
    rowBg: "bg-[#EFFCF3]",
    iconBg: "bg-[#D8F8E2]",
    iconColor: "text-[#16B84E]",
    path: "/admin/users/tutors",
  },
  {
    id: 2,
    count: 3,
    label: "New complaints",
    icon: TriangleAlert,
    rowBg: "bg-[#FFF5ED]",
    iconBg: "bg-[#FFE7D1]",
    iconColor: "text-[#FF8A00]",
    path: "/admin/complaints",
  },
  {
    id: 3,
    count: 8,
    label: "Payments Due",
    icon: CreditCard,
    rowBg: "bg-[#F9F0FF]",
    iconBg: "bg-[#EED7FF]",
    iconColor: "text-[#A020F0]",
    path: "/admin/revenue-payments",
  },
];

export default function NeedsAttention({ onItemClick }) {
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <section className="w-full min-w-0 rounded-[9px] border border-[#F0F1F5] bg-white p-3 sm:p-4">
      {/* Header */}
      <div className="mb-3">
        <h2 className="font-[Inter] text-[13px] font-semibold leading-[1.4] text-[#171923]">
          Needs Attention
        </h2>

        <p className="mt-0.5 font-[Inter] text-[10px] leading-[1.5] text-[#9297A5]">
          Items that may require your action.
        </p>
      </div>

      {/* Attention Items */}
      <div className="flex flex-col gap-1.5">
        {attentionItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              aria-label={`${item.count} ${item.label}`}
              className={`group flex min-h-[57px] w-full min-w-0 items-center gap-2 rounded-[7px] px-2.5 py-2 text-left transition-colors hover:brightness-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] sm:gap-2.5 sm:px-3 ${item.rowBg}`}
            >
              {/* Icon */}
              <span
                className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.6}
                  className={item.iconColor}
                  aria-hidden="true"
                />
              </span>

              {/* Count */}
              <span className="w-[20px] shrink-0 text-center font-[Inter] text-[20px] font-bold leading-none text-[#080808] sm:text-[21px]">
                {item.count}
              </span>

              {/* Label */}
              <span className="min-w-0 flex-1 truncate pl-0.5 font-[Inter] text-[10px] font-medium leading-[1.4] text-[#202020] sm:text-[10px]">
                {item.label}
              </span>

              {/* Right Arrow */}
              <ChevronRight
                size={16}
                strokeWidth={1.7}
                className="shrink-0 text-[#00B83F] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
