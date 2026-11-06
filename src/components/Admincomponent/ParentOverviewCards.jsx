
import React from "react";
import {
  UsersRound,
  BookOpen,
  CreditCard,
} from "lucide-react";

const overviewCards = [
  {
    id: 1,
    title: "Linked Children",
    value: "2",
    Icon: UsersRound,
    iconColor: "#079447",
    iconBackground: "#E7F3EC",
  },
  {
    id: 2,
    title: "Enrolled Subjects",
    value: "6",
    Icon: BookOpen,
    iconColor: "#2563FF",
    iconBackground: "#EAF0FF",
  },
  {
    id: 3,
    title: "Total Paid",
    value: "Monthly",
    Icon: CreditCard,
    iconColor: "#E600A9",
    iconBackground: "#FBE7F5",
  },
];

const money = (n, currency = "NGN") =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(n ?? 0);

const valueFor = (parent, id) => {
  const stats = parent?.stats;
  if (!stats) return "—";
  if (id === 1) return String(stats.linkedChildren);
  if (id === 2) return String(stats.enrolledSubjects);
  return money(stats.totalPaid, stats.currency);
};

export default function ParentOverviewCards({ parent = null }) {
  const cards = overviewCards.map((card) => ({ ...card, value: valueFor(parent, card.id) }));

  return (
    <section
      aria-label="Parent overview"
      className="w-full min-w-0 bg-[#F5F7FD] p-4 sm:p-6"
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(
          ({
            id,
            title,
            value,
            Icon,
            iconColor,
            iconBackground,
          }) => (
            <article
              key={id}
              className="flex min-h-[80px] min-w-0 items-center gap-3.5 rounded-[8px] border border-[#E0E3E9] bg-white px-4 py-3 sm:gap-3.5 sm:px-5"
            >
              {/* Icon Container */}
              <div
                className="flex h-[51px] w-[51px] shrink-0 items-center justify-center rounded-[6px]"
                style={{ backgroundColor: iconBackground }}
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  color={iconColor}
                  aria-hidden="true"
                />
              </div>

              {/* Card Content */}
              <div className="min-w-0">
                <p className="truncate text-[13px] font-normal leading-5 text-[#697586] sm:text-[13px]">
                  {title}
                </p>

                <p className="mt-0.5 break-words text-[23px] font-semibold leading-7 tracking-[-0.5px] text-black">
                  {value}
                </p>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
