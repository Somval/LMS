
import React from "react";
import {
  Star,
  UsersRound,
  MessageSquare,
  Quote,
} from "lucide-react";

const summaryCards = [
  {
    id: "rating",
    value: "4.9",
    title: "Average Rating",
    description: "Based on 120+ reviews",
    icon: Star,
    iconColor: "text-[#FFD000]",
    iconBg: "bg-[#FFF8DD]",
  },
  {
    id: "reviews",
    value: "127",
    title: "Total Reviews",
    description: "From parents",
    icon: UsersRound,
    iconColor: "text-[#2860FF]",
    iconBg: "bg-[#E5EDFF]",
  },
  {
    id: "feedback",
    value: "12",
    title: "Recent Feedback",
    description: "In the last 3 months",
    icon: MessageSquare,
    iconColor: "text-[#16A765]",
    iconBg: "bg-[#E0FAE9]",
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 22, count: 28 },
  { stars: 4, percentage: 72, count: 92 },
  { stars: 3, percentage: 4, count: 5 },
  { stars: 2, percentage: 1, count: 2 },
  { stars: 1, percentage: 1, count: 1 },
];

function SummaryCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="flex min-h-[124px] w-full min-w-0 items-center gap-3 rounded-xl border border-[#EDF0F5] bg-white p-4 shadow-sm shadow-black/[0.02] transition-shadow duration-200 hover:shadow-md sm:min-h-[140px] sm:gap-4 sm:p-5 lg:p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${item.iconBg}`}
      >
        <Icon
          size={23}
          strokeWidth={1.8}
          className={item.iconColor}
          fill={item.id === "rating" ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[26px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[30px]">
          {item.value}
        </p>

        <h3 className="mt-1 break-words text-sm font-semibold leading-5 text-[#475467] sm:text-base">
          {item.title}
        </h3>

        <p className="mt-1 break-words text-xs leading-5 text-[#8792A1] sm:text-sm">
          {item.description}
        </p>
      </div>
    </article>
  );
}

function RatingBreakdown() {
  return (
    <section
      aria-labelledby="rating-breakdown-title"
      className="flex h-full min-w-0 flex-col rounded-xl border border-[#EDF0F5] bg-white p-5 shadow-sm shadow-black/[0.02] sm:p-6 lg:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="rating-breakdown-title"
          className="text-lg font-bold tracking-tight text-[#171717] sm:text-xl"
        >
          Rating Breakdown
        </h2>

        <span className="text-xs text-[#8792A1] sm:text-sm">
          All reviews
        </span>
      </div>

      <div className="mt-7 space-y-6 sm:mt-8 sm:space-y-7">
        {ratingBreakdown.map((rating) => (
          <div
            key={rating.stars}
            className="grid grid-cols-[64px_minmax(0,1fr)_82px] items-center gap-2 sm:grid-cols-[72px_minmax(0,1fr)_100px] sm:gap-4"
          >
            <span className="whitespace-nowrap text-xs font-medium text-[#667085] sm:text-sm">
              {rating.stars} {rating.stars === 1 ? "star" : "stars"}
            </span>

            <div
              className="h-3 min-w-0 overflow-hidden rounded-full bg-[#E9EBEE] sm:h-3.5"
              role="progressbar"
              aria-label={`${rating.stars}-star ratings`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={rating.percentage}
            >
              <div
                className="h-full rounded-full bg-[#326BFF] transition-[width] duration-500"
                style={{ width: `${rating.percentage}%` }}
              />
            </div>

            <span className="whitespace-nowrap text-right text-xs tabular-nums text-[#667085] sm:text-sm">
              {rating.percentage}% ({rating.count})
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-[#EDF0F5] pt-5 sm:mt-9">
        <p className="text-xs leading-6 text-[#8792A1] sm:text-sm">
          Ratings are based on the reviews currently recorded.
        </p>
      </div>
    </section>
  );
}

function ParentFeedback() {
  return (
    <section className="flex min-h-[300px] w-full min-w-0 flex-col items-center justify-center rounded-xl border border-[#B9CCFF] bg-[#E8EFFF] px-5 py-9 text-center sm:min-h-[340px] sm:px-7 sm:py-10 lg:min-h-0 lg:px-8">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#C9DAFF] sm:h-16 sm:w-16">
        <Quote
          size={31}
          strokeWidth={1.5}
          fill="#326AFF"
          className="rotate-180 text-[#326AFF]"
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-5 text-lg font-bold text-[#171717] sm:text-xl">
        Parent Feedback
      </h2>

      <blockquote className="mt-4 max-w-sm text-sm font-medium leading-7 text-[#252525] sm:text-base sm:leading-8">
        “Parents appreciate your clear explanations and patience with
        students.”
      </blockquote>

      <p className="mt-4 text-sm leading-6 text-[#687385] sm:text-base">
        Keep up the great work!
      </p>
    </section>
  );
}

export default function TutorRatingFeedback() {
  return (
    <section className="w-full min-w-0 bg-[#F3F6FC] font-sans">
      <div className="mx-auto w-full min-w-0 max-w-[1093px]">
        {/* Summary cards */}
        <section
          aria-label="Tutor rating summary"
          className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {summaryCards.map((item) => (
            <SummaryCard key={item.id} item={item} />
          ))}
        </section>

        {/* Rating breakdown and parent feedback */}
        <div className="mt-5 grid w-full min-w-0 grid-cols-1 items-stretch gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-5">
          <RatingBreakdown />
          <ParentFeedback />
        </div>
      </div>
    </section>
  );
}
